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

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    console.log('Access token:', accessToken);
    if (!accessToken) {
      console.error('Missing MercadoPago access token');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing MercadoPago access token' }),
      };
    }

    const safeBackUrls = back_urls || {};
    const payload = {
      items,
      back_urls: {
        success: 'https://hrteststore.netlify.app/',
        failure: 'https://hrteststore.netlify.app/',
        pending: 'https://hrteststore.netlify.app/',
      },
      auto_return,
    };
    console.log('Payload enviado a MercadoPago:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
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