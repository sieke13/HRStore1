import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok, FaShoppingCart, FaSearch } from 'react-icons/fa';
import logoSvg from '../assets/images/logo.svg';
import { useCart } from '../hooks/useCart';
import CartSidebar from './CartSidebar';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showGlobalSearch, setShowGlobalSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const { 
        cartItems, 
        isCartOpen, 
        openCart, 
        closeCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        handleCheckout,
        getTotalItems 
    } = useCart();
    const { products } = useProducts();
    const filteredProducts = search.length > 0
        ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        : [];

    return (
        <>
            <header className="modern-header">
                <div className="header-top">
                    <div className="container" style={{ position: 'relative' }}>
                        <div className="top-bar" style={{ minHeight: 32 }}>
                            {/* Eliminadas las tech highlight boxes */}
                            {/* Social icons to top right */}
                            <div
                                className="social-media-top"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    display: 'flex',
                                    gap: '0.7rem',
                                    alignItems: 'center',
                                    zIndex: 10
                                }}
                            >
                                <a href="https://wa.me/5551234567" className="social-link whatsapp" target="_blank" rel="noopener noreferrer">
                                    <FaWhatsapp />
                                </a>
                                <a href="https://facebook.com" className="social-link facebook" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook />
                                </a>
                                <a href="https://tiktok.com" className="social-link tiktok" target="_blank" rel="noopener noreferrer">
                                    <FaTiktok />
                                </a>
                                <a href="https://instagram.com" className="social-link instagram" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-main">
                    <div className="container">
                        <div className="header-content">
                            {/* Logo */}
                            <div className="header-logo">
                                <img src={logoSvg} alt="HRStore Logo" className="logo-image" />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        lineHeight: 0.6,
                                        fontFamily: "'Orbitron', 'Share Tech Mono', 'Roboto Mono', monospace",
                                        fontWeight: 900,
                                        letterSpacing: 1,
                                        marginLeft: 4,
                                        textShadow: '0 2px 8px #0001'
                                    }}
                                >
                                    <span
                                        className="logo-text"
                                        style={{
                                            fontSize: '2.1rem',
                                            fontWeight: 900,
                                            color: '#222',
                                            letterSpacing: 2,
                                            textShadow: '0 2px 8px #3b82f633'
                                        }}
                                    >
                                        HR
                                    </span>
                                    <span
                                        className="logo-text"
                                        style={{
                                            marginLeft: '0.65em',
                                            marginTop: '0.1em', // <-- separa "Store" de la línea
                                            fontWeight: 750,
                                            fontSize: '1.5em',
                                            color: '#3b82f6',
                                            letterSpacing: 4,
                                            textShadow: '0 1px 4px #3b82f622'
                                        }}
                                    >
                                        Store
                                    </span>
                                </div>
                            </div>
                            
                            {/* Apple-style horizontal menu */}
                            <nav className="main-navigation">
                                <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
                                    <span>Inicio</span>
                                </a>
                                <a href="/products" className="nav-link" onClick={(e) => { e.preventDefault(); window.location.href = '/products'; }}>
                                    <span>Productos</span>
                                </a>
                                <a href="/services" className="nav-link" onClick={(e) => { e.preventDefault(); window.location.href = '/services'; }}>
                                    <span>Servicios</span>
                                </a>
                                <a href="#about" className="nav-link">
                                    <span>Nosotros</span>
                                </a>
                                <a href="/contact" className="nav-link" onClick={(e) => { e.preventDefault(); window.location.href = '/contact'; }}>
                                    <span>Contacto</span>
                                </a>
                            </nav>
                            
                            {/* Tools (cart, search, etc) */}
                            <div className="header-tools">
                                <button className="tool-btn cart-tool" onClick={openCart} style={{ position: 'relative' }}>
                                    <FaShoppingCart />
                                    {getTotalItems() > 0 && (
                                        <span
                                            className="cart-badge"
                                            style={{
                                                position: 'absolute',
                                                top: '-6px',
                                                right: '-6px',
                                                minWidth: '18px',
                                                height: '18px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                background: '#f4212e',
                                                color: '#fff',
                                                borderRadius: '50%',
                                                border: '2px solid #fff',
                                                boxShadow: '0 2px 8px #f4212e33',
                                                zIndex: 2,
                                                padding: '0 5px',
                                            }}
                                        >
                                            {getTotalItems()}
                                        </span>
                                    )}
                                    <span className="tool-tooltip"></span>
                                </button>
                                {/* Botón de búsqueda global */}
                                <button className="tool-btn search-tool" onClick={() => setShowGlobalSearch(true)} aria-label="Buscar productos">
                                    <FaSearch />
                                    <span className="tool-tooltip"></span>
                                </button>
                                {/* Botón hamburguesa con nuevo diseño */}
                                <button
                                    className="mobile-menu-btn left-menu-btn modern-burger"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    style={{
                                        position: 'fixed',
                                        left: 18,
                                        top: 18,
                                        zIndex: 1301,
                                        background: 'linear-gradient(135deg, #3b82f6 60%, #6366f1 100%)',
                                        border: 'none',
                                        borderRadius: 12,
                                        width: 48,
                                        height: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 4px 16px rgba(59,130,246,0.18)',
                                        transition: 'all 0.2s',
                                        color: '#fff',
                                        fontSize: 28,
                                        cursor: 'pointer',
                                        outline: 'none',
                                    }}
                                    aria-label="Abrir menú"
                                >
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect y="6" width="28" height="3.5" rx="1.5" fill="currentColor"/>
                                        <rect y="12.25" width="28" height="3.5" rx="1.5" fill="currentColor"/>
                                        <rect y="18.5" width="28" height="3.5" rx="1.5" fill="currentColor"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <CartSidebar
                isOpen={isCartOpen}
                onClose={closeCart}
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
                onCheckout={handleCheckout}
                setShowPaymentModal={setShowPaymentModal} // <-- AGREGA ESTA LÍNEA
            />

            {showGlobalSearch && (
                <div className="global-search-modal" onClick={() => setShowGlobalSearch(false)}>
                    <div className="global-search-box" onClick={e => e.stopPropagation()}>
                        <div className="product-search-bar">
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                autoComplete="off"
                            />
                        </div>
                        {showSuggestions && search.length > 0 && (
                            <ul className="product-suggestions-list">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.slice(0, 8).map(product => (
                                        <li key={product.id} className="product-suggestion-item">
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="product-suggestion-link"
                                                onClick={() => {
                                                    setShowGlobalSearch(false);
                                                    setSearch('');
                                                }}
                                            >
                                                <img src={product.image} alt={product.name} className="product-suggestion-img" />
                                                <span className="product-suggestion-name">{product.name}</span>
                                            </Link>
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
        </>
    );
};

export default Header;