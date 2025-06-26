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

const getSlideLink = (category: string) => {
  if (category === "Apple" || category === "Android") return "/services";
  if (category === "Herramientas" || category === "Repuestos") return "/products";
  return "#";
};

const RepairSwiper: React.FC = () => {
  return (
    <section className="repair-swiper-section" style={{
      background: "#f5f5f7",
      padding: "3rem 0 3.5rem 0"
    }}>
      <div className="container">
        <div className="swiper-header" style={{
          marginBottom: "2.2rem"
        }}>
          <h2 style={{
            fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
            color: "#1d1d1f",
            fontWeight: 900,
            fontSize: "2.1rem",
            letterSpacing: "-1px",
            marginBottom: "0.5rem",
            textAlign: "center"
          }}>
            Nuestros Servicios de Reparación
          </h2>
          <p style={{
            color: "#86868b",
            fontSize: "1.1rem",
            textAlign: "center"
          }}>
            Descubre todo lo que podemos hacer por tu dispositivo móvil
          </p>
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
              <div className="slide-content" style={{
                background: "#fff",
                borderRadius: "2.5rem",
                border: "1px solid #e0e0e5",
                overflow: "hidden",
                padding: "2.2rem 1.5rem 1.7rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 340,
                maxWidth: 340,
                margin: "0 auto",
              }}>
                <div className="slide-category" style={{
                  fontSize: "0.95rem",
                  color: "#0071e3",
                  fontWeight: 700,
                  marginBottom: "0.7rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}>
                  {slide.category}
                </div>
                <div className="slide-image" style={{
                  marginBottom: "1.2rem"
                }}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    style={{
                      maxWidth: 120,
                      maxHeight: 120,
                      objectFit: "contain",
                      borderRadius: "1.2rem",
                      background: "#f5f5f7",
                    }}
                  />
                </div>
                <div className="slide-text" style={{
                  textAlign: "center"
                }}>
                  <h3 style={{
                    fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
                    color: "#1d1d1f",
                    fontWeight: 900,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem"
                  }}>{slide.title}</h3>
                  <p style={{
                    color: "#515154",
                    fontSize: "1.05rem",
                    marginBottom: "1.2rem"
                  }}>{slide.description}</p>
                  <a
                    className="slide-cta"
                    href={getSlideLink(slide.category)}
                    style={{
                      background: "#0071e3",
                      color: "#fff",
                      borderRadius: "999px",
                      border: "none",
                      fontFamily: "'Orbitron', 'Inter', Arial, sans-serif",
                      fontWeight: 700,
                      padding: "0.6em 2em",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background 0.18s",
                      margin: "0 auto",
                      display: "block",
                      textDecoration: "none"
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conocer más
                  </a>
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
