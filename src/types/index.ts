export interface Product {
    id: string;
    name: string;
    title?: string; // Para compatibilidad con componentes existentes
    description: string;
    price: number;
    image: string;
    imageUrl?: string; // Para compatibilidad con componentes existentes
    category: string;
    stock: number;
    createdAt: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    totalPrice: number;
}