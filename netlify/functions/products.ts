import { Client } from 'pg';

// Debug: print the connection string (mask before sharing logs!)
console.log('DEBUG NEON_DATABASE_URL:', process.env.NEON_DATABASE_URL);

// Neon Postgres connection string from environment variable
const connectionString = process.env.NEON_DATABASE_URL!;

const handler = async (event: any): Promise<Response> => {
  let client: Client | null = null;
  try {
    client = new Client({ connectionString });
    await client.connect();

    let data: Record<string, unknown>[] | Record<string, unknown> | null;
    const method = event.httpMethod || event.method;

    if (method === 'GET') {
      // Get all products
      const result = await client.query('SELECT * FROM products ORDER BY id DESC');
      data = result.rows;
    } else if (method === 'POST') {
      // Add a new product
      console.log('DEBUG event.body:', event.body);
      console.log('DEBUG event.headers:', event.headers);
      let parsed;
      let rawBody = event.body;
      if (rawBody && typeof rawBody.getReader === 'function') {
        // Netlify Dev (local) sends a ReadableStream
        const reader = rawBody.getReader();
        let chunks = [];
        let done, value;
        while (({ done, value } = await reader.read(), !done)) {
          chunks.push(...value);
        }
        rawBody = new TextDecoder().decode(Uint8Array.from(chunks));
      }
      if (typeof rawBody === 'string' && rawBody.trim() !== '') {
        try {
          parsed = JSON.parse(rawBody);
        } catch (err) {
          return new Response(
            JSON.stringify({ error: 'Invalid JSON in request body', raw: rawBody }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      } else if (typeof rawBody === 'object' && rawBody !== null) {
        parsed = rawBody;
      } else {
        return new Response(
          JSON.stringify({ error: 'Empty or invalid request body', raw: rawBody }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      const { name, price, category, description, image, stock } = parsed;
      // Backend validation: all fields required
      console.log('DEBUG parsed:', { name, price, category, description, image, stock });
      console.log('DEBUG typeof:', {
        name: typeof name,
        price: typeof price,
        category: typeof category,
        description: typeof description,
        image: typeof image,
        stock: typeof stock
      });
      if (
        typeof name        !== 'string'  || name.trim()        === '' ||
        typeof price       !== 'number'  || isNaN(price)              ||
        typeof category    !== 'string'  || category.trim()    === '' ||
        typeof description !== 'string'  || description.trim() === '' ||
        typeof image       !== 'string'  || image.trim()       === '' ||
        typeof stock       !== 'number'  || isNaN(stock)
      ) {
        return new Response(
          JSON.stringify({ error: 'Faltan campos o tipos inválidos.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' }}
        );
      }
      const result = await client.query(
        'INSERT INTO products (name, price, category, description, image, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, price, category, description, image, stock]
      );
      data = result.rows[0];
    } else if (method === 'PUT') {
      // Update a product
      const { id, ...fields } = JSON.parse(event.body);
      const keys = Object.keys(fields);
      const values = Object.values(fields);
      const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
      const result = await client.query(
        `UPDATE products SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
        [...values, id]
      );
      data = result.rows[0];
    } else if (method === 'DELETE') {
      // Delete a product
      const { id } = JSON.parse(event.body);
      if (!id) {
        return new Response(
          JSON.stringify({ error: 'Missing product id for deletion' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      await client.query('DELETE FROM products WHERE id = $1', [id]);
      data = null;
    } else {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ products: data }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } finally {
    if (client) {
      try { await client.end(); } catch {}
    }
  }
};

export default handler;
