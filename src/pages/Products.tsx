import React, { useState } from 'react';
import Header from '../components/Header';
import BrandsCarousel from '../components/BrandsCarousel';
import ProfessionalStats from '../components/ProfessionalStats';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import WhatsAppChatbot from '../components/WhatsAppChatbot';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { FaSearch } from 'react-icons/fa';
import '../styles/products.css';

const Products: React.FC = () => {
    const { products } = useProducts(); // Usar productos dinámicos
    const { 
        cartItems, 
        isCartOpen, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        closeCart, 
        handleCheckout,
         
    } = useCart();

    const [search, setSearch] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showGlobalSearch, setShowGlobalSearch] = useState(false);
    const filteredProducts = search.length > 0
        ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        : [];

    const handleAddToCart = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
        }
    };
    return (
        <div className="products-page">
            <Header />
            
            {/* Estadísticas Profesionales */}
            <ProfessionalStats />
            
            {/* Carrusel de Marcas */}
            <BrandsCarousel />
            
            <div className="container">
                <div className="products-header">
                    <h1>Nuestros Productos</h1>
                    <p>Encuentra las mejores herramientas para reparación de dispositivos móviles</p>
                    <div className="product-search-autocomplete">
                        <input
                            type="text"
                            className="product-search-input"
                            placeholder="Buscar producto..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                            autoComplete="off"
                        />
                        {showSuggestions && search.length > 0 && (
                            <ul className="product-suggestions-list">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.slice(0, 8).map(product => (
                                        <li key={product.id} className="product-suggestion-item" onMouseDown={() => { setSearch(product.name); setShowSuggestions(false); }}>
                                            <img src={product.image} alt={product.name} className="product-suggestion-img" />
                                            <span className="product-suggestion-name">{product.name}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="product-suggestion-item no-result">No hay resultados</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="product-list">
                    {products.map(product => (
                        <ProductCard 
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            title={product.name}
                            price={product.price}
                            onAddToCart={() => handleAddToCart(product.id)}
                        />
                    ))}
                </div>
            </div>

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
            
            {/* WhatsApp Chatbot */}
            <WhatsAppChatbot />

            {/* Botón flotante de búsqueda global */}
            <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 2002 }}>
              <button
                className="global-search-btn"
                onClick={() => setShowGlobalSearch(true)}
                aria-label="Buscar productos"
                id="global-search-trigger"
              >
                <FaSearch />
              </button>
              {showGlobalSearch && (
                <div className="global-search-popover" tabIndex={-1} onBlur={() => setShowGlobalSearch(false)}>
                  <div className="global-search-box" onClick={e => e.stopPropagation()}>
                    <input
                      type="text"
                      className="product-search-input"
                      placeholder="Buscar producto..."
                      value={search}
                      autoFocus
                      onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                      autoComplete="off"
                    />
                    {showSuggestions && search.length > 0 && (
                      <ul className="product-suggestions-list">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.slice(0, 8).map(product => (
                            <li key={product.id} className="product-suggestion-item" onMouseDown={() => { setSearch(product.name); setShowSuggestions(false); }}>
                              <img src={product.image} alt={product.name} className="product-suggestion-img" />
                              <span className="product-suggestion-name">{product.name}</span>
                            </li>
                          ))
                        ) : (
                          <li className="product-suggestion-item no-result">No hay resultados</li>
                        )}
                      </ul>
                    )}
                    <button className="close-global-search" onClick={() => setShowGlobalSearch(false)}>&times;</button>
                  </div>
                </div>
              )}
            </div>
        </div>
    );
};

export default Products;