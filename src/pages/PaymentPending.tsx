import React from 'react';

const PaymentPending: React.FC = () => {
  return (
    <div className="payment-result pending">
      <div className="container">
        <div className="result-content">
          <div className="result-icon pending-icon">⏳</div>
          <h1>Pago Pendiente</h1>
          <p>Tu pago está siendo procesado.</p>
          <div className="result-details">
            <p><strong>Número de referencia:</strong> MP-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p><strong>Tiempo estimado:</strong> 24-48 horas</p>
            <p><strong>Estado:</strong> En proceso</p>
            <br />
            <p>Te notificaremos por email cuando el pago sea confirmado.</p>
          </div>
          <div className="result-actions">
            <button className="btn-primary" onClick={() => window.location.href = '/'}>
              Volver a Inicio
            </button>
            <button className="btn-secondary">
              Ver Estado del Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPending;
