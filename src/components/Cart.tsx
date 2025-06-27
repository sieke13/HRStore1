import React, { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import PayPalButton from './PayPalButton';

// Configuración de MercadoPago
const MERCADOPAGO_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || 'TEST-your-public-key-here';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Inicializar MercadoPago
initMercadoPago(MERCADOPAGO_PUBLIC_KEY, { 
  locale: 'es-MX' 
});

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items }) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mercadopago' | 'paypal' | null>(null);

  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const createPreference = async () => {
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/create-preference', {
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
          back_urls: {
            success: `${window.location.origin}/payment-success`,
            failure: `${window.location.origin}/payment-failure`,
            pending: `${window.location.origin}/payment-pending`
          },
          auto_return: 'approved',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const preference = await response.json();
      console.log('Preference created:', preference);
      setPreferenceId(preference.id);
    } catch (error) {
      console.error('Error creating preference:', error);
      alert('Error al procesar el pago. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Funciones para manejar PayPal
  const handlePayPalSuccess = (details: any) => {
    console.log('PayPal payment successful:', details);
    window.location.href = `/payment-success?provider=paypal&paymentId=${details.paymentId}`;
  };

  const handlePayPalError = (error: any) => {
    console.error('PayPal payment error:', error);
    alert('Error en el pago con PayPal. Por favor intenta de nuevo.');
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>🛒 Tu Carrito</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega algunos productos para continuar</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <div className="item-price">
                        <span className="quantity">Cantidad: {item.quantity}</span>
                        <span className="price">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="payment-section">
                <h3>💳 Métodos de Pago</h3>
                
                <div className="payment-method-selector">
                  <button 
                    className={`payment-method-btn ${selectedPaymentMethod === 'mercadopago' ? 'active' : ''}`}
                    onClick={() => setSelectedPaymentMethod('mercadopago')}
                  >
                    <img 
                      src="https://www.mercadopago.com/org-img/MP3/home/logomp3.gif" 
                      alt="MercadoPago" 
                      className="payment-logo"
                    />
                    MercadoPago
                  </button>
                  
                  <button 
                    className={`payment-method-btn ${selectedPaymentMethod === 'paypal' ? 'active' : ''}`}
                    onClick={() => setSelectedPaymentMethod('paypal')}
                  >
                    <img 
                      src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" 
                      alt="PayPal" 
                      className="payment-logo"
                    />
                    PayPal
                  </button>
                </div>

                {selectedPaymentMethod === 'mercadopago' && (
                  <div className="mercadopago-section">
                    {!preferenceId ? (
                      <button 
                        className="mercadopago-btn"
                        onClick={createPreference}
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="loading">
                            <span className="spinner"></span>
                            Procesando...
                          </span>
                        ) : (
                          <>
                            Pagar con MercadoPago
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="wallet-container">
                        <Wallet 
                          initialization={{ preferenceId: preferenceId }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {selectedPaymentMethod === 'paypal' && (
                  <div className="paypal-section">
                    <PayPalButton
                      items={items}
                      totalAmount={totalAmount}
                      onSuccess={handlePayPalSuccess}
                      onError={handlePayPalError}
                    />
                  </div>
                )}

                {!selectedPaymentMethod && (
                  <div className="payment-placeholder">
                    <p>👆 Selecciona un método de pago para continuar</p>
                  </div>
                )}

                <div className="payment-methods">
                  <h4>Aceptamos:</h4>
                  <div className="payment-icons">
                    <div className="payment-icon visa">💳 Visa</div>
                    <div className="payment-icon mastercard">💳 Mastercard</div>
                    <div className="payment-icon amex">💳 American Express</div>
                    <div className="payment-icon paypal-icon">💰 PayPal</div>
                  </div>
                </div>

                <div className="security-info">
                  <div className="security-item">
                    <span className="security-icon">🔒</span>
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="security-item">
                    <span className="security-icon">🚚</span>
                    <span>Envío gratis en compras +$50</span>
                  </div>
                  <div className="security-item">
                    <span className="security-icon">↩️</span>
                    <span>30 días para devoluciones</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;