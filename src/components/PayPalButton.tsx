import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  items, 
  totalAmount, 
  onSuccess, 
  onError 
}) => {
  const [loading, setLoading] = useState(false);

  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'your-paypal-client-id-here';

  const createOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            title: item.title,
            unit_price: item.price,
            quantity: item.quantity,
          })),
          totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order = await response.json();
      return order.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      onError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/paypal/capture/${data.orderID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const details = await response.json();
      console.log('PayPal payment captured:', details);
      onSuccess(details);
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID === 'your-paypal-client-id-here') {
    return (
      <div className="paypal-error">
        <p>⚠️ PayPal no está configurado</p>
        <p>Configura VITE_PAYPAL_CLIENT_ID en .env.local</p>
      </div>
    );
  }

  return (
    <div className="paypal-container">
      <PayPalScriptProvider 
        options={{ 
          clientId: PAYPAL_CLIENT_ID,
          currency: "USD",
          intent: "capture"
        }}
      >
        <PayPalButtons
          disabled={loading}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(error) => {
            console.error('PayPal error:', error);
            onError(error);
          }}
          onCancel={() => {
            console.log('PayPal payment cancelled');
          }}
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            height: 40
          }}
        />
      </PayPalScriptProvider>
      
      {loading && (
        <div className="paypal-loading">
          <span className="spinner"></span>
          Procesando pago...
        </div>
      )}
    </div>
  );
};

export default PayPalButton;
