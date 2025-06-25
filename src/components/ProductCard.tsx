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
            <img src={image} alt={title} className="product-image" />
            <h2 className="product-title">{title}</h2>
            <p className="product-price">$MX {price.toFixed(2)}</p>
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