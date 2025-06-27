import React from 'react';

interface ProductCardProps {
    id: string;
    image: string;
    title: string;
    price: number;
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price, onAddToCart }) => {
    const handleCardClick = (e: React.MouseEvent) => {
        // Si el click no es en el botón, navegar al detalle del producto
        if ((e.target as HTMLElement).tagName !== 'BUTTON') {
            window.location.href = `/product/${id}`;
        }
    };

    return (
        <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <img 
                src={image || '/logo.svg'}
                alt={title || 'Producto'}
                className="product-image"
                style={{
                    width: '100%',
                    height: 120,
                    objectFit: 'contain',
                    background: '#f9f9fa',
                    borderRadius: 18,
                    marginBottom: '1rem',
                    display: 'block'
                }}
                onError={e => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/logo.svg') target.src = '/logo.svg';
                }}
                loading="lazy"
            />
            <h2 className="product-title">{title || 'Sin nombre'}</h2>
            <p className="product-price">${typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : '0.00'} MXN</p>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart();
                }} 
                className="add-to-cart-button"
            >
                🛒 Agregar al Carrito
            </button>
        </div>
    );
};

export default ProductCard;