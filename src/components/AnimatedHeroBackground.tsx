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
            
        }, 3500); // Cambiar cada 2.5 segundos

        return () => clearInterval(interval);
    }, [repairImages.length]);    const handleImageError = () => {
        console.log('Error loading image, skipping to next');
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % repairImages.length
        );
    };

    const currentImage = repairImages[currentImageIndex];
    return (
        <div className="animated-hero-background" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            overflow: 'hidden',
        }}>
            <div
                className={`repair-image-container ${isVisible ? 'visible' : 'hidden'}`}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 1s',
                    opacity: isVisible ? 1 : 0,
                    zIndex: 1,
                }}
            >
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className={`repair-image ${currentImage.type === 'photo' ? 'photo-style' : 'svg-style'}`}
                    onError={handleImageError}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.22,
                        filter: 'blur(0.5px)',
                        borderRadius: 32,
                        boxShadow: '0 8px 48px #0002',
                        background: '#fff',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        pointerEvents: 'none',
                        transition: 'opacity 1s',
                    }}
                />
            </div>
        </div>
    );
};

export default AnimatedHeroBackground;
