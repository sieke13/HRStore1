import React from 'react';
import { FaApple, FaAndroid, FaGoogle } from 'react-icons/fa';
import { SiSamsung, SiXiaomi, SiHuawei, SiOneplus, SiMotorola, SiLg, SiSony, SiNokia, SiOppo } from 'react-icons/si';

const BrandsCarousel: React.FC = () => {
    const brands = [
        { 
            name: 'Apple', 
            icon: <FaApple />, 
            color: '#000000',
            bgColor: '#f5f5f7'
        },
        { 
            name: 'Samsung', 
            icon: <SiSamsung />, 
            color: '#1f4788',
            bgColor: '#e8f0fe'
        },
        { 
            name: 'Xiaomi', 
            icon: <SiXiaomi />, 
            color: '#ff6900',
            bgColor: '#fff4e6'
        },
        { 
            name: 'Huawei', 
            icon: <SiHuawei />, 
            color: '#ff0000',
            bgColor: '#ffeaea'
        },
        { 
            name: 'Android', 
            icon: <FaAndroid />, 
            color: '#3ddc84',
            bgColor: '#e8f8f0'
        },
        { 
            name: 'OnePlus', 
            icon: <SiOneplus />, 
            color: '#eb0028',
            bgColor: '#ffeaea'
        },
        { 
            name: 'Motorola', 
            icon: <SiMotorola />, 
            color: '#004cff',
            bgColor: '#e8f0fe'
        },
        { 
            name: 'LG', 
            icon: <SiLg />, 
            color: '#a50034',
            bgColor: '#f8e8f0'
        },
        { 
            name: 'Sony', 
            icon: <SiSony />, 
            color: '#0072ce',
            bgColor: '#e8f4fd'
        },        { 
            name: 'Google', 
            icon: <FaGoogle />, 
            color: '#4285f4',
            bgColor: '#e8f0fe'
        },
        { 
            name: 'Nokia', 
            icon: <SiNokia />, 
            color: '#124191',
            bgColor: '#e8f0fe'
        },
        { 
            name: 'Oppo', 
            icon: <SiOppo />, 
            color: '#1ba784',
            bgColor: '#e8f8f4'
        }
    ];

    return (
        <section className="brands-carousel">
            <div className="container">
                <h2>Marcas que Reparamos</h2>
                <p>Especialistas en todas las marcas principales de smartphones</p>
                
                <div className="brands-wrapper">
                    <div className="brands-track">                        {[...brands, ...brands].map((brand, index) => (
                            <div 
                                key={`${brand.name}-${index}`} 
                                className="brand-item"
                                style={{ 
                                    '--brand-color': brand.color,
                                    '--brand-bg-color': brand.bgColor
                                } as React.CSSProperties}
                            >
                                <div className="brand-logo">{brand.icon}</div>
                                <span className="brand-name">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandsCarousel;
