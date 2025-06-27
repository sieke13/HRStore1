import React, { useState, useEffect } from 'react';
import '../styles/admin.css';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  createdAt: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

interface Settings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  currency: string;
}

const API_URL = '/.netlify/functions/products';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);  const [settings, setSettings] = useState<Settings>({
    storeName: 'HRStore',
    storeEmail: 'contacto@hrstore.com',
    storePhone: '+52 55 1234 5678',
    currency: 'MXN'
  });

  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    stock: 0
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
    // Orders and settings remain local for now
    const savedOrders = localStorage.getItem('hrstore_orders');
    const savedSettings = localStorage.getItem('hrstore_settings');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Fetch products from Netlify Function
  const loadProducts = async () => {
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products); // Use the array, not the object
    }
  };

  // Add or update product using Netlify Function
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validación de campos obligatorios
    if (!productForm.name || !productForm.price || !productForm.category || !productForm.description || !productForm.image || !productForm.stock) {
      alert('Todos los campos son obligatorios. Por favor, completa todos los datos antes de guardar.');
      return;
    }
    if (editingProduct) {
      // Update existing product
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingProduct.id, ...productForm }),
      });
      if (res.ok) {
        setEditingProduct(null);
        alert('Producto actualizado exitosamente!');
      }
    } else {
      // Add new product
      const newProduct = {
        name: productForm.name,
        price: Number(productForm.price),
        category: productForm.category,
        description: productForm.description,
        image: productForm.image, // this should be the Cloudinary URL
        stock: Number(productForm.stock),
        createdAt: new Date().toISOString(),
      };
      console.log('Submitting product:', newProduct);
      Object.entries(newProduct).forEach(([k, v]) => console.log(`${k}:`, v, typeof v));
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        alert(`Producto "${productForm.name}" agregado exitosamente! Ahora aparecerá destacado en Home con badge "Nuevo" y también en /products`);
      }
    }
    setProductForm({ name: '', price: 0, category: '', description: '', image: '', stock: 0 });
    loadProducts();
  };

  // Edit product (populate form)
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.stock,
    });
    setActiveTab('add-product');
  };

  // Delete product using Netlify Function
  const handleDeleteProduct = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (window.confirm(`¿Estás seguro de eliminar "${product?.name}"? Este producto también se eliminará de la página de productos.`)) {
      const res = await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId }),
      });
      if (res.ok) {
        alert('Producto eliminado exitosamente!');
        loadProducts();
      }
    }
  };

  // Upload image to Cloudinary and get URL
  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const url = 'https://api.cloudinary.com/v1_1/dsreqg20l/image/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hrstore_unsigned'); // Use your actual unsigned preset
    const res = await fetch(url, { method: 'POST', body: formData });
    if (res.ok) {
      const data = await res.json();
      return data.secure_url;
    }
    return null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImageToCloudinary(file);
      if (url) {
        setProductForm(prev => ({ ...prev, image: url }));
      } else {
        alert('Error subiendo la imagen');
      }
    }
  };

  const getTotalSales = () => {
    return orders.reduce((total, order) => 
      order.status === 'completed' ? total + order.total : total, 0
    );
  };

  const renderDashboard = () => (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{products.length}</div>
          <div className="stat-label">Productos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{orders.length}</div>
          <div className="stat-label">Órdenes</div>
        </div>        <div className="stat-card">
          <div className="stat-number">$MX {getTotalSales().toFixed(2)}</div>
          <div className="stat-label">Ventas Totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
          <div className="stat-label">Stock Total</div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="products-section">
      <h2>Gestionar Productos</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />            <h3>{product.name}</h3>
            <p className="product-price">$MX {product.price}</p>
            <p className="product-category">{product.category}</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <div className="product-actions">
              <button 
                className="btn-edit" 
                onClick={() => handleEditProduct(product)}
              >
                Editar
              </button>
              <button 
                className="btn-delete" 
                onClick={() => handleDeleteProduct(product.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddProduct = () => (
    <div className="add-product-section">
      <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleAddProduct} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            value={productForm.name ?? ''}
            onChange={e => setProductForm(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={productForm.price ?? 0}
            onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={productForm.category ?? ''}
            onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="reparaciones">Reparaciones</option>
            <option value="accesorios">Accesorios</option>
            <option value="componentes">Componentes</option>
            <option value="servicios">Servicios</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={productForm.description ?? ''}
            onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {productForm.image && (
            <img src={productForm.image} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            value={productForm.stock}
            onChange={(e) => setProductForm(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
          {editingProduct && (
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  price: 0,
                  category: '',
                  description: '',
                  image: '',
                  stock: 0
                });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-section">
      <h2>Órdenes</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No hay órdenes disponibles</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">#{order.id}</span>
                <span className={`order-status status-${order.status}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-details">
                <p><strong>Cliente:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.customerEmail}</p>                <p><strong>Total:</strong> $MX {order.total}</p>
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <h2>Configuración</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem('hrstore_settings', JSON.stringify(settings));
        alert('Configuración guardada exitosamente');
      }}>
        <div className="form-group">
          <label htmlFor="storeName">Nombre de la Tienda</label>
          <input
            type="text"
            id="storeName"
            value={settings.storeName}
            onChange={(e) => setSettings(prev => ({ ...prev, storeName: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="storeEmail">Email de Contacto</label>
          <input
            type="email"
            id="storeEmail"
            value={settings.storeEmail}
            onChange={(e) => setSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
          />
        </div>

        <div className="form-group">          <label htmlFor="storePhone">Teléfono</label>
          <input
            type="tel"
            id="storePhone"
            value={settings.storePhone}
            onChange={(e) => setSettings(prev => ({ ...prev, storePhone: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Moneda</label>
          <select
            id="currency"
            value={settings.currency}
            onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
          >
            <option value="MXN">Peso Mexicano (MXN)</option>
            <option value="USD">Dólar Americano (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Guardar Configuración
        </button>
      </form>
    </div>
  );

  return (
    <div className="admin-container">      <div className="admin-header">
        <h1>🛡️ Panel de Administración - HRStore</h1>
        <p>Gestiona tu tienda de reparaciones</p>        <div className="admin-actions">
          <button 
            className="view-store-btn"
            onClick={() => window.open('/products', '_blank')}
          >
            👁️ Ver Tienda
          </button>
          <button 
            className="view-home-btn"
            onClick={() => window.open('/', '_blank')}
          >
            🏠 Ir al Inicio
          </button>
          <button 
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('isAdminAuthenticated');
              window.location.href = '/login';
            }}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      <nav className="admin-nav">
        <button 
          className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Productos
        </button>
        <button 
          className={`nav-button ${activeTab === 'add-product' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-product')}
        >
          {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
        </button>
        <button 
          className={`nav-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Órdenes
        </button>
        <button 
          className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Configuración
        </button>
      </nav>

      <div className="admin-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'add-product' && renderAddProduct()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default Admin;
