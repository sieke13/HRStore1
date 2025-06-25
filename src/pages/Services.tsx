import React from 'react';
import Header from '../components/Header';
import BrandsCarousel from '../components/BrandsCarousel';
import ProfessionalStats from '../components/ProfessionalStats';
import WhatsAppChatbot from '../components/WhatsAppChatbot';
import { FaInstagram, FaTiktok, FaWhatsapp, FaCheck, FaStar, FaClock } from 'react-icons/fa';
import '../styles/services.css';

const Services: React.FC = () => {
    const services = [
        {
            id: 1,
            title: 'Reparación de Pantallas',
            description: 'Cambio de pantallas LCD, OLED y táctiles para todos los modelos de smartphones',
            price: 'Desde $800 MXN',
            duration: '30-60 min',
            image: '/src/assets/images/screen-replacement.svg',
            features: [
                'Pantallas originales y compatibles',
                'Garantía de 6 meses',
                'Instalación profesional',
                'Calibración de touch'
            ]
        },
        {
            id: 2,
            title: 'Cambio de Baterías',
            description: 'Reemplazo de baterías originales para mayor duración y rendimiento',
            price: 'Desde $500 MXN',
            duration: '20-40 min',
            image: '/src/assets/images/iphone-repair.svg',
            features: [
                'Baterías de alta calidad',
                'Garantía de 1 año',
                'Diagnóstico gratuito',
                'Optimización de carga'
            ]
        },
        {
            id: 3,
            title: 'Reparación de Puertos de Carga',
            description: 'Solución para problemas de carga, conexión USB y audio',
            price: 'Desde $400 MXN',
            duration: '45-90 min',
            image: '/src/assets/images/android-repair.svg',
            features: [
                'Limpieza profunda',
                'Cambio de conectores',
                'Reparación de circuitos',
                'Pruebas de funcionalidad'
            ]
        },
        {
            id: 4,
            title: 'Liberación de Equipos',
            description: 'Liberación de smartphones para cualquier compañía telefónica',
            price: 'Desde $300 MXN',
            duration: '10-30 min',
            image: '/src/assets/images/repair-tools.svg',
            features: [
                'Liberación permanente',
                'Sin riesgo de bloqueo',
                'Compatible con todas las marcas',
                'Proceso rápido y seguro'
            ]
        },
        {
            id: 5,
            title: 'Reparación de Cámaras',
            description: 'Solución para cámaras frontales y traseras que no funcionan',
            price: 'Desde $600 MXN',
            duration: '40-80 min',
            image: '/src/assets/images/screen-replacement.svg',
            features: [
                'Cámaras originales',
                'Calibración de enfoque',
                'Reparación de flash',
                'Pruebas de calidad'
            ]
        },
        {
            id: 6,
            title: 'Reparación de Audio',
            description: 'Solución para altavoces, micrófono y problemas de sonido',
            price: 'Desde $350 MXN',
            duration: '30-60 min',
            image: '/src/assets/images/repair-tools.svg',
            features: [
                'Limpieza de altavoces',
                'Cambio de componentes',
                'Calibración de audio',
                'Pruebas de llamadas'
            ]
        }
    ];

    const testimonials = [
        {
            name: 'María González',
            rating: 5,
            comment: 'Excelente servicio, mi iPhone quedó como nuevo. Muy recomendado!',
            service: 'Cambio de pantalla'
        },
        {
            name: 'Carlos Rodríguez',
            rating: 5,
            comment: 'Rápido y profesional. La batería de mi Samsung ahora dura todo el día.',
            service: 'Cambio de batería'
        },
        {
            name: 'Ana Martínez',
            rating: 5,
            comment: 'Liberaron mi teléfono sin problemas. Servicio de calidad.',
            service: 'Liberación'
        }
    ];    return (
        <div className="services-page">
            <Header />
            
            {/* Estadísticas Profesionales */}
            <ProfessionalStats />
            
            {/* Carrusel de Marcas */}
            <BrandsCarousel />
              {/* Services Grid */}
            <section className="services-grid-section">
                <div className="container">
                    <h2 className="section-title">Nuestros Servicios</h2>
                    <div className="services-grid">
                        {services.map(service => (
                            <div key={service.id} className="service-card">
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} />
                                    <div className="service-overlay">
                                        <span className="price-tag">{service.price}</span>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <div className="service-meta">
                                        <span className="duration">
                                            <FaClock /> {service.duration}
                                        </span>
                                        <span className="price">{service.price}</span>
                                    </div>
                                    <ul className="service-features">
                                        {service.features.map((feature, index) => (
                                            <li key={index}>
                                                <FaCheck /> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="service-btn">
                                        <FaWhatsapp /> Solicitar Cotización
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section">
                <div className="container">
                    <h2 className="section-title">Galería de Trabajos</h2>
                    <p className="section-description">
                        Mira algunos de nuestros trabajos más recientes y síguenos en redes sociales para más contenido
                    </p>
                    
                    <div className="social-gallery">
                        <div className="gallery-card instagram-card">
                            <div className="gallery-header">
                                <FaInstagram className="social-icon" />
                                <div className="gallery-info">
                                    <h3>Instagram</h3>
                                    <p>Fotos de nuestros trabajos diarios</p>
                                </div>
                            </div>
                            <div className="gallery-preview">
                                <div className="preview-grid">
                                    <div className="preview-item">📱</div>
                                    <div className="preview-item">🔧</div>
                                    <div className="preview-item">⚡</div>
                                    <div className="preview-item">✨</div>
                                </div>
                            </div>
                            <a 
                                href="https://instagram.com/hrstore_mx" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="gallery-btn instagram-btn"
                            >
                                Ver en Instagram
                            </a>
                        </div>

                        <div className="gallery-card tiktok-card">
                            <div className="gallery-header">
                                <FaTiktok className="social-icon" />
                                <div className="gallery-info">
                                    <h3>TikTok</h3>
                                    <p>Videos del proceso de reparación</p>
                                </div>
                            </div>
                            <div className="gallery-preview">
                                <div className="video-preview">
                                    <div className="play-button">▶️</div>
                                    <p>Videos tutoriales y reparaciones en vivo</p>
                                </div>
                            </div>
                            <a 
                                href="https://tiktok.com/@hrstore_mx" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="gallery-btn tiktok-btn"
                            >
                                Ver en TikTok
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="container">
                    <h2 className="section-title">Lo que dicen nuestros clientes</h2>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                                <p className="testimonial-comment">&quot;{testimonial.comment}&quot;</p>
                                <div className="testimonial-author">
                                    <strong>{testimonial.name}</strong>
                                    <span>{testimonial.service}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="services-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>¿Necesitas reparar tu smartphone?</h2>
                        <p>Contáctanos ahora y obtén un diagnóstico gratuito</p>
                        <div className="cta-buttons">
                            <a 
                                href="https://wa.me/5551234567?text=Hola,%20necesito%20una%20cotización%20para%20reparación"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cta-btn whatsapp-btn"
                            >
                                <FaWhatsapp /> WhatsApp
                            </a>                            <button 
                                className="cta-btn secondary-btn"
                                onClick={() => window.location.href = '/products'}
                            >
                                Ver Productos
                            </button>
                        </div>                    </div>
                </div>
            </section>
            
            {/* WhatsApp Chatbot */}
            <WhatsAppChatbot />
        </div>
    );
};

export default Services;
