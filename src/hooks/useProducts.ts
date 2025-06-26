import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

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

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  // Fetch all products from Supabase
  const loadProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('createdAt', { ascending: false });
    if (!error && data) setProducts(data as Product[]);
  };

  // Add a product to Supabase
  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct = {
      ...product,
      createdAt: new Date().toISOString(),
      stock: product.stock || 0
    };
    const { data, error } = await supabase.from('products').insert([newProduct]).select();
    if (!error && data && data[0]) {
      setProducts(prev => [data[0], ...prev]);
      return data[0];
    }
    return null;
  };

  // Update a product in Supabase
  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const { error } = await supabase.from('products').update(updatedProduct).eq('id', id);
    if (!error) loadProducts();
  };

  // Delete a product from Supabase
  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(prev => prev.filter(p => p.id !== id));
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
    refreshProducts
  };
};
