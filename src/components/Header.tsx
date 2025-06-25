import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok, FaShoppingCart, FaBars } from 'react-icons/fa';
import logoSvg from '../assets/images/logo.svg';
import { useCart } from '../hooks/useCart';
import CartSidebar from './CartSidebar';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    return (
        <>
            <header className="modern-header">
                <div className="header-top">
                    <div className="container">
                        <div className="top-bar">
                            <div className="contact-info">
                                {/* Información de contacto removida */}
                            </div>
                            <div className="social-media-top">
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
                            <div className="logo-section">
                                <div className="logo-container-new">
                                    <div className="logo-wrapper">
                                        <img src={logoSvg} alt="HRStore Logo" className="logo-image" />
                                    </div>
                                    <div className="brand-info">
                                        <h1 className="brand-name">HRStore</h1>
                                        <p className="brand-tagline">Herramientas Profesionales</p>
                                    </div>
                                </div>
                            </div>
                            
                            <nav className={`main-navigation ${isMenuOpen ? 'nav-open' : ''}`}>
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
                            
                            <div className="header-tools">
                                <button className="tool-btn cart-tool" onClick={openCart}>
                                    <FaShoppingCart />
                                    {getTotalItems() > 0 && (
                                        <span className="cart-badge">{getTotalItems()}</span>
                                    )}
                                    <span className="tool-tooltip">Carrito</span>
                                </button>
                                <button 
                                    className="mobile-menu-btn"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <FaBars />
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
            />
        </>
    );
};

export default Header;