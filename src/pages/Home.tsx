import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RepairSwiper from '../components/RepairSwiper';
import BrandsCarousel from '../components/BrandsCarousel';
import WhatsAppChatbot from '../components/WhatsAppChatbot';
import AnimatedHeroBackground from '../components/AnimatedHeroBackground';
import { useProducts } from '../hooks/useProducts';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

// Importar iconos SVG personalizados
//import MercadoPagoIcon from '../assets/icons/mercadopago.svg';
//import PayPalIcon from '../assets/icons/paypal.svg';
//import BankTransferIcon from '../assets/icons/bank-transfer.svg';
//import VisaIcon from '../assets/icons/visa.svg';
//import MastercardIcon from '../assets/icons/mastercard.svg';
//import CreditCardIcon from '../assets/icons/credit-card.svg';

// Nuevos iconos para métodos de pago
import MercadoPagoNewIcon from '../assets/icons/mercadopago1.svg';
import PayPalNewIcon from '../assets/icons/PayPal.svg.png';
import TransferNewIcon from '../assets/icons/bank-transfer-professional.svg';

const Home: React.FC = () => {
    const { getRecentProducts, isNewProduct, refreshProducts } = useProducts();
    type Product = {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        // Agrega aquí otros campos si tu producto los tiene
    };

    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Obtener los 4 productos más recientes para destacar
        const recentProducts = getRecentProducts(4);
        setFeaturedProducts(recentProducts);
    }, [getRecentProducts]);

    useEffect(() => {
        // Escuchar eventos de productos nuevos desde Admin
        const handleProductAdded = (event: CustomEvent) => {
            const { product,  } = event.detail;
            console.log('Nuevo producto agregado desde Admin:', product);
            
            // Actualizar productos desde localStorage
            refreshProducts();
            
            // Obtener productos más recientes actualizados
            setTimeout(() => {
                const updatedRecentProducts = getRecentProducts(4);
                setFeaturedProducts(updatedRecentProducts);
            }, 100);
        };

        window.addEventListener('productAdded', handleProductAdded as EventListener);
        
        return () => {
            window.removeEventListener('productAdded', handleProductAdded as EventListener);
        };
    }, [refreshProducts, getRecentProducts]);

    const getProductBadge = (productId: string, index: number) => {
        if (isNewProduct(productId)) {
            return { text: 'Nuevo', class: 'nueva' };
        }
        
        // Badges por posición si no es nuevo
        const badges = [
            { text: 'Más Vendido', class: '' },
            { text: 'Recomendado', class: 'recomendado' },
            { text: 'Oferta', class: 'oferta' },
            { text: 'Popular', class: 'popular' }
        ];
        
        return badges[index] || { text: 'Destacado', class: '' };
    };
    return (
        <div className="home">
            <Header />
            
            {/* Hero Section */}
            <section className="hero">
                <AnimatedHeroBackground />
                <div className="container">
                    <div className="hero-content">
                        <h1>Herramientas Profesionales para Reparación de Celulares</h1>
                        <div className="hero-buttons">
                            <button className="btn-primary" onClick={() => window.location.href = '/products'}>Ver Productos</button>
                            <button className="btn-secondary">Conocer Más</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Repair Swiper Section */}
            <RepairSwiper />

            {/* Brands Carousel Section */}
            <BrandsCarousel />

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2>¿Por qué elegir HRStore?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Envío Rápido</h3>
                            <p>Recibe tus herramientas en 24-48 horas</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔧</div>
                            <h3>Calidad Premium</h3>
                            <p>Herramientas profesionales de alta calidad</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3>Mejores Precios</h3>
                            <p>Precios competitivos para profesionales</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛠️</div>
                            <h3>Soporte Técnico</h3>
                            <p>Asesoría especializada en reparaciones</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Preview Section */}
            <section className="products-preview">
                <div className="container">
                    <h2>Productos Destacados</h2>
                    <p>Los productos más recientes y populares para profesionales de la reparación</p>
                    <div className="products-grid">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((product, index) => {
                                const badge = getProductBadge(product.id, index);
                                return (
                                    <div 
                                        key={product.id} 
                                        className="product-preview" 
                                        onClick={() => window.location.href = `/product/${product.id}`}
                                    >
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className="product-content">
                                            <h3>{product.name}</h3>
                                            <p className="product-description">{product.description}</p>
                                            <div className="product-price">${product.price.toFixed(2)} MXN</div>
                                            <div className={`product-badge ${badge.class}`}>{badge.text}</div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            // Fallback si no hay productos
                            <div className="no-products-message">
                                <p>No hay productos disponibles en este momento.</p>
                            </div>
                        )}
                    </div>
                    <div className="products-cta">
                        <button className="btn-primary" onClick={() => window.location.href = '/products'}>
                            Ver Todos los Productos
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <h2>¡Comienza a reparar como un profesional!</h2>
                    <p>Únete a miles de técnicos que confían en nuestras herramientas</p>
                    <button className="btn-primary" onClick={() => window.location.href = '/products'}>Explorar Catálogo</button>
                </div>
            </section>

            {/* Footer - Simplified */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>HRStore</h3>
                            <p>Tu tienda especializada en herramientas para reparación de celulares</p>
                            
                            {/* Redes Sociales */}
                            <div className="social-media">
                                <h4>Síguenos</h4>
                                <div className="social-icons">
                                    <a href="#" className="social-icon whatsapp" aria-label="WhatsApp">
                                        <FaWhatsapp />
                                    </a>
                                    <a href="#" className="social-icon facebook" aria-label="Facebook">
                                        <FaFacebook />
                                    </a>
                                    <a href="#" className="social-icon instagram" aria-label="Instagram">
                                        <FaInstagram />
                                    </a>
                                    <a href="#" className="social-icon tiktok" aria-label="TikTok">
                                        <FaTiktok />
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Enlaces</h4>
                            <ul>
                                <li><a href="/">Inicio</a></li>
                                <li><a href="/products">Productos</a></li>
                                <li><a href="/services">Servicios</a></li>
                                <li><a href="#contact">Contacto</a></li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Contacto</h4>
                            <p>📞 +52 55 1234 5678</p>
                            <p>✉️ info@hrstore.com</p>
                            <p>📍 Ciudad de México, México</p>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Métodos de Pago</h4>
                            <div className="payment-methods-footer">
                                <div className="payment-icon-group">
                                    <div className="payment-method-item">
                                        <img src={PayPalNewIcon} alt="PayPal" className="payment-icon-footer" />
                                        <span>PayPal</span>
                                    </div>
                                    <div className="payment-method-item">
                                        <img src={MercadoPagoNewIcon} alt="MercadoPago" className="payment-icon-footer" />
                                        <span>MercadoPago</span>
                                    </div>
                                    <div className="payment-method-item">
                                        <img src={TransferNewIcon} alt="Transferencia" className="payment-icon-footer" />
                                        <span>Transferencia</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <div className="footer-bottom-content">
                            <div className="footer-left">
                                <p>&copy; 2025 HRStore. Todos los derechos reservados.</p>
                                <p className="made-by">Made with ❤️ by <strong>Sieke</strong></p>
                            </div>
                            <div className="footer-links">
                                <a href="#privacy">Política de Privacidad</a>
                                <a href="#terms">Términos y Condiciones</a>
                                <a href="#security">Seguridad</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            
            {/* WhatsApp Chatbot */}
            <WhatsAppChatbot />
        </div>
    );
};

export default Home;