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
    loadData();
  }, []);

  const loadData = () => {
    const savedProducts = localStorage.getItem('hrstore_products');
    const savedOrders = localStorage.getItem('hrstore_orders');
    const savedSettings = localStorage.getItem('hrstore_settings');

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Productos de ejemplo
      const exampleProducts: Product[] = [
        {
          id: '1',
          name: 'Reparación Pantalla iPhone',
          price: 299.99,
          category: 'reparaciones',
          description: 'Reparación completa de pantalla para iPhone',
          image: '/src/assets/images/iphone-repair.svg',
          stock: 10,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Reparación Pantalla Android',
          price: 199.99,
          category: 'reparaciones',
          description: 'Reparación de pantalla para dispositivos Android',
          image: '/src/assets/images/android-repair.svg',
          stock: 15,
          createdAt: new Date().toISOString()
        }
      ];
      setProducts(exampleProducts);
      localStorage.setItem('hrstore_products', JSON.stringify(exampleProducts));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('hrstore_products', JSON.stringify(newProducts));
  };


  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('hrstore_settings', JSON.stringify(newSettings));
  };  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Editar producto existente
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...productForm }
          : p
      );
      saveProducts(updatedProducts);
      setEditingProduct(null);
      alert('Producto actualizado exitosamente!');
    } else {
      // Agregar nuevo producto
      const newProduct: Product = {
        ...productForm,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      // Agregar el nuevo producto
      const updatedProducts = [...products, newProduct];
      saveProducts(updatedProducts);
      
      // Disparar evento personalizado para notificar a Home que se agregó un producto nuevo
      window.dispatchEvent(new CustomEvent('productAdded', { 
        detail: { product: newProduct, allProducts: updatedProducts } 
      }));
      
      alert(`Producto "${newProduct.name}" agregado exitosamente! Ahora aparecerá destacado en Home con badge "Nuevo" y también en /products`);
    }

    // Limpiar formulario
    setProductForm({
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      stock: 0
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.stock
    });
    setActiveTab('add-product');
  };
  const handleDeleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (window.confirm(`¿Estás seguro de eliminar "${product?.name}"? Este producto también se eliminará de la página de productos.`)) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
      alert('Producto eliminado exitosamente!');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductForm(prev => ({
          ...prev,
          image: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
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
            value={productForm.name}
            onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={productForm.price}
            onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={productForm.category}
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
            value={productForm.description}
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
        saveSettings(settings);
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
