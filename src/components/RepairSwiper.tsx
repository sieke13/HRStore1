import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Import images
import iphoneRepair from '../assets/images/iphone-repair.svg';
import androidRepair from '../assets/images/android-repair.svg';
import repairTools from '../assets/images/repair-tools.svg';
import screenReplacement from '../assets/images/screen-replacement.svg';

interface SlideData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Reparación de iPhone",
    description: "Especialistas en dispositivos Apple. Reparamos pantallas, baterías y más componentes con garantía.",
    image: iphoneRepair,
    category: "Apple"
  },
  {
    id: 2,
    title: "Reparación Android",
    description: "Expertos en Samsung, Huawei, Xiaomi y todas las marcas Android. Diagnóstico gratuito.",
    image: androidRepair,
    category: "Android"
  },
  {
    id: 3,
    title: "Herramientas Profesionales",
    description: "Kit completo de herramientas de precisión para reparaciones profesionales.",
    image: repairTools,
    category: "Herramientas"
  },
  {
    id: 4,
    title: "Cambio de Pantallas",
    description: "Reemplazo de pantallas LCD y OLED con garantía. Instalación profesional.",
    image: screenReplacement,
    category: "Repuestos"
  }
];

const RepairSwiper: React.FC = () => {
  return (
    <section className="repair-swiper-section">
      <div className="container">
        <div className="swiper-header">
          <h2>Nuestros Servicios de Reparación</h2>
          <p>Descubre todo lo que podemos hacer por tu dispositivo móvil</p>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="repair-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="repair-slide">
              <div className="slide-content">
                <div className="slide-category">{slide.category}</div>
                <div className="slide-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="slide-text">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  <button className="slide-cta">Conocer Más</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RepairSwiper;
