import React, { useState, useEffect } from 'react';
import { useProducts, Product } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import Header from '../components/Header';
import CartSidebar from '../components/CartSidebar';
import WhatsAppChatbot from '../components/WhatsAppChatbot';

import '../styles/product-detail.css';

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {  const { products } = useProducts();
  const { 
    addToCart,
    cartItems,
    isCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    closeCart,
    handleCheckout
  } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
    } else {
      // Fetch from Netlify Function if not found in products array
      (async () => {
        try {
          const res = await fetch(`/.netlify/functions/products?id=${productId}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.product) {
              setProduct(data.product);
              setSelectedImage(data.product.image);
            }
          }
        } catch {
          // Optionally handle error (e.g., show error message)
        }
      })();
    }
  }, [productId, products]);  const handleAddToCart = () => {
    if (product) {
      // Agregar la cantidad exacta especificada
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }, quantity); // Pasar la cantidad como segundo parámetro
      
      // El carrito se abre automáticamente desde el hook useCart
      // Feedback visual mejorado
      const button = document.querySelector('.add-to-cart-btn') as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        const originalBg = button.style.backgroundColor;
        button.textContent = `✅ ${quantity > 1 ? `${quantity} productos` : 'Producto'} agregado${quantity > 1 ? 's' : ''}!`;
        button.style.backgroundColor = '#28a745';
        button.disabled = true;
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = originalBg || '#007bff';
          button.disabled = false;
        }, 2500);
      }
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="container">
          <div className="product-not-found">
            <h2>Producto no encontrado</h2>
            <p>El producto que buscas no existe o ha sido eliminado.</p>
            <button className="btn-primary" onClick={() => window.location.href = '/products'}>
              Ver todos los productos
            </button>
          </div>
        </div>
        <WhatsAppChatbot />
      </div>
    );
  }
  // Especificaciones detalladas por producto
  const getProductSpecifications = (productId: string): {
    title: string;
    features: string[];
    technical: { [key: string]: string };
    includes: string[];
  } => {
    type ProductSpecs = {
      title: string;
      features: string[];
      technical: { [key: string]: string };
      includes: string[];
    };
    const specs: { [key: string]: ProductSpecs } = {
      '1': {
        title: 'Reparación Pantalla iPhone 13',
        features: [
          'Pantalla OLED Original',
          'Garantía de 6 meses',
          'Instalación profesional',
          'Calibración incluida',
          'Touch 3D funcional',
          'True Tone preservado'
        ],
        technical: {
          'Tiempo de reparación': '45-60 minutos',
          'Garantía': '6 meses',
          'Tipo de pantalla': 'OLED Super Retina XDR',
          'Resolución': '2532 x 1170 píxeles',
          'Compatibilidad': 'iPhone 13 únicamente'
        },
        includes: [
          'Instalación profesional',
          'Pruebas de funcionalidad',
          'Limpieza interna',
          'Garantía por escrito'
        ]
      },
      '2': {
        title: 'Reparación Pantalla Samsung Galaxy S23',
        features: [
          'Pantalla AMOLED Original',
          'Garantía de 6 meses',
          'Servicio profesional',
          'Fingerprint funcional',
          'Always On Display',
          'HDR10+ compatible'
        ],
        technical: {
          'Tiempo de reparación': '60-90 minutos',
          'Garantía': '6 meses',
          'Tipo de pantalla': 'Dynamic AMOLED 2X',
          'Resolución': '2340 x 1080 píxeles',
          'Tasa de refresco': '120Hz'
        },
        includes: [
          'Instalación profesional',
          'Calibración de sensor',
          'Pruebas de funcionalidad',
          'Garantía por escrito'
        ]
      },
      '3': {
        title: 'Cambio de Batería iPhone 12',
        features: [
          'Batería Original Apple',
          'Capacidad 2815 mAh',
          'Revisión de salud',
          'Optimización iOS',
          'Fast Charging compatible',
          'Wireless Charging funcional'
        ],
        technical: {
          'Tiempo de reparación': '30-45 minutos',
          'Garantía': '3 meses',
          'Capacidad': '2815 mAh',
          'Voltaje': '3.83V',
          'Ciclos de vida': '500+ ciclos'
        },
        includes: [
          'Batería original',
          'Instalación profesional',
          'Prueba de salud',
          'Calibración del sistema'
        ]
      },
      '4': {
        title: 'Reparación Placa Base iPhone',
        features: [
          'Microsoladura especializada',
          'Diagnóstico avanzado',
          'Reparación de circuitos',
          'Reemplazo de componentes',
          'Pruebas exhaustivas',
          'Garantía especializada'
        ],
        technical: {
          'Tiempo de reparación': '2-5 días hábiles',
          'Garantía': '30 días',
          'Tipo de servicio': 'Microsoladura',
          'Diagnóstico': 'Incluido',
          'Complejidad': 'Alta especialización'
        },
        includes: [
          'Diagnóstico completo',
          'Reparación especializada',
          'Pruebas de funcionalidad',
          'Reporte técnico'
        ]
      },
      '5': {
        title: 'Protector de Pantalla Cristal Templado',
        features: [
          'Cristal templado 9H',
          'Compatible con Face ID',
          'Instalación sin burbujas',
          'Oleofóbico anti-huellas',
          'Transparencia HD',
          'Bordes 2.5D redondeados'
        ],
        technical: {
          'Dureza': '9H',
          'Grosor': '0.33mm',
          'Transparencia': '99.9%',
          'Instalación': 'Profesional incluida',
          'Compatibilidad': 'Face ID preservado'
        },
        includes: [
          'Protector de cristal',
          'Kit de instalación',
          'Limpieza de pantalla',
          'Aplicación profesional'
        ]
      },
      '7': {
        title: 'Kit de Herramientas de Reparación',
        features: [
          'Kit completo 64 piezas',
          'Destornilladores de precisión',
          'Ventosas profesionales',
          'Palancas de apertura',
          'Pinzas especializadas',
          'Estuche organizador'
        ],
        technical: {
          'Cantidad de piezas': '64 herramientas',
          'Material': 'Acero inoxidable',
          'Compatibilidad': 'Universal',
          'Estuche': 'Incluido',
          'Magnético': 'Destornilladores magnéticos'
        },
        includes: [
          'Destornilladores Pentalobe',
          'Destornilladores Phillips',
          'Ventosas de diferentes tamaños',
          'Palancas plásticas',
          'Pinzas antiestáticas',
          'Estuche de transporte'
        ]
      },
      '11': {
        title: 'Reparación Cámara Trasera',
        features: [
          'Cámara original OEM',
          'Calibración incluida',
          'Pruebas de funcionalidad',
          'Enfoque automático',
          'Estabilización óptica',
          'Modo retrato funcional'
        ],
        technical: {
          'Tiempo de reparación': '60-90 minutos',
          'Garantía': '3 meses',
          'Tipo': 'Módulo completo',
          'Calibración': 'Software incluida',
          'Funciones': 'Todas preservadas'
        },
        includes: [
          'Módulo de cámara',
          'Instalación profesional',
          'Calibración de software',
          'Pruebas de calidad'
        ]
      }
    };

    return specs[productId] || {
      title: product.name,
      features: [
        'Producto de alta calidad',
        'Garantía incluida',
        'Servicio profesional'
      ],
      technical: {
        'Garantía': 'Consultar',
        'Instalación': 'Profesional'
      },
      includes: [
        'Producto principal',
        'Servicio profesional'
      ]
    };
  };

  const specs = getProductSpecifications(product.id);

  return (
    <div className="product-detail-page">
      <Header />
      
      <div className="container">
        <div className="breadcrumb">
          <span onClick={() => window.location.href = '/'}>Inicio</span>
          <span className="separator"> / </span>
          <span onClick={() => window.location.href = '/products'}>Productos</span>
          <span className="separator"> / </span>
          <span className="current">{product.name}</span>
        </div>

        <button className="back-button" onClick={handleGoBack}>
          ← Volver
        </button>

        <div className="product-detail-content">
          <div className="product-images">
            <div className="main-image">
              <img src={selectedImage} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              <img 
                src={product.image} 
                alt={product.name}
                className={selectedImage === product.image ? 'active' : ''}
                onClick={() => setSelectedImage(product.image)}
              />
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <h1>{product.name}</h1>
              <div className="product-category-badge">
                📁 {product.category}
              </div>
            </div>

            <div className="product-price-section">
              <span className="price">${product.price.toFixed(2)} MXN</span>
              <div className="stock-info">
                {product.stock > 0 ? (
                  <span className="in-stock">✅ En stock ({product.stock} disponibles)</span>
                ) : (
                  <span className="out-of-stock">❌ Agotado</span>
                )}
              </div>
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Características Principales</h3>
              <ul>                {specs.features.map((feature: string, index: number) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>

            {product.stock > 0 && (
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label>Cantidad:</label>
                  <select 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  🛒 Agregar al Carrito
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="product-specifications">
          <div className="spec-section">
            <h3>Especificaciones Técnicas</h3>
            <div className="spec-grid">
              {Object.entries(specs.technical).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key}:</span>
                  <span className="spec-value">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="spec-section">
            <h3>¿Qué incluye?</h3>
            <ul className="includes-list">              {specs.includes.map((item: string, index: number) => (
                <li key={index}>📦 {item}</li>
              ))}
            </ul>
          </div>
        </div>      </div>

      {/* Carrito lateral */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />

      <WhatsAppChatbot />
    </div>
  );
};

export default ProductDetail;
