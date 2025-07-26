import React from 'react';
import Header from '../components/Header';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaTools, 
  FaClock, 
  FaStar,
  FaArrowRight,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaCheckCircle,
  FaMobile,
  FaCamera,
  FaHeadphones,
  FaUsers,
  FaThumbsUp,
  FaTrophy
} from 'react-icons/fa';

const Home: React.FC = () => {
    const { products } = useProducts();
    const featuredProducts = products.slice(0, 4);

    return (
        <>
            <Header />
            
            {/* Spacer for fixed header */}
            <div style={{ height: '104px' }} />
            
            {/* Hero Section - Diseño Minimalista */}
            <section className="hero-minimal">
                <div className="container">
                    <div className="hero-content-center">
                        <h1 className="hero-title-clean">
                            Reparaciones Profesionales
                            <br />
                            <span className="highlight-text">para tu Dispositivo</span>
                        </h1>
                        
                        <p className="hero-subtitle">
                            Servicio técnico especializado con garantía extendida y diagnóstico gratuito
                        </p>
                        
                        <div className="hero-buttons">
                            <Link to="/services" className="btn-primary-clean">
                                Solicitar Reparación
                            </Link>
                            <a href="tel:+5255123456" className="btn-secondary-clean">
                                <FaPhoneAlt className="btn-icon" />
                                Llamar Ahora
                            </a>
                        </div>
                        
                        <div className="hero-features">
                            <div className="feature-badge">
                                <FaShieldAlt className="feature-icon" />
                                <span>Garantía 6 meses</span>
                            </div>
                            <div className="feature-badge">
                                <FaClock className="feature-icon" />
                                <span>Entrega 24h</span>
                            </div>
                            <div className="feature-badge">
                                <FaTools className="feature-icon" />
                                <span>Técnicos certificados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Servicios Section - Cards Limpias */}
            <section className="services-clean">
                <div className="container">
                    <div className="section-header-clean">
                        <h2 className="section-title">Nuestros Servicios</h2>
                        <p className="section-subtitle">Soluciones especializadas para cada tipo de dispositivo</p>
                    </div>
                    
                    <div className="services-grid-clean">
                        <div className="service-card-clean">
                            <div className="service-icon-wrapper">
                                <FaMobile className="service-icon" />
                            </div>
                            <h3 className="service-title">Reparación de Pantallas</h3>
                            <p className="service-description">
                                Cambio de pantallas rotas, táctiles defectuosos y cristales protectores
                            </p>
                            <ul className="service-features">
                                <li><FaCheckCircle className="check-icon" />Pantallas originales</li>
                                <li><FaCheckCircle className="check-icon" />Instalación profesional</li>
                                <li><FaCheckCircle className="check-icon" />Garantía 6 meses</li>
                            </ul>
                            <Link to="/services" className="service-link">
                                Ver detalles <FaArrowRight />
                            </Link>
                        </div>
                        
                        <div className="service-card-clean">
                            <div className="service-icon-wrapper">
                                <FaTools className="service-icon" />
                            </div>
                            <h3 className="service-title">Reparaciones de Hardware</h3>
                            <p className="service-description">
                                Cambio de baterías, botones, puertos de carga y componentes internos
                            </p>
                            <ul className="service-features">
                                <li><FaCheckCircle className="check-icon" />Diagnóstico gratuito</li>
                                <li><FaCheckCircle className="check-icon" />Repuestos de calidad</li>
                                <li><FaCheckCircle className="check-icon" />Técnicos certificados</li>
                            </ul>
                            <Link to="/services" className="service-link">
                                Ver detalles <FaArrowRight />
                            </Link>
                        </div>
                        
                        <div className="service-card-clean">
                            <div className="service-icon-wrapper">
                                <FaCamera className="service-icon" />
                            </div>
                            <h3 className="service-title">Reparación de Cámaras</h3>
                            <p className="service-description">
                                Reparación de cámaras principales, frontales y sistemas de enfoque
                            </p>
                            <ul className="service-features">
                                <li><FaCheckCircle className="check-icon" />Calibración precisa</li>
                                <li><FaCheckCircle className="check-icon" />Pruebas de calidad</li>
                                <li><FaCheckCircle className="check-icon" />Resultados garantizados</li>
                            </ul>
                            <Link to="/services" className="service-link">
                                Ver detalles <FaArrowRight />
                            </Link>
                        </div>
                        
                        <div className="service-card-clean">
                            <div className="service-icon-wrapper">
                                <FaHeadphones className="service-icon" />
                            </div>
                            <h3 className="service-title">Audio y Conectividad</h3>
                            <p className="service-description">
                                Reparación de altavoces, micrófono, bluetooth y problemas de audio
                            </p>
                            <ul className="service-features">
                                <li><FaCheckCircle className="check-icon" />Audio cristalino</li>
                                <li><FaCheckCircle className="check-icon" />Conectividad estable</li>
                                <li><FaCheckCircle className="check-icon" />Pruebas exhaustivas</li>
                            </ul>
                            <Link to="/services" className="service-link">
                                Ver detalles <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Productos Destacados - Diseño Limpio */}
            <section className="products-clean">
                <div className="container">
                    <div className="section-header-clean">
                        <h2 className="section-title">Productos Destacados</h2>
                        <p className="section-subtitle">Accesorios y repuestos de la más alta calidad</p>
                    </div>
                    
                    <div className="products-grid-clean">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="product-card-clean">
                                <div className="product-image-wrapper">
                                    <div className="product-image" style={{backgroundImage: `url(${product.image})`}} />
                                    <div className="product-badge">Destacado</div>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="star-icon" />
                                        ))}
                                        <span className="rating-text">4.9 (250 reseñas)</span>
                                    </div>
                                    <div className="product-footer">
                                        <div className="product-price">${product.price}</div>
                                        <button className="add-to-cart-btn">
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="products-cta">
                        <Link to="/products" className="btn-outline-clean">
                            Ver todos los productos
                            <FaArrowRight className="btn-icon" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Por Qué Elegirnos - Diseño Minimalista */}
            <section className="why-us-clean">
                <div className="container">
                    <div className="section-header-clean">
                        <h2 className="section-title">¿Por qué confiar en nosotros?</h2>
                        <p className="section-subtitle">Años de experiencia respaldando cada reparación</p>
                    </div>
                    
                    <div className="why-us-grid">
                        <div className="feature-clean">
                            <div className="feature-icon-wrapper">
                                <FaUsers className="feature-icon" />
                            </div>
                            <h3 className="feature-title">+2,500 Clientes Satisfechos</h3>
                            <p className="feature-description">
                                Más de 2,500 reparaciones exitosas nos respaldan como líderes en el sector
                            </p>
                        </div>
                        
                        <div className="feature-clean">
                            <div className="feature-icon-wrapper">
                                <FaShieldAlt className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Garantía Extendida</h3>
                            <p className="feature-description">
                                6 meses de garantía en todas nuestras reparaciones y repuestos originales
                            </p>
                        </div>
                        
                        <div className="feature-clean">
                            <div className="feature-icon-wrapper">
                                <FaClock className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Servicio Express</h3>
                            <p className="feature-description">
                                Reparaciones en 24 horas o menos, sin comprometer la calidad del trabajo
                            </p>
                        </div>
                        
                        <div className="feature-clean">
                            <div className="feature-icon-wrapper">
                                <FaTools className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Técnicos Certificados</h3>
                            <p className="feature-description">
                                Equipo especializado con certificaciones internacionales en reparación
                            </p>
                        </div>
                        
                        <div className="feature-clean">
                            <div className="feature-icon-wrapper">
                                <FaThumbsUp className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Diagnóstico Gratuito</h3>
                            <p className="feature-description">
                                Evaluación completa sin costo para determinar el mejor plan de reparación
                            </p>
                        </div>
                        
                        <div className="feature-clean">
                            <div className="feature-icon-wrapper">
                                <FaTrophy className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Calidad Premium</h3>
                            <p className="feature-description">
                                Solo utilizamos repuestos originales y herramientas de última generación
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-clean">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">¿Tu dispositivo necesita reparación?</h2>
                        <p className="cta-subtitle">
                            Contáctanos ahora para un diagnóstico gratuito y recibe tu cotización en minutos
                        </p>
                        <div className="cta-buttons">
                            <a href="tel:+5255123456" className="btn-primary-clean">
                                <FaPhoneAlt className="btn-icon" />
                                Llamar Ahora
                            </a>
                            <a href="https://wa.me/5255123456" className="btn-secondary-clean" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp className="btn-icon" />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-clean">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-logo">
                                <div className="logo-image" style={{backgroundImage: "url('/src/assets/images/hrlogo2.jpg')"}} />
                                <h3>HR Store</h3>
                            </div>
                            <p className="footer-description">
                                Especialistas en reparación de dispositivos móviles con más de 5 años de experiencia.
                            </p>
                            <div className="social-links">
                                <a href="#" className="social-link">
                                    <FaWhatsapp />
                                </a>
                                <a href="#" className="social-link">
                                    <FaInstagram />
                                </a>
                                <a href="#" className="social-link">
                                    <FaTiktok />
                                </a>
                            </div>
                        </div>
                        
                        <div className="footer-section">
                            <h4 className="footer-title">Servicios</h4>
                            <ul className="footer-links">
                                <li><Link to="/services">Reparación de Pantallas</Link></li>
                                <li><Link to="/services">Cambio de Baterías</Link></li>
                                <li><Link to="/services">Reparación de Cámaras</Link></li>
                                <li><Link to="/services">Audio y Conectividad</Link></li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4 className="footer-title">Productos</h4>
                            <ul className="footer-links">
                                <li><Link to="/products">Fundas y Protectores</Link></li>
                                <li><Link to="/products">Cargadores</Link></li>
                                <li><Link to="/products">Audífonos</Link></li>
                                <li><Link to="/products">Accesorios</Link></li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4 className="footer-title">Contacto</h4>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <FaMapMarkerAlt className="contact-icon" />
                                    <span>Av. Principal 123, Centro</span>
                                </div>
                                <div className="contact-item">
                                    <FaPhoneAlt className="contact-icon" />
                                    <span>+52 55 1234 5678</span>
                                </div>
                                <div className="contact-item">
                                    <FaEnvelope className="contact-icon" />
                                    <span>info@hrstore.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <p>&copy; 2024 HR Store. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Home;
