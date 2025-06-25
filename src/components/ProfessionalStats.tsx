import React from 'react';

const ProfessionalStats: React.FC = () => {
    return (
        <section className="professional-stats">
            <div className="container">
                <div className="stats-content">
                    <h2>Servicios de Reparación Profesional</h2>
                    <p>Especialistas en reparación de smartphones con más de 10 años de experiencia</p>
                    
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">5000+</div>
                            <div className="stat-label">
                                <strong>REPARACIONES</strong>
                                <span>REALIZADAS</span>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-number">98%</div>
                            <div className="stat-label">
                                <strong>CLIENTES</strong>
                                <span>SATISFECHOS</span>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-number">24h</div>
                            <div className="stat-label">
                                <strong>GARANTÍA</strong>
                                <span>EXPRESS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalStats;
