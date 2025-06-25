import React from 'react';
import Header from '../components/Header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebook, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import '../styles/contact.css';

const Contact: React.FC = () => {
    // Coordenadas de ejemplo (Ciudad de México)
    const latitude = 19.4326;
    const longitude = -99.1332;
    
    const handleMapClick = () => {
        // Abrir en Google Maps
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(googleMapsUrl, '_blank');
    };

    const handleWhatsAppClick = () => {
        const phoneNumber = '5255123456789';
        const message = 'Hola, me interesa conocer más sobre sus productos y servicios.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="contact-page">
            <Header />
            
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <h1>📞 Contáctanos</h1>
                    <p>Estamos aquí para ayudarte con todas tus necesidades de reparación de dispositivos móviles</p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="contact-content">
                <div className="container">
                    
                    {/* Contact Info Cards - Compact Grid */}
                    <div className="contact-info-grid">
                        <div className="contact-card">
                            <div className="contact-icon">
                                <FaPhone />
                            </div>
                            <div className="contact-details">
                                <h3>Teléfono</h3>
                                <p>+52 55 1234 5678</p>
                                <span>Llamadas y WhatsApp</span>
                            </div>
                        </div>
                        
                        <div className="contact-card">
                            <div className="contact-icon">
                                <FaEnvelope />
                            </div>
                            <div className="contact-details">
                                <h3>Email</h3>
                                <p>info@hrstore.com</p>
                                <span>Respuesta en 24hrs</span>
                            </div>
                        </div>
                        
                        <div className="contact-card">
                            <div className="contact-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <div className="contact-details">
                                <h3>Dirección</h3>
                                <p>Av. Insurgentes Sur 1234</p>
                                <span>Col. Del Valle, CDMX</span>
                            </div>
                        </div>
                        
                        <div className="contact-card">
                            <div className="contact-icon">
                                <FaClock />
                            </div>
                            <div className="contact-details">
                                <h3>Horarios</h3>
                                <p>Lun - Vie: 9:00 - 18:00</p>
                                <span>Sáb: 10:00 - 14:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section - Dedicated Full Width */}
            <section className="map-section-hero">
                <div className="container">
                    <div className="map-header">
                        <h2>🗺️ Nuestra Ubicación</h2>
                        <p>Haz clic en el mapa para abrir en Google Maps y obtener direcciones</p>
                    </div>
                </div>
                
                <div className="map-container-hero" onClick={handleMapClick}>
                    <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.008},${latitude-0.008},${longitude+0.008},${latitude+0.008}&layer=mapnik&marker=${latitude},${longitude}`}
                        width="100%"
                        height="600"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="Mapa de ubicación HRStore"
                    ></iframe>
                    <div className="map-overlay">
                        <div className="map-click-hint">
                            <FaMapMarkerAlt />
                            <span>Haz clic para abrir en Google Maps</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Section - Form and Social */}
            <section className="contact-form-social">
                <div className="container">
                    <div className="contact-bottom-grid">
                        {/* Contact Form */}
                        <div className="contact-form-section">
                            <div className="form-header">
                                <h3><FaPaperPlane /> Envíanos un Mensaje</h3>
                                <p>¿Tienes alguna pregunta? Escríbenos y te responderemos pronto</p>
                            </div>
                            <form className="contact-form">
                                <div className="form-row">
                                    <input type="text" placeholder="Tu nombre completo" required />
                                    <input type="email" placeholder="Tu correo electrónico" required />
                                </div>
                                <input type="text" placeholder="Asunto del mensaje" required />
                                <textarea placeholder="Describe tu consulta o necesidad..." rows={6} required></textarea>
                                <button type="submit" className="submit-btn">
                                    <FaPaperPlane />
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>

                        {/* Social Media and Support */}
                        <div className="social-section">
                            <div className="social-header">
                                <h3><FaWhatsapp /> Contacto Directo</h3>
                                <p>Comunícate directamente con nosotros por WhatsApp para atención inmediata</p>
                            </div>
                            
                            <div className="whatsapp-cta">
                                <button onClick={handleWhatsAppClick} className="whatsapp-main-btn">
                                    <FaWhatsapp />
                                    <div>
                                        <span className="btn-title">Chatear por WhatsApp</span>
                                        <span className="btn-subtitle">Respuesta inmediata</span>
                                    </div>
                                </button>
                            </div>

                            <div className="social-networks">
                                <h4>📱 Síguenos en Redes Sociales</h4>
                                <div className="social-buttons">
                                    <button className="social-btn facebook">
                                        <FaFacebook />
                                        Facebook
                                    </button>
                                    <button className="social-btn instagram">
                                        <FaInstagram />
                                        Instagram
                                    </button>
                                </div>
                            </div>
                            
                            {/* Additional Info */}
                            <div className="support-info">
                                <h4>🛠️ Soporte Técnico</h4>
                                <p>Nuestros especialistas están disponibles para consultas técnicas, diagnósticos y asesoría personalizada sobre reparaciones.</p>
                                <ul className="support-features">
                                    <li>✅ Diagnóstico gratuito</li>
                                    <li>✅ Presupuesto sin compromiso</li>
                                    <li>✅ Garantía en todas las reparaciones</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
