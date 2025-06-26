import React from 'react';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import PaymentPending from './pages/PaymentPending';
import Admin from './pages/Admin';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Login from './pages/Login';
import Contact from './pages/Contact';
import './styles/index.css';
import WhatsAppChatbot from './components/WhatsAppChatbot';

const App: React.FC = () => {
  const pathname = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  const renderPage = () => {
    // Check for product detail routes
    if (pathname.startsWith('/product/')) {
      const productId = pathname.split('/product/')[1];
      return <ProductDetail productId={productId} />;
    }

    switch (pathname) {
      case '/payment-success':
        return <PaymentSuccess />;
      case '/payment-failure':
        return <PaymentFailure />;
      case '/payment-pending':
        return <PaymentPending />;
      case '/login':
        return <Login />;
      case '/admin':
        // Check if user is authenticated
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
        if (!isAuthenticated) {
          // Redirect to login
          window.location.href = '/login';
          return <Login />;
        }
        return <Admin />;
      case '/products':
        // Check if there's a specific product parameter
        const productId = searchParams.get('product');
        if (productId) {
          return <ProductsPage focusProduct={productId} />;
        }
        return <ProductsPage />;
      case '/services':
        return <Services />;
      case '/contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      <WhatsAppChatbot />
    </div>
  );
};

export default App;