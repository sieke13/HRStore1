import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import Header from '../components/Header';
import BrandsCarousel from '../components/BrandsCarousel';
import ProfessionalStats from '../components/ProfessionalStats';
import WhatsAppChatbot from '../components/WhatsAppChatbot';
import '../styles/products.css';

interface ProductsPageProps {
  focusProduct?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ focusProduct }) => {
  const { products, setProducts, refreshProducts } = useProducts();
  const { 
    cartItems, 
    isCartOpen, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    closeCart, 
    
    handleCheckout,
    getTotalItems 
  } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Refrescar productos cuando la página se carga
    refreshProducts();
  }, []);
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [products, selectedCategory]);

  // Efecto para enfocar un producto específico si se proporciona
  useEffect(() => {
    if (focusProduct && products.length > 0) {
      // Buscar el producto específico
      const product = products.find(p => p.id === focusProduct);
      if (product) {
        // Mostrar todos los productos o filtrar por categoría si es necesario
        setSelectedCategory('all');
        // Enfocar el elemento después de un pequeño delay para asegurar que esté renderizado
        setTimeout(() => {
          const productElement = document.getElementById(`product-${focusProduct}`);
          if (productElement) {
            productElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
            // Agregar una clase de destacado temporal
            productElement.classList.add('highlighted');
            setTimeout(() => {
              productElement.classList.remove('highlighted');
            }, 3000);
          }
        }, 100);
      }
    }
  }, [focusProduct, products]);

  const categories = [
    { value: 'all', label: 'Todos los Productos' },
    { value: 'reparaciones', label: 'Reparaciones' },
    { value: 'accesorios', label: 'Accesorios' },
    { value: 'componentes', label: 'Componentes' },
    { value: 'servicios', label: 'Servicios' }
  ];  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      // El carrito se abre automáticamente desde el hook useCart
    }
  };

  const getProductCountByCategory = (category: string) => {
    if (category === 'all') return products.length;
    return products.filter(product => product.category === category).length;
  };  return (
    <div className="products-page">
      <Header />
      
      {/* Estadísticas Profesionales */}
      <ProfessionalStats />
      
      {/* Carrusel de Marcas */}
      <BrandsCarousel />
      
      <div className="products-container">
        <div className="products-header">
          <h1>Nuestros Productos y Servicios</h1>
          <p>Encuentra los mejores servicios de reparación y accesorios para tu dispositivo</p>
          <div className="products-stats">
            <span className="total-products">Total: {products.length} productos disponibles</span>
          </div>
        </div>

        <div className="category-filter">
          <h3>Filtrar por categoría:</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.value}
                className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
                <span className="category-count">({getProductCountByCategory(category.value)})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="products-results">
          <div className="results-header">
            <h3>
              {selectedCategory === 'all' 
                ? `Mostrando todos los productos (${filteredProducts.length})` 
                : `Categoría: ${categories.find(c => c.value === selectedCategory)?.label} (${filteredProducts.length})`
              }
            </h3>            {cartItems.length > 0 && (
              <div className="cart-indicator">
                🛒 {getTotalItems()} artículos en el carrito
              </div>
            )}
          </div>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (              filteredProducts.map(product => (
                <div key={product.id} id={`product-${product.id}`} className="product-item">                  <ProductCard
                    id={product.id}
                    image={product.image}
                    title={product.name}
                    price={product.price}
                    onAddToCart={() => handleAddToCart(product.id)}
                  />
                  <div className="product-details">
                    <p className="product-description">{product.description}</p>
                    <div className="product-meta">
                      <span className="product-category">📁 {product.category}</span>
                      <span className="product-stock">📦 Stock: {product.stock}</span>
                    </div>
                    {product.stock <= 5 && product.stock > 0 && (
                      <div className="low-stock-warning">
                        ⚠️ ¡Pocas unidades disponibles!
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="out-of-stock">
                        ❌ Agotado
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <div className="no-products-icon">📦</div>
                <h3>No hay productos disponibles</h3>
                <p>
                  {selectedCategory === 'all' 
                    ? 'No hay productos en la tienda en este momento.' 
                    : `No hay productos en la categoría "${categories.find(c => c.value === selectedCategory)?.label}".`
                  }                </p>
                {selectedCategory !== 'all' && (
                  <button 
                    className="show-all-btn"
                    onClick={() => setSelectedCategory('all')}
                  >
                    Ver todos los productos
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>      {/* Carrito lateral */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />
      
      {/* WhatsApp Chatbot */}
      <WhatsAppChatbot />
    </div>
  );
};

export default ProductsPage;
