import React, { useState, useEffect } from 'react';

// Importar las imágenes de reparaciones existentes
import AndroidRepair from '../assets/images/android-repair.svg';
import IPhoneRepair from '../assets/images/iphone-repair.svg';
import RepairTools from '../assets/images/repair-tools.svg';
import ScreenReplacement from '../assets/images/screen-replacement.svg';

// Importar las nuevas imágenes proporcionadas por el usuario
import HerramientasKit from '../assets/images/kit-de-herramientas-para-reparacion-de-celulares.jpg';
import PinzaDigital from '../assets/images/pinza-voltoamperimetrica-digital-fullenergy-mt87-400a.jpg';
import ComponenteElectronico from '../assets/images/184381_AC002GEN82.jpg';

const AnimatedHeroBackground: React.FC = () => {
    const repairImages = [
        // Nuevas imágenes proporcionadas por el usuario (priorizadas)
        { src: HerramientasKit, alt: 'Kit de Herramientas para Reparación', type: 'photo' },
        { src: PinzaDigital, alt: 'Pinza Voltoamperimétrica Digital', type: 'photo' },
        { src: ComponenteElectronico, alt: 'Componente Electrónico', type: 'photo' },
        
        // Imágenes SVG originales
        { src: AndroidRepair, alt: 'Reparación Android', type: 'svg' },
        { src: IPhoneRepair, alt: 'Reparación iPhone', type: 'svg' },
        { src: RepairTools, alt: 'Herramientas de Reparación', type: 'svg' },
        { src: ScreenReplacement, alt: 'Reemplazo de Pantalla', type: 'svg' }
    ];const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => 
                    (prevIndex + 1) % repairImages.length
                );
                setIsVisible(true);
            }, 300); // Tiempo para el fade out
            
        }, 2500); // Cambiar cada 2.5 segundos

        return () => clearInterval(interval);
    }, [repairImages.length]);    const handleImageError = () => {
        console.log('Error loading image, skipping to next');
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % repairImages.length
        );
    };

    const currentImage = repairImages[currentImageIndex];    return (
        <div className="animated-hero-background">
            <div className={`repair-image-container ${isVisible ? 'visible' : 'hidden'}`}>
                <img 
                    src={currentImage.src} 
                    alt={currentImage.alt}
                    className={`repair-image ${currentImage.type === 'photo' ? 'photo-style' : 'svg-style'}`}
                    onError={handleImageError}
                />
            </div>
            {/* Elementos decorativos flotantes */}
            <div className="floating-elements">
                <div className="floating-tool tool-1">🔧</div>
                <div className="floating-tool tool-2">📱</div>
                <div className="floating-tool tool-3">🔩</div>
                <div className="floating-tool tool-4">⚡</div>
                <div className="floating-tool tool-5">🛠️</div>
                <div className="floating-tool tool-6">🔌</div>
                <div className="floating-tool tool-7">📟</div>
            </div>
        </div>
    );
};

export default AnimatedHeroBackground;
