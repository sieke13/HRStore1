import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPhone, FaQuestionCircle, FaTools, FaShoppingCart } from 'react-icons/fa';

interface ChatOption {
    id: string;
    text: string;
    icon: React.ReactNode;
    message: string;
}

const WhatsAppChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const [currentStep, setCurrentStep] = useState('main');
      // IMPORTANTE: Reemplaza este número con tu número real de WhatsApp
    // Formato: código de país + número (sin espacios, guiones ni paréntesis)
    // Ejemplo para México: 52 + 55 + tu número de 8 dígitos
    const whatsappNumber = '525512345678'; // ⚠️ CAMBIAR POR TU NÚMERO REAL
    
    const chatOptions: ChatOption[] = [
        {
            id: 'consultation',
            text: 'Consulta Técnica',
            icon: <FaQuestionCircle />,
            message: 'Hola! Me interesa hacer una consulta técnica sobre reparación de dispositivos. ¿Podrían ayudarme?'
        },
        {
            id: 'services',
            text: 'Servicios de Reparación',
            icon: <FaTools />,
            message: 'Hola! Me gustaría conocer más sobre sus servicios de reparación. ¿Qué dispositivos reparan y cuáles son los precios?'
        },
        {
            id: 'products',
            text: 'Productos y Herramientas',
            icon: <FaShoppingCart />,
            message: 'Hola! Estoy interesado en comprar herramientas para reparación. ¿Podrían enviarme información sobre su catálogo de productos?'
        },
        {
            id: 'support',
            text: 'Soporte General',
            icon: <FaPhone />,
            message: 'Hola! Necesito ayuda general con HRStore. ¿Podrían asistirme?'
        }
    ];

    const handleOptionClick = (option: ChatOption) => {
        const encodedMessage = encodeURIComponent(option.message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        // setCurrentStep('main');
    };

    return (
        <div className="whatsapp-chatbot">
            {/* Botón flotante */}
            <button 
                className={`whatsapp-float-btn ${isOpen ? 'active' : ''}`}
                onClick={toggleChat}
                aria-label="Abrir chat de WhatsApp"
            >
                {isOpen ? <FaTimes /> : <FaWhatsapp />}
            </button>

            {/* Chat window */}
            {isOpen && (
                <div className="whatsapp-chat-window">
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="chat-avatar">
                                <FaWhatsapp />
                            </div>
                            <div className="chat-title">
                                <h4>HRStore Soporte</h4>
                                <span>En línea</span>
                            </div>
                        </div>
                        <button className="chat-close" onClick={toggleChat}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="chat-body">
                        <div className="chat-message bot-message">
                            <div className="message-content">
                                ¡Hola! 👋 Soy el asistente virtual de HRStore.
                                <br />
                                ¿En qué puedo ayudarte hoy?
                            </div>
                        </div>

                        <div className="chat-options">
                            {chatOptions.map((option) => (
                                <button
                                    key={option.id}
                                    className="chat-option"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <div className="option-icon">{option.icon}</div>
                                    <span>{option.text}</span>
                                </button>
                            ))}
                        </div>

                        <div className="chat-footer-info">
                            <small>
                                Al hacer clic serás redirigido a WhatsApp para continuar la conversación.
                            </small>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhatsAppChatbot;
