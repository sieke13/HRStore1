import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  createdAt: string;
}

// Sample products for development
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Funda iPhone 14 Pro Max',
    price: 299,
    category: 'Fundas',
    description: 'Funda resistente con protección militar para iPhone 14 Pro Max',
    image: '/src/assets/images/android-repair.svg',
    stock: 15,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Protector de Pantalla Cristal Templado',
    price: 199,
    category: 'Protectores',
    description: 'Cristal templado 9H con instalación gratuita',
    image: '/src/assets/images/iphone-repair.svg',
    stock: 25,
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'Cargador Rápido USB-C 65W',
    price: 499,
    category: 'Cargadores',
    description: 'Cargador rápido universal compatible con todos los dispositivos',
    image: '/src/assets/images/repair-tools.svg',
    stock: 12,
    createdAt: '2024-01-03'
  },
  {
    id: '4',
    name: 'Auriculares Bluetooth Premium',
    price: 899,
    category: 'Accesorios',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    image: '/src/assets/images/screen-replacement.svg',
    stock: 8,
    createdAt: '2024-01-04'
  },
  {
    id: '5',
    name: 'Soporte para Auto Magnético',
    price: 349,
    category: 'Accesorios',
    description: 'Soporte magnético para el auto con rotación 360°',
    image: '/src/assets/images/android-repair.svg',
    stock: 20,
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    name: 'Cable Lightning MFi Certificado',
    price: 249,
    category: 'Cables',
    description: 'Cable Lightning original certificado por Apple',
    image: '/src/assets/images/iphone-repair.svg',
    stock: 30,
    createdAt: '2024-01-06'
  }
];

const API_URL =
  import.meta.env.DEV
    ? '/.netlify/functions/products'
    : '/api/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);

  useEffect(() => {
    loadProducts();
  }, []);

  // Fetch all products from Netlify Function
  const loadProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        // Defensive: always use the array from data.products
        setProducts(Array.isArray(data.products) ? data.products : SAMPLE_PRODUCTS);
      }
    } catch {
      // In development, use sample products if API fails
      console.log('Using sample products for development');
      setProducts(SAMPLE_PRODUCTS);
    }
  };

  // Add a product
  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    }
    return null;
  };

  // Update a product
  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updatedProduct }),
    });
    if (res.ok) loadProducts();
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    const res = await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const refreshProducts = () => {
    loadProducts();
  };

  const getRecentProducts = (limit: number = 4) => {
    const sortedProducts = [...products].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sortedProducts.slice(0, limit);
  };

  const isNewProduct = (productId: string, daysThreshold: number = 7) => {
    const product = products.find(p => p.id === productId);
    if (!product) return false;
    const productDate = new Date(product.createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= daysThreshold;
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductById,
    getRecentProducts,
    isNewProduct,
    refreshProducts,
  };
};
