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

const API_URL =
  import.meta.env.DEV
    ? '/.netlify/functions/products'
    : '/api/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  // Fetch all products from Netlify Function
  const loadProducts = async () => {
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
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
