import React from 'react';
import Header from '../components/Header';
import BrandsCarousel from '../components/BrandsCarousel';
import ProfessionalStats from '../components/ProfessionalStats';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import WhatsAppChatbot from '../components/WhatsAppChatbot';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import '../styles/products.css';

const Products: React.FC = () => {
    const { products } = useProducts(); // Usar productos dinámicos
    const { 
        cartItems, 
        isCartOpen, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        closeCart, 
        handleCheckout,
         
    } = useCart();

    const handleAddToCart = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
        }
    };
    return (
        <div className="products-page">
            <Header />
            
            {/* Estadísticas Profesionales */}
            <ProfessionalStats />
            
            {/* Carrusel de Marcas */}
            <BrandsCarousel />
            
            <div className="container">
                <div className="products-header">
                    <h1>Nuestros Productos</h1>
                    <p>Encuentra las mejores herramientas para reparación de dispositivos móviles</p>
                </div>
                <div className="product-list">
                    {products.map(product => (
                        <ProductCard 
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            title={product.name}
                            price={product.price}
                            onAddToCart={() => handleAddToCart(product.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Carrito lateral */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={closeCart}
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
                onCheckout={handleCheckout}
            />
            
            {/* WhatsApp Chatbot */}
            <WhatsAppChatbot />
        </div>
    );
};

export default Products;