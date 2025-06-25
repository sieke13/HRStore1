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

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('hrstore_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Productos de ejemplo inicial específicos para México
      const defaultProducts: Product[] = [
        {
          id: '1',
          name: 'Reparación Pantalla iPhone 13',
          price: 2499.99,
          category: 'reparaciones',
          description: 'Reparación completa de pantalla OLED para iPhone 13 con garantía de 6 meses. Incluye instalación y calibración.',
          image: '/src/assets/images/iphone-repair.svg',
          stock: 10,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Reparación Pantalla Samsung Galaxy S23',
          price: 1899.99,
          category: 'reparaciones',
          description: 'Reparación de pantalla AMOLED para Samsung Galaxy S23 con garantía. Servicio profesional.',
          image: '/src/assets/images/android-repair.svg',
          stock: 15,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Cambio de Batería iPhone 12',
          price: 899.99,
          category: 'reparaciones',
          description: 'Reemplazo de batería original para iPhone 12. Incluye revisión de salud de la batería.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 25,
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Reparación Placa Base iPhone',
          price: 3999.00,
          category: 'reparaciones',
          description: 'Reparación especializada de placa base para iPhone. Microsoladura y diagnóstico avanzado.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 5,
          createdAt: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Protector de Pantalla Cristal Templado',
          price: 249.99,
          category: 'accesorios',
          description: 'Protector de pantalla de cristal templado 9H con instalación incluida. Compatible con Face ID.',
          image: '/src/assets/images/screen-replacement.svg',
          stock: 50,
          createdAt: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Funda Protectora Transparente',
          price: 399.99,
          category: 'accesorios',
          description: 'Funda protectora transparente con refuerzo en esquinas. Material TPU de alta calidad.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 30,
          createdAt: new Date().toISOString()
        },
        {
          id: '7',
          name: 'Kit de Herramientas de Reparación',
          price: 599.99,
          category: 'componentes',
          description: 'Kit completo con destornilladores, ventosas, palancas y herramientas especializadas para reparación.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 20,
          createdAt: new Date().toISOString()
        },
        {
          id: '8',
          name: 'Cambio de Puerto de Carga',
          price: 799.99,
          category: 'reparaciones',
          description: 'Reparación completa del puerto de carga Lightning o USB-C. Incluye limpieza y calibración.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 12,
          createdAt: new Date().toISOString()
        },
        {
          id: '9',
          name: 'Cable USB-C a Lightning Certificado',
          price: 199.99,
          category: 'accesorios',
          description: 'Cable original certificado MFi de 1 metro. Carga rápida y transferencia de datos.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 40,
          createdAt: new Date().toISOString()
        },
        {
          id: '10',
          name: 'Servicio de Diagnóstico Completo',
          price: 299.99,
          category: 'servicios',
          description: 'Diagnóstico completo del dispositivo con reporte detallado. Incluye pruebas de hardware y software.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 100,
          createdAt: new Date().toISOString()
        },
        {
          id: '11',
          name: 'Reparación Cámara Trasera',
          price: 1299.99,
          category: 'reparaciones',
          description: 'Reparación o reemplazo de cámara trasera. Incluye calibración y pruebas de funcionalidad.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 8,
          createdAt: new Date().toISOString()
        },
        {
          id: '12',
          name: 'Audífonos Bluetooth Premium',
          price: 899.99,
          category: 'accesorios',
          description: 'Audífonos inalámbricos con cancelación de ruido y batería de larga duración.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 25,
          createdAt: new Date().toISOString()
        },
        {
          id: '13',
          name: 'Servicio de Liberación de Operador',
          price: 499.99,
          category: 'servicios',
          description: 'Liberación oficial de dispositivos iPhone y Android para todas las compañías.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 999,
          createdAt: new Date().toISOString()
        },
        {
          id: '14',
          name: 'Pantalla LCD Xiaomi Redmi Note',
          price: 699.99,
          category: 'componentes',
          description: 'Pantalla LCD de repuesto para Xiaomi Redmi Note series. Calidad OEM.',
          image: '/src/assets/images/android-repair.svg',
          stock: 18,
          createdAt: new Date().toISOString()
        },
        {
          id: '15',
          name: 'Limpieza Profunda de Dispositivo',
          price: 199.99,
          category: 'servicios',
          description: 'Limpieza completa interna y externa del dispositivo. Incluye desinfección.',
          image: '/src/assets/images/repair-tools.svg',
          stock: 50,
          createdAt: new Date().toISOString()
        }
      ];
      
      setProducts(defaultProducts);
      localStorage.setItem('hrstore_products', JSON.stringify(defaultProducts));
    }
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('hrstore_products', JSON.stringify(updatedProducts));
    return newProduct;
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('hrstore_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('hrstore_products', JSON.stringify(updatedProducts));
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
    // Ordenar productos por fecha de creación (más recientes primero)
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
  };  return {
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
