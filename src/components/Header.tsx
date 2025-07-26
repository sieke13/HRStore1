import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaShoppingCart, 
  FaBars, 
  FaTimes, 
  FaHome,
  FaMobile,
  FaTools,
  FaInfoCircle,
  FaEnvelope,
  FaUser
} from 'react-icons/fa';
import { useCart } from '../hooks/useCart';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, openCart, getTotalItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const menuItems = [
    { 
      name: 'Inicio', 
      path: '/', 
      icon: <FaHome />,
      description: 'Página principal'
    },
    { 
      name: 'Productos', 
      path: '/products', 
      icon: <FaMobile />,
      description: 'Accesorios y dispositivos'
    },
    { 
      name: 'Servicios', 
      path: '/services', 
      icon: <FaTools />,
      description: 'Reparaciones y mantenimiento'
    },
    { 
      name: 'Nosotros', 
      path: '/about', 
      icon: <FaInfoCircle />,
      description: 'Conoce nuestro equipo'
    },
    { 
      name: 'Contacto', 
      path: '/contact', 
      icon: <FaEnvelope />,
      description: 'Ponte en contacto'
    },
    { 
      name: 'Admin', 
      path: '/admin', 
      icon: <FaUser />,
      description: 'Panel administrativo'
    }
  ];

  const totalItems = getTotalItems();

  return (
    <>
      <header className="modern-header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img 
              src="/src/assets/images/hrlogo2.jpg" 
              alt="HR Store Logo" 
              className="logo-image"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {menuItems.slice(0, 5).map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="nav-link"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">
              Buscar
            </button>
          </form>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Cart Button */}
            <button 
              onClick={openCart}
              className="cart-button"
              aria-label="Carrito de compras"
            >
              <FaShoppingCart className="cart-icon" />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>

            {/* Admin Link */}
            <Link to="/admin" className="admin-link">
              <FaUser />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="mobile-menu-button"
              aria-label="Menú de navegación"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            <div className="mobile-nav-header">
              <img 
                src="/src/assets/images/hrlogo2.jpg" 
                alt="HR Store" 
                className="mobile-logo"
              />
              <button 
                onClick={toggleMenu}
                className="mobile-close-button"
                aria-label="Cerrar menú"
              >
                <FaTimes />
              </button>
            </div>
            
            <nav className="mobile-nav-menu">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="mobile-nav-item">
                    <div className="mobile-nav-icon">
                      {item.icon}
                    </div>
                    <div className="mobile-nav-text">
                      <span className="mobile-nav-title">{item.name}</span>
                      <span className="mobile-nav-description">{item.description}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mobile-search-form">
              <div className="mobile-search-container">
                <FaSearch className="mobile-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="mobile-search-input"
                />
                <button type="submit" className="mobile-search-button">
                  <FaSearch />
                </button>
              </div>
            </form>

            {/* Mobile Contact Info */}
            <div className="mobile-contact-info">
              <div className="contact-item">
                <FaEnvelope />
                <span>info@hrstore.com</span>
              </div>
              <div className="contact-item">
                <span>📞</span>
                <span>+52 555 123 4567</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="mobile-nav-backdrop"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Cerrar menú"
        />
      )}
    </>
  );
};

export default Header;
