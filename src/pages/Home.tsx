import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RepairSwiper from '../components/RepairSwiper';
import BrandsCarousel from '../components/BrandsCarousel';
import WhatsAppChatbot from '../components/WhatsAppChatbot';
import AnimatedHeroBackground from '../components/AnimatedHeroBackground';
import { useProducts } from '../hooks/useProducts';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

// Nuevos iconos para métodos de pago
import MercadoPagoNewIcon from '../assets/icons/mercadopago1.svg';
import PayPalNewIcon from '../assets/icons/PayPal.svg.png';
import TransferNewIcon from '../assets/icons/bank-transfer-professional.svg';

const Home: React.FC = () => {
    const { products, getRecentProducts, isNewProduct, refreshProducts } = useProducts();
    type Product = {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
    };

    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const recentProducts = getRecentProducts(4);
        setFeaturedProducts(recentProducts);
    }, [products]);

    useEffect(() => {
        const handleProductAdded = () => {
            refreshProducts();
        };
        window.addEventListener('productAdded', handleProductAdded as EventListener);
        return () => {
            window.removeEventListener('productAdded', handleProductAdded as EventListener);
        };
    }, [refreshProducts]);

    const getProductBadge = (productId: string, index: number) => {
        if (isNewProduct(productId)) {
            return { text: 'Nuevo', class: 'nueva' };
        }
        const badges = [
            { text: 'Más Vendido', class: '' },
            { text: 'Recomendado', class: 'recomendado' },
            { text: 'Oferta', class: 'oferta' },
            { text: 'Popular', class: 'popular' }
        ];
        return badges[index] || { text: 'Destacado', class: '' };
    };

    return (
        <div className="home" style={{ background: "#f5f5f7" }}>
            <Header />

            {/* Hero Section Apple-style */}
            <section
                className="hero"
                style={{
                    background: "#f5f5f7",
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '320px',
                    paddingTop: '3.5rem',
                    paddingBottom: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #e0e0e5'
                }}
            >
                {/* Puedes dejar el fondo animado si lo deseas */}
                <AnimatedHeroBackground />
                <div className="container">
                    <div className="hero-content" style={{ textAlign: 'left', maxWidth: 700, margin: '0 auto' }}>
                        <div className="hero-subtitle" style={{
                            color: '#86868b',
                            fontFamily: 'Orbitron, Arial, sans-serif',
                            fontWeight: 700,
                            fontSize: '1.3rem',
                            marginBottom: '1.2rem'
                        }}>
                            Confianza y calidad para profesionales
                        </div>
                        <h1 className="hero-title-glass"
                            style={{
                                color: '#1d1d1f',
                                background: 'none',
                                WebkitBackgroundClip: 'unset',
                                WebkitTextFillColor: 'unset',
                                textShadow: '0 2px 8px #fff, 0 0 2px #fff',
                                fontWeight: 900,
                                letterSpacing: '-1.5px',
                                fontFamily: 'Orbitron, Arial, sans-serif',
                                fontSize: '3.2rem',
                                lineHeight: 1.1,
                                maxWidth: '700px',
                                margin: '0 0 0.5em 0',
                                padding: 0,
                                borderRadius: 0,
                                backgroundColor: 'transparent'
                            }}
                        >
                            HRStore. <span style={{ color: '#86868b', fontWeight: 500 }}>La mejor forma de comprar herramientas y repuestos que amas.</span>
                        </h1>
                        <div className="hero-description"
                            style={{
                                color: '#515154',
                                fontWeight: 400,
                                fontSize: '1.25rem',
                                marginTop: '1.5rem',
                                maxWidth: 540
                            }}
                        >
                            Herramientas, repuestos y soporte para técnicos y talleres. Todo lo que necesitas para reparar celulares con éxito, en un solo lugar.
                        </div>
                        <div className="hero-buttons" style={{ marginTop: '2.2rem' }}>
                            <button className="btn-primary" onClick={() => window.location.href = '/products'}>
                                Ver Productos
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Repair Swiper Section */}
            <RepairSwiper />

            {/* Brands Carousel Section */}
            <BrandsCarousel />

            {/* Features Section Apple-style */}
            <section className="features" style={{ background: "#fff", borderRadius: 28, margin: "2.5rem 0", boxShadow: "0 2px 8px #0001" }}>
                <div className="container">
                    <h2 style={{ color: "#1d1d1f", fontFamily: 'Orbitron, Arial, sans-serif', fontWeight: 900, letterSpacing: '-1px' }}>¿Por qué elegir HRStore?</h2>
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

            {/* Products Preview Section Apple-style */}
            <section className="products-preview" style={{ background: "#f5f5f7" }}>
                <div className="container">
                    <h2 style={{ color: "#1d1d1f", fontFamily: 'Orbitron, Arial, sans-serif', fontWeight: 900, letterSpacing: '-1px' }}>Productos Destacados</h2>
                    <p style={{ color: "#86868b" }}>Los productos más recientes y populares para profesionales de la reparación</p>
                    <div className="products-grid">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((product, index) => {
                                const badge = getProductBadge(product.id, index);
                                return (
                                    <div
                                        key={product.id}
                                        className="product-preview"
                                        onClick={() => window.location.href = `/product/${product.id}`}
                                        style={{
                                            background: "#fff",
                                            borderRadius: 28,
                                            border: "1px solid #e0e0e5",
                                            boxShadow: "0 2px 8px #0001",
                                            padding: "2.2rem 1.5rem 1.5rem 1.5rem",
                                            textAlign: "center",
                                            cursor: "pointer",
                                            transition: "box-shadow 0.18s, border 0.18s, transform 0.18s"
                                        }}
                                    >
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} style={{ maxWidth: "100%", maxHeight: 110, objectFit: "contain", margin: "0 auto 1rem auto", display: "block" }} />
                                        </div>
                                        <div className="product-content">
                                            <h3 style={{ color: "#1d1d1f", fontFamily: 'Orbitron, Arial, sans-serif', fontWeight: 900 }}>{product.name}</h3>
                                            <p className="product-description" style={{ color: "#515154" }}>{product.description}</p>
                                            <div className="product-price" style={{ color: "#0071e3", fontWeight: 700, fontSize: "1.1rem" }}>${product.price.toFixed(2)} MXN</div>
                                            <div className={`product-badge ${badge.class}`} style={{
                                                background: "#0071e3",
                                                color: "#fff",
                                                borderRadius: 999,
                                                padding: "0.2em 1em",
                                                fontSize: "0.85em",
                                                fontWeight: 700,
                                                marginTop: "0.7em",
                                                display: "inline-block",
                                                letterSpacing: "0.5px"
                                            }}>{badge.text}</div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="no-products-message">
                                <p>No hay productos disponibles en este momento.</p>
                            </div>
                        )}
                    </div>
                    <div className="products-cta" style={{ marginTop: "2rem" }}>
                        <button className="btn-primary" onClick={() => window.location.href = '/products'}>
                            Ver Todos los Productos
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section Apple-style */}
            <section className="cta" style={{ background: "#fff", borderRadius: 28, margin: "2.5rem 0", boxShadow: "0 2px 8px #0001" }}>
                <div className="container" style={{ textAlign: "center" }}>
                    <h2 style={{ color: "#1d1d1f", fontFamily: 'Orbitron, Arial, sans-serif', fontWeight: 900, letterSpacing: '-1px' }}>¡Comienza a reparar como un profesional!</h2>
                    <p style={{ color: "#86868b" }}>Únete a miles de técnicos que confían en nuestras herramientas</p>
                    <button className="btn-primary" onClick={() => window.location.href = '/products'}>Explorar Catálogo</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" style={{ background: "#f5f5f7", borderTop: "1px solid #e0e0e5" }}>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3 style={{ color: "#1d1d1f", fontFamily: 'Orbitron, Arial, sans-serif', fontWeight: 900 }}>HRStore</h3>
                            <p style={{ color: "#86868b" }}>Tu tienda especializada en herramientas para reparación de celulares</p>
                            <div className="social-media">
                                <h4 style={{ color: "#1d1d1f" }}>Síguenos</h4>
                                <div className="social-icons">
                                    <a href="#" className="social-icon whatsapp" aria-label="WhatsApp"><FaWhatsapp /></a>
                                    <a href="#" className="social-icon facebook" aria-label="Facebook"><FaFacebook /></a>
                                    <a href="#" className="social-icon instagram" aria-label="Instagram"><FaInstagram /></a>
                                    <a href="#" className="social-icon tiktok" aria-label="TikTok"><FaTiktok /></a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h4 style={{ color: "#1d1d1f" }}>Enlaces</h4>
                            <ul>
                                <li><a href="/">Inicio</a></li>
                                <li><a href="/products">Productos</a></li>
                                <li><a href="/services">Servicios</a></li>
                                <li><a href="#contact">Contacto</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4 style={{ color: "#1d1d1f" }}>Contacto</h4>
                            <p style={{ color: "#86868b" }}>📞 +52 55 1234 5678</p>
                            <p style={{ color: "#86868b" }}>✉️ info@hrstore.com</p>
                            <p style={{ color: "#86868b" }}>📍 Ciudad de México, México</p>
                        </div>
                        <div className="footer-section">
                            <h4 style={{ color: "#1d1d1f" }}>Métodos de Pago</h4>
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
                                <p style={{ color: "#86868b" }}>&copy; 2025 HRStore. Todos los derechos reservados.</p>
                                <p className="made-by" style={{ color: "#86868b" }}>Made with ❤️ by <strong>Sieke</strong></p>
                            </div>
                            <div className="footer-links">

                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <WhatsAppChatbot />
        </div>
    );
};

export default Home;