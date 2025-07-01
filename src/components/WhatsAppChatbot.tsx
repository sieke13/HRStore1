import React, { useState } from 'react';
import { FaTimes, FaPhone, FaQuestionCircle, FaTools, FaShoppingCart } from 'react-icons/fa';

// WhatsAppBotIcon merged inline for single-file component
const WhatsAppBotIcon: React.FC<{ size?: number | string }> = ({ size = 38 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#25D366"/>
    <g filter="url(#glow)">
      <path d="M34.5 25.5c-.45-.3-2.55-1.2-3-1.5s-.75-.3-1.05.15c-.3.45-1.2 1.5-1.5 1.8-.3.3-.6.3-1.05.15-.45-.3-1.8-.6-3.45-1.95-1.2-1.05-1.95-2.25-2.25-2.7-.3-.45 0-.75.15-1.05.15-.15.3-.45.45-.75.15-.3.15-.6 0-.9s-1.05-2.55-1.35-3.45c-.3-.9-.6-.75-1.05-.75h-.9c-.3 0-.75.15-1.05.45-.3.3-1.5 1.5-1.5 3.75s1.5 4.35 1.65 4.65c.15.3 3.15 4.8 7.8 6.45 1.05.3 1.8.45 2.4.3.75-.15 2.25-.9 2.55-1.8.3-.9.3-1.65.15-1.8z" fill="#fff"/>
    </g>
    <ellipse cx="24" cy="38" rx="7" ry="2.5" fill="#128C7E" opacity="0.18"/>
    <g>
      <circle cx="36" cy="14" r="4" fill="#fff"/>
      <text x="36" y="17" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill="#25D366">BOT</text>
    </g>
    <defs>
      <filter id="glow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  </svg>
);

interface ChatOption {
    id: string;
    text: string;
    icon: React.ReactNode;
    message: string;
}

const WhatsAppChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [customMessage, setCustomMessage] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: '¡Hola! 👋 Soy el asistente virtual de HRStore. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [userMessageCount, setUserMessageCount] = useState(0);
    const chatOptions: ChatOption[] = [
        {
            id: 'consultation',
            text: 'Consulta Técnica',
            icon: <FaQuestionCircle />,
            message: 'Hola! Me interesa hacer una consulta técnica sobre reparación de dispositivos. ¿Podrían ayudarme?'
        },
        {
            id: 'services',
            text: 'Reparación',
            icon: <FaTools />,
            message: 'Hola! Me gustaría conocer más sobre sus servicios de reparación. ¿Qué dispositivos reparan y cuáles son los precios?'
        },
        {
            id: 'products',
            text: 'Productos',
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

    const whatsappNumber = '525512345678'; // Cambia por tu número real
    const handleOptionClick = (option: ChatOption) => {
        setMessages(prev => ([...prev, { sender: 'user', text: option.text }, { sender: 'bot', text: getBotReply(option.id) }]));
        setUserMessageCount(count => {
            const newCount = count + 1;
            if (newCount >= 3) {
                sendToWhatsApp(option.message);
                return 0;
            }
            return newCount;
        });
    };

    const handleSendCustomMessage = () => {
        if (!customMessage.trim()) return;
        setMessages(prev => ([...prev, { sender: 'user', text: customMessage }]));
        setUserMessageCount(count => {
            const newCount = count + 1;
            if (newCount >= 3) {
                sendToWhatsApp(customMessage);
                setCustomMessage('');
                return 0;
            } else {
                setMessages(prev => ([...prev, { sender: 'bot', text: getBotReply('custom', customMessage) }]));
                setCustomMessage('');
                return newCount;
            }
        });
    };

    function sendToWhatsApp(lastMessage: string) {
        const allUserMessages = messages
            .filter(m => m.sender === 'user')
            .map(m => m.text)
            .concat(lastMessage)
            .join('\n');
        const encodedMessage = encodeURIComponent(allUserMessages);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
        setMessages([
            { sender: 'bot', text: '¡Hola! 👋 Soy el asistente virtual de HRStore. ¿En qué puedo ayudarte hoy?' }
        ]);
    }

    function getBotReply(optionId: string, userMsg?: string) {
        switch(optionId) {
            case 'consultation':
                return '¡Claro! Por favor, describe tu consulta técnica y te ayudaremos.';
            case 'services':
                return 'Ofrecemos reparación de celulares, tablets y computadoras. ¿Qué dispositivo necesitas reparar?';
            case 'products':
                return 'Tenemos herramientas y repuestos para reparación. ¿Buscas algo en particular?';
            case 'support':
                return 'Nuestro equipo de soporte está listo para ayudarte. ¿Cuál es tu duda?';
            case 'custom':
                return userMsg && userMsg.length < 10
                  ? '¿Podrías darme más detalles para poder ayudarte mejor?'
                  : '¡Gracias por tu mensaje! Un asesor te responderá pronto.';
            default:
                return '¿Puedes darme más detalles para poder ayudarte?';
        }
    }

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="whatsapp-chatbot">
            {/* Botón flotante */}
            <button 
                className={`whatsapp-float-btn ${isOpen ? 'active' : ''}`}
                onClick={toggleChat}
                aria-label="Abrir chat de WhatsApp"
            >
                {isOpen ? <FaTimes /> : <WhatsAppBotIcon size={38} />}
            </button>
            {isOpen && (
                <div className="whatsapp-chat-window">
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="chat-avatar">
                                <WhatsAppBotIcon size={28} />
                            </div>
                            <div className="chat-title">
                                <h4>HRStore Soporte</h4>
                                <span>En línea</span>
                            </div>
                        </div>
                        <button className="chat-close" onClick={toggleChat} aria-label="Cerrar chat">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="chat-body">
                        <div className="chat-history">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`chat-message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
                                    <div className="message-content">{msg.text}</div>
                                </div>
                            ))}
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
                        <form className="chat-custom-message" onSubmit={e => { e.preventDefault(); handleSendCustomMessage(); }}>
                            <input
                                type="text"
                                className="custom-message-input"
                                placeholder="Escribe tu mensaje..."
                                value={customMessage}
                                onChange={e => setCustomMessage(e.target.value)}
                                autoFocus
                            />
                            <button
                                className="custom-message-send"
                                type="submit"
                                disabled={!customMessage.trim()}
                                aria-label="Enviar mensaje"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </form>
                        <div className="chat-footer-info">
                            <small>
                                Al enviar tu mensaje, se abrirá WhatsApp para continuar la conversación.
                            </small>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhatsAppChatbot;
