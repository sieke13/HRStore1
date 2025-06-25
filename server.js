import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { PayPalApi, OrdersApi, PaymentsApi } from '@paypal/paypal-server-sdk';
import dotenv from 'dotenv';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-your-access-token-here',
  options: { timeout: 5000 }
});

// Configurar PayPal
const paypalClient = new PayPalApi({
  clientId: process.env.PAYPAL_CLIENT_ID || 'your-paypal-client-id-here',
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'your-paypal-client-secret-here',
  environment: process.env.PAYPAL_MODE === 'live' ? 'live' : 'sandbox'
});

const ordersApi = new OrdersApi(paypalClient);
const paymentsApi = new PaymentsApi(paypalClient);

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para crear preferencia de pago
app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payer, back_urls } = req.body;

    const preference = new Preference(client);

    const preferenceData = {
      items: items.map(item => ({
        title: item.title,
        unit_price: parseFloat(item.unit_price),
        quantity: parseInt(item.quantity),
        currency_id: 'MXN',
      })),
      payer: {
        name: payer?.name || '',
        surname: payer?.surname || '',
        email: payer?.email || 'test@test.com',
        phone: {
          area_code: payer?.phone?.area_code || '',
          number: payer?.phone?.number || '',
        },
        identification: {
          type: payer?.identification?.type || '',
          number: payer?.identification?.number || '',
        },
        address: {
          street_name: payer?.address?.street_name || '',
          street_number: payer?.address?.street_number || null,
          zip_code: payer?.address?.zip_code || '',
        }
      },
      back_urls: {
        success: back_urls?.success || `${req.protocol}://${req.get('host')}/payment-success`,
        failure: back_urls?.failure || `${req.protocol}://${req.get('host')}/payment-failure`,
        pending: back_urls?.pending || `${req.protocol}://${req.get('host')}/payment-pending`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: 12,
      },
      notification_url: `${req.protocol}://${req.get('host')}/api/webhooks/mercadopago`,
      statement_descriptor: 'HRStore',
      external_reference: `ORDER-${Date.now()}`,
    };

    const result = await preference.create({ body: preferenceData });
    
    console.log('Preference created:', result.id);
    
    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });

  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json({ 
      error: 'Error creating payment preference',
      details: error.message 
    });
  }
});

// Webhook para recibir notificaciones de MercadoPago
app.post('/api/webhooks/mercadopago', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    console.log('Webhook received:', { type, data });

    if (type === 'payment') {
      const paymentId = data.id;
      
      // Aquí puedes procesar el pago
      // Ejemplo: actualizar base de datos, enviar emails, etc.
      console.log(`Payment received: ${paymentId}`);
      
      // Aquí podrías consultar el estado del pago:
      // const payment = await mercadopago.payment.findById(paymentId);
      // console.log(payment);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error');
  }
});

// Endpoint para consultar estado de pago
app.get('/api/payment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = new Payment(client);
    const result = await payment.get({ id });
    
    res.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      transaction_amount: result.transaction_amount,
      date_created: result.date_created,
      external_reference: result.external_reference,
    });

  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ error: 'Error fetching payment' });
  }
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Manejar rutas del frontend (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});

export default app;

// ===============================
// PAYPAL ENDPOINTS
// ===============================

// Endpoint para crear orden de PayPal
app.post('/api/paypal/create-order', async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const orderRequest = {
      intent: 'CAPTURE',
      purchaseUnits: [{
        amount: {
          currencyCode: 'USD',
          value: totalAmount.toFixed(2)
        },
        items: items.map(item => ({
          name: item.title,
          unitAmount: {
            currencyCode: 'USD',
            value: item.unit_price.toFixed(2)
          },
          quantity: item.quantity.toString()
        }))
      }],
      applicationContext: {
        returnUrl: `${req.protocol}://${req.get('host')}/payment-success?provider=paypal`,
        cancelUrl: `${req.protocol}://${req.get('host')}/payment-failure?provider=paypal`,
        brandName: 'HRStore',
        landingPage: 'BILLING',
        userAction: 'PAY_NOW'
      }
    };

    const order = await ordersApi.ordersCreate({
      body: orderRequest
    });

    console.log('PayPal order created:', order.result.id);

    res.json({
      id: order.result.id,
      status: order.result.status,
      links: order.result.links
    });

  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ 
      error: 'Error creating PayPal order',
      details: error.message 
    });
  }
});

// Endpoint para capturar pago de PayPal
app.post('/api/paypal/capture/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const capture = await ordersApi.ordersCapture({
      id: orderId
    });

    console.log('PayPal payment captured:', capture.result.id);

    res.json({
      id: capture.result.id,
      status: capture.result.status,
      paymentId: capture.result.purchaseUnits[0]?.payments?.captures[0]?.id,
      amount: capture.result.purchaseUnits[0]?.payments?.captures[0]?.amount
    });

  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    res.status(500).json({ 
      error: 'Error capturing PayPal payment',
      details: error.message 
    });
  }
});

// Endpoint para consultar orden de PayPal
app.get('/api/paypal/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await ordersApi.ordersGet({
      id: orderId
    });

    res.json({
      id: order.result.id,
      status: order.result.status,
      amount: order.result.purchaseUnits[0]?.amount,
      createTime: order.result.createTime,
      updateTime: order.result.updateTime
    });

  } catch (error) {
    console.error('Error fetching PayPal order:', error);
    res.status(500).json({ 
      error: 'Error fetching PayPal order',
      details: error.message 
    });
  }
});

// Webhook para PayPal (opcional)
app.post('/api/webhooks/paypal', async (req, res) => {
  try {
    const { event_type, resource } = req.body;
    
    console.log('PayPal webhook received:', { event_type, resource });

    // Procesar diferentes tipos de eventos
    switch (event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log(`PayPal payment completed: ${resource.id}`);
        // Aquí puedes actualizar tu base de datos
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        console.log(`PayPal payment denied: ${resource.id}`);
        break;
      default:
        console.log(`Unhandled PayPal event: ${event_type}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(500).send('Error');
  }
});
