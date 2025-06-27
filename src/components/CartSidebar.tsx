import React, { useState, useEffect } from 'react';
import '../styles/cart.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`cart-overlay ${isOpen ? 'cart-overlay-open' : ''}`}>
      <div className="cart-backdrop" onClick={handleClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'cart-sidebar-open' : ''}`}>
        {/* Header del carrito */}
        <div className="cart-header">
          <div className="cart-title">
            <h2>🛒 Tu Carrito</h2>
            <span className="cart-count">{getTotalItems()} artículo{getTotalItems() !== 1 ? 's' : ''}</span>
          </div>
          <button className="cart-close" onClick={handleClose}>
            ✕
          </button>
        </div>        {/* Contenido del carrito */}
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega algunos productos para comenzar</p>
              <button className="continue-shopping" onClick={handleClose}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>              {/* Lista compacta de productos seleccionados - estilo mejorado */}
              <div className="cart-summary-list">
                <div className="summary-items-compact">
                  {items.map(item => (
                    <div key={`summary-${item.id}`} className="summary-item-compact">
                      <span className="summary-name-compact">{item.name}</span>
                      <span className="summary-quantity-compact">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Separador visual */}
              <div className="cart-separator"></div>

              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">$MX {Number(item.price || 0).toFixed(2)}</p>
                      <div className="item-controls">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>                        <button 
                          className="remove-btn"
                          onClick={() => {
                            if (window.confirm(`¿Eliminar "${item.name}" del carrito?`)) {
                              onRemoveItem(item.id);
                            }
                          }}
                          title="Eliminar producto"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="item-total">
                      $MX {((Number(item.price) || 0) * (item.quantity || 0)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen del carrito */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>$MX {Number(getTotalPrice()).toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Envío:</span>
                  <span className="free-shipping">Gratis</span>
                </div>
                <div className="summary-total">
                  <span>Total:</span>
                  <span>$MX {Number(getTotalPrice()).toFixed(2)}</span>
                </div>
              </div>

              {/* Métodos de pago */}
              <div className="payment-methods">
                <h4>💳 Métodos de Pago</h4>
                <div className="payment-options">
                  <div className="payment-option">
                    <img src="/icons/mercadopago.svg" alt="MercadoPago" onError={e => (e.currentTarget.src = '/icons/credit-card.svg')} />
                    <span>MercadoPago</span>
                  </div>
                  <div className="payment-option">
                    <img src="/icons/paypal.svg" alt="PayPal" onError={e => (e.currentTarget.src = '/icons/credit-card.svg')} />
                    <span>PayPal</span>
                  </div>
                  <div className="payment-option">
                    <img src="/icons/visa.svg" alt="Visa" onError={e => (e.currentTarget.src = '/icons/credit-card.svg')} />
                    <span>Tarjetas</span>
                  </div>
                </div>
              </div>

              {/* Garantías y beneficios */}
              <div className="cart-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">✅</span>
                  <span>Compra 100% segura</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🚚</span>
                  <span>Envío gratis en compras +$500</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🔄</span>
                  <span>30 días para devoluciones</span>
                </div>
              </div>              {/* Botón de checkout */}
              <div className="cart-actions">
                <button className="checkout-btn" onClick={onCheckout}>
                  💳 Proceder al Pago
                </button>
                <div className="secondary-actions">
                  <button className="continue-shopping-secondary" onClick={handleClose}>
                    Continuar Comprando
                  </button>
                  {items.length > 0 && (
                    <button 
                      className="clear-cart-btn" 
                      onClick={() => {
                        if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                          onClearCart();
                        }
                      }}
                      title="Vaciar carrito"
                    >
                      🗑️ Vaciar Carrito
                    </button>
                  )}
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
