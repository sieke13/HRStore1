import React, { useEffect, useState } from 'react';

const PaymentSuccess: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get('provider');
    const paymentId = urlParams.get('payment_id') || urlParams.get('paymentId');
    const token = urlParams.get('token'); // Para PayPal

    console.log('Payment success params:', { provider, paymentId, token });

    // Simular carga de detalles de pago
    setTimeout(() => {
      setPaymentDetails({
        provider: provider || 'mercadopago',
        paymentId: paymentId || 'MP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: '$199.96',
        date: new Date().toLocaleDateString('es-MX'),
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getProviderName = (provider: string) => {
    switch (provider) {
      case 'paypal':
        return 'PayPal';
      case 'mercadopago':
      default:
        return 'MercadoPago';
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'paypal':
        return '🔵';
      case 'mercadopago':
      default:
        return '💙';
    }
  };

  return (
    <div className="payment-result success">
      <div className="container">
        <div className="result-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <h2>Verificando pago...</h2>
              <p>Por favor espera mientras confirmamos tu transacción</p>
            </div>
          ) : (
            <>
              <div className="result-icon success-icon">✅</div>
              <h1>¡Pago Exitoso!</h1>
              <p>Tu compra se ha procesado correctamente.</p>
              
              {paymentDetails && (
                <div className="result-details">
                  <p><strong>Método de pago:</strong> {getProviderIcon(paymentDetails.provider)} {getProviderName(paymentDetails.provider)}</p>
                  <p><strong>Número de transacción:</strong> {paymentDetails.paymentId}</p>
                  <p><strong>Fecha:</strong> {paymentDetails.date}</p>
                  <p><strong>Estado:</strong> Aprobado</p>
                </div>
              )}
              
              <div className="result-actions">
                <button className="btn-primary" onClick={() => window.location.href = '/'}>
                  Continuar Comprando
                </button>
                <button className="btn-secondary">
                  Ver Mis Pedidos
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
