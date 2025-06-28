import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { items, back_urls, auto_return } = JSON.parse(event.body || '{}');
    console.log('Received items:', items);

    const accessToken = process.env.VITE_MERCADOPAGO_ACCESS_TOKEN;
    console.log('Access token:', accessToken);
    if (!accessToken) {
      console.error('Missing MercadoPago access token');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing MercadoPago access token' }),
      };
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items,
        back_urls,
        auto_return,
      }),
    });

    const data = await response.json();
    console.log('MercadoPago response:', data);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || 'MercadoPago error', details: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error: any) {
    console.error('Serverless error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};