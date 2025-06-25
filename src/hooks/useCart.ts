import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Cargar carrito desde localStorage
    const savedCart = localStorage.getItem('hrstore_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('hrstore_cart', JSON.stringify(items));
  };
  const addToCart = (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }, quantityToAdd: number = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
      saveCart(updatedItems);
    } else {
      const newItem: CartItem = {
        ...product,
        quantity: quantityToAdd
      };
      saveCart([...cartItems, newItem]);
    }
    
    // Abrir el carrito automáticamente
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCart(updatedItems);
  };

  const removeFromCart = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    saveCart(updatedItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const handleCheckout = () => {
    // Aquí implementarías la lógica de checkout
    // Por ahora solo cerramos el carrito y mostramos un mensaje
    alert(`Procesando pago por $MX ${getTotalPrice().toFixed(2)}. Funcionalidad de pago próximamente!`);
    closeCart();
  };

  return {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    openCart,
    closeCart,
    handleCheckout
  };
};
