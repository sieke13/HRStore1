import React from 'react';

const PaymentFailure: React.FC = () => {
  return (
    <div className="payment-result failure">
      <div className="container">
        <div className="result-content">
          <div className="result-icon failure-icon">❌</div>
          <h1>Pago No Procesado</h1>
          <p>Hubo un problema al procesar tu pago.</p>
          <div className="result-details">
            <p><strong>Posibles causas:</strong></p>
            <ul>
              <li>Fondos insuficientes</li>
              <li>Datos de tarjeta incorrectos</li>
              <li>Problema temporal del banco</li>
            </ul>
          </div>
          <div className="result-actions">
            <button className="btn-primary" onClick={() => window.location.href = '/'}>
              Intentar Nuevamente
            </button>
            <button className="btn-secondary">
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
