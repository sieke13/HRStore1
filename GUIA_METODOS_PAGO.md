# 🚀 Guía Completa: Configuración de Métodos de Pago para HRStore

## 🎯 **Resumen Ejecutivo**

Tu tienda HRStore incluye dos métodos de pago principales:
- **💳 PayPal**: Para clientes internacionales y locales
- **🔥 MercadoPago**: Para el mercado mexicano y latinoamericano

**⏱️ Tiempo estimado de configuración**: 30-45 minutos total

---

## 📊 **Comparación: PayPal vs MercadoPago**

| Característica | 💳 PayPal | 🔥 MercadoPago |
|---|---|---|
| **🌍 Alcance** | Global (190+ países) | México y Latinoamérica |
| **💰 Comisiones** | 3.49% + $0.49 USD | 3.98% + IVA |
| **⚡ Liquidación** | 1-3 días hábiles | Inmediato |
| **💳 Métodos** | Tarjetas, PayPal wallet | Tarjetas, OXXO, Bancos |
| **📱 Experiencia** | Modal de PayPal | Checkout integrado |
| **🔧 Configuración** | Moderada | Fácil |

---

## 🗺️ **Roadmap de Configuración**

### **Fase 1: MercadoPago (Recomendado empezar aquí)**
⏱️ *15-20 minutos*
- ✅ Más fácil de configurar
- ✅ Mejor para mercado mexicano
- ✅ Mayor variedad de métodos de pago

**👉 [Seguir guía detallada de MercadoPago](./MERCADOPAGO_SETUP.md)**

### **Fase 2: PayPal (Opcional pero recomendado)**
⏱️ *20-25 minutos*
- ✅ Acceso a clientes internacionales
- ✅ Confianza global en la marca
- ✅ Compatible con usuarios de PayPal

**👉 [Seguir guía detallada de PayPal](./PAYPAL_SETUP.md)**

---

## 🚦 **¿Por dónde empezar?**

### **Si eres nuevo en pagos online:**
1. 🥇 **Empieza con MercadoPago** (más fácil)
2. 🥈 **Luego agrega PayPal** (más clientes)

### **Si ya tienes experiencia:**
1. 🔄 **Configura ambos simultáneamente**
2. 📊 **Analiza cuál te genera más ventas**

---

## 📋 **Checklist de Configuración**

### **Antes de empezar:**
- [ ] Tienes acceso a una computadora
- [ ] Tienes una conexión a internet estable
- [ ] Tienes un email válido
- [ ] Tienes un teléfono para verificaciones

### **MercadoPago:**
- [ ] Crear cuenta en MercadoPago
- [ ] Obtener Public Key de prueba
- [ ] Obtener Access Token de prueba
- [ ] Crear usuarios de prueba
- [ ] Probar con tarjetas de prueba
- [ ] Configurar variables de entorno

### **PayPal:**
- [ ] Crear cuenta de desarrollador PayPal
- [ ] Crear aplicación PayPal
- [ ] Obtener Client ID de sandbox
- [ ] Obtener Client Secret de sandbox
- [ ] Probar con cuentas sandbox
- [ ] Configurar variables de entorno

---

## 🔧 **Archivos que necesitarás crear**

En la raíz de tu proyecto, crea estos archivos:

### **`.env` (Backend - ¡NUNCA subir a Git!)**
```bash
# PayPal
PAYPAL_CLIENT_ID=tu_client_id_paypal
PAYPAL_CLIENT_SECRET=tu_client_secret_paypal
PAYPAL_MODE=sandbox

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_mercadopago

# General
PORT=3001
NODE_ENV=development
```

### **`.env.local` (Frontend - ¡NUNCA subir a Git!)**
```bash
# PayPal (público, solo Client ID)
VITE_PAYPAL_CLIENT_ID=tu_client_id_paypal

# MercadoPago (público, solo Public Key)
VITE_MERCADOPAGO_PUBLIC_KEY=tu_public_key_mercadopago

# URLs
VITE_API_URL=http://localhost:3001
VITE_BASE_URL=http://localhost:5173
```

---

## 🧪 **Flujo de Pruebas**

### **1. Preparar el entorno:**
```bash
# Instalar dependencias
npm install

# Ejecutar frontend y backend
npm run dev:full
```

### **2. Abrir la tienda:**
```
Frontend: http://localhost:5173
Backend API: http://localhost:3001
```

### **3. Probar MercadoPago:**
1. Agregar productos al carrito
2. Ir a checkout
3. Seleccionar "MercadoPago"
4. Usar tarjeta: `4013 5406 8274 6260`
5. CVV: `123`, Fecha: `11/25`
6. Verificar redirección exitosa

### **4. Probar PayPal:**
1. Agregar productos al carrito
2. Ir a checkout
3. Seleccionar "PayPal"
4. Usar cuenta sandbox o tarjeta: `4012888888881881`
5. CVV: `123`, Fecha: `12/25`
6. Verificar redirección exitosa

---

## 🆘 **Problemas Comunes y Soluciones**

### **❌ "Invalid credentials"**
```bash
# Verifica que las variables estén bien configuradas
echo $PAYPAL_CLIENT_ID
echo $MERCADOPAGO_ACCESS_TOKEN
```

### **❌ "CORS Error"**
- Verifica que el backend esté en puerto 3001
- Verifica que el frontend esté en puerto 5173

### **❌ "Preference creation failed"**
- Verifica que el backend esté ejecutándose
- Revisa los logs del servidor: `npm run server`

### **❌ "Payment failed"**
- Usa las tarjetas de prueba exactas proporcionadas
- Verifica que estés en modo sandbox/test

---

## 🚀 **Ir a Producción**

### **Cuando todo funcione en pruebas:**

1. **MercadoPago**: Cambia a credenciales de producción
2. **PayPal**: Cambia de sandbox a live
3. **Variables**: Actualiza todos los archivos .env
4. **HTTPS**: Asegúrate de tener SSL habilitado
5. **Webhooks**: Configura URLs públicas para notificaciones

---

## 📞 **Soporte y Recursos**

### **Documentación Oficial:**
- 📚 [MercadoPago Docs](https://www.mercadopago.com.mx/developers/docs)
- 📚 [PayPal Developer Docs](https://developer.paypal.com/docs/)

### **Soporte Técnico:**
- 🆘 [MercadoPago Support](https://www.mercadopago.com.mx/ayuda)
- 🆘 [PayPal Developer Support](https://developer.paypal.com/support/)

### **Comunidades:**
- 💬 [Stack Overflow - MercadoPago](https://stackoverflow.com/questions/tagged/mercadopago)
- 💬 [PayPal Developer Community](https://www.paypal-community.com/t5/Developer-Community/ct-p/developer-community)

---

## ✅ **Siguiente Paso**

**👉 Empieza con**: [Configuración de MercadoPago](./MERCADOPAGO_SETUP.md)

Una vez que MercadoPago funcione, continúa con: [Configuración de PayPal](./PAYPAL_SETUP.md)

---

*💡 **Recuerda**: Siempre prueba en el ambiente de testing antes de ir a producción. ¡Nunca compartas tus credenciales secretas!*
