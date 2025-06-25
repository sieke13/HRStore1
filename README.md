# 🛠️ HRStore - Tienda de Herramientas para Dispositivos Móviles

Una tienda web moderna construida con React, Vite, TypeScript y integración completa con MercadoPago.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz elegante con gradientes azul/gris
- 📱 **Responsive**: Adaptado para móviles y escritorio
- 🛒 **Carrito de Compras**: Sistema completo de carrito con animaciones
- 💳 **Pagos Seguros**: Integración completa con MercadoPago y PayPal
- 🔄 **Carrusel de Servicios**: Swiper interactivo de servicios de reparación
- 🌐 **SPA**: Single Page Application con ruteo manual
- ⚡ **Vite**: Build tool rápido para desarrollo
- **Checkout Process**: A streamlined checkout page for entering user information and payment details.

## Getting Started

To get started with HRStore, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/HRStore.git
   ```

2. **Navigate to the project directory**:
   ```
   cd HRStore
   ```

3. **Install dependencies**:
   ```
   npm install
   ```

4. **Run the development server**:
   ```
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:3000` to view the application.

## Project Structure

```
HRStore
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── components
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   └── Cart.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   └── Checkout.tsx
│   ├── types
│   │   └── index.ts
│   └── styles
│       └── index.css
├── public
│   └── vite.svg
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 2. Configurar PayPal

Crea credenciales en [PayPal Developer](https://developer.paypal.com/):

```bash
# Backend - Credenciales privadas (.env)
PAYPAL_CLIENT_ID=tu-client-id-aqui
PAYPAL_CLIENT_SECRET=tu-client-secret-aqui
PAYPAL_MODE=sandbox

# Frontend - Client ID público (.env.local)
VITE_PAYPAL_CLIENT_ID=tu-client-id-aqui
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.