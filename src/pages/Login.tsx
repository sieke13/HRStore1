import React, { useState } from 'react';
import '../styles/login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simular un pequeño delay para la experiencia de usuario
        setTimeout(() => {
            if (username === 'pollo' && password === 'pollo123') {
                localStorage.setItem('isAdminAuthenticated', 'true');
                window.location.href = '/admin';
            } else {
                setError('Usuario o contraseña incorrectos');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-card">
                    <div className="login-header">
                        <h1>🔐 Acceso Admin</h1>
                        <p>HRStore - Panel de Administración</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <label htmlFor="username">Usuario</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingresa tu usuario"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa tu contraseña"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        {error && (
                            <div className="error-message">
                                ⚠️ {error}
                            </div>
                        )}
                        
                        <button 
                            type="submit" 
                            className={`login-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Verificando...
                                </>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>
                      <div className="login-footer">
                        <p>Sistema seguro de administración</p>
                        <button
                            onClick={() => window.location.href = '/'} 
                            className="back-btn"
                        >
                            ← Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
