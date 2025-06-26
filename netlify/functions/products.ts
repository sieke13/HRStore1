import { Client } from 'pg';

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
      const result = await client.query('SELECT * FROM products ORDER BY createdAt DESC');
      data = result.rows;
    } else if (method === 'POST') {
      // Add a new product
      let rawBody = event.body;
      if (typeof rawBody !== 'string') {
        rawBody = JSON.stringify(rawBody);
      }
      console.log('RAW BODY:', rawBody);
      let parsed;
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
      const { name, price, category, description, image, stock } = parsed;
      const result = await client.query(
        'INSERT INTO products (name, price, category, description, image, stock, createdAt) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
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
