# ⚡ INICIO RÁPIDO: Configurar Pagos en 15 Minutos

## 🎯 **Lo que necesitas hacer AHORA**

Tu tienda está lista, solo faltan las credenciales de pago. Sigue esta guía paso a paso:

---

## 🔥 **OPCIÓN 1: Solo MercadoPago (15 min) - RECOMENDADO**

### **Perfecto si:**
- 🇲🇽 Tus clientes son principalmente de México
- ⚡ Quieres empezar rápido
- 💳 Necesitas pagos con OXXO, transferencias, etc.

### **Pasos:**
1. **Ve a**: [mercadopago.com.mx/developers](https://www.mercadopago.com.mx/developers)
2. **Crea cuenta** o **inicia sesión**
3. **Ve a**: "Credenciales" → "Credenciales de prueba"
4. **Copia**:
   - Public Key (empieza con TEST-)
   - Access Token (empieza con TEST-)

### **Pega aquí tus credenciales:**
```bash
# Crea archivo .env en la raíz del proyecto
MERCADOPAGO_ACCESS_TOKEN=PEGA_TU_ACCESS_TOKEN_AQUI

# Crea archivo .env.local en la raíz del proyecto  
VITE_MERCADOPAGO_PUBLIC_KEY=PEGA_TU_PUBLIC_KEY_AQUI
VITE_API_URL=http://localhost:3001
VITE_BASE_URL=http://localhost:5173
```

### **Probar:**
```bash
npm run dev:full
# Ve a: http://localhost:5173
# Agrega productos y prueba pagar con: 4013 5406 8274 6260
```

**👉 [Guía detallada MercadoPago](./MERCADOPAGO_SETUP.md)**

---

## 🌍 **OPCIÓN 2: Solo PayPal (20 min)**

### **Perfecto si:**
- 🌎 Quieres clientes internacionales
- 💳 Tus clientes prefieren PayPal
- 🏪 Tienes cuenta PayPal existente

### **Pasos:**
1. **Ve a**: [developer.paypal.com](https://developer.paypal.com)
2. **Inicia sesión** con tu cuenta PayPal
3. **Crea app**: "Create App" → Nombre: "HRStore"
4. **Copia** credenciales de Sandbox:
   - Client ID (empieza con AeA...)
   - Secret (empieza con E...)

### **Pega aquí tus credenciales:**
```bash
# Crea archivo .env en la raíz del proyecto
PAYPAL_CLIENT_ID=PEGA_TU_CLIENT_ID_AQUI
PAYPAL_CLIENT_SECRET=PEGA_TU_CLIENT_SECRET_AQUI
PAYPAL_MODE=sandbox

# Crea archivo .env.local en la raíz del proyecto
VITE_PAYPAL_CLIENT_ID=PEGA_TU_CLIENT_ID_AQUI
```

### **Probar:**
```bash
npm run dev:full
# Ve a: http://localhost:5173
# Agrega productos y prueba pagar con: 4012888888881881
```

**👉 [Guía detallada PayPal](./PAYPAL_SETUP.md)**

---

## 🚀 **OPCIÓN 3: Ambos métodos (30 min) - RECOMENDADO PARA MÁXIMAS VENTAS**

### **Ventajas:**
- 🎯 Cubres todos los tipos de clientes
- 💰 Maximizas conversiones
- 🌍 Vendes local e internacional

### **Pasos:**
1. **Haz OPCIÓN 1** (MercadoPago)
2. **Haz OPCIÓN 2** (PayPal)
3. **Tu archivo .env final:**

```bash
# .env (Backend)
MERCADOPAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN_MERCADOPAGO
PAYPAL_CLIENT_ID=TU_CLIENT_ID_PAYPAL
PAYPAL_CLIENT_SECRET=TU_CLIENT_SECRET_PAYPAL
PAYPAL_MODE=sandbox
PORT=3001
NODE_ENV=development
```

```bash
# .env.local (Frontend)
VITE_MERCADOPAGO_PUBLIC_KEY=TU_PUBLIC_KEY_MERCADOPAGO
VITE_PAYPAL_CLIENT_ID=TU_CLIENT_ID_PAYPAL
VITE_API_URL=http://localhost:3001
VITE_BASE_URL=http://localhost:5173
```

---

## 🧪 **Tarjetas de Prueba Rápidas**

### **MercadoPago:**
```
✅ Tarjeta aprobada: 4013 5406 8274 6260
CVV: 123 | Fecha: 11/25

❌ Tarjeta rechazada: 4013 5406 8274 6269
CVV: 123 | Fecha: 11/25
```

### **PayPal:**
```
✅ Visa aprobada: 4012888888881881
CVV: 123 | Fecha: 12/25

✅ Mastercard aprobada: 5555555555554444
CVV: 123 | Fecha: 12/25
```

---

## 🆘 **¿Algo no funciona?**

### **Error común: "Variables no definidas"**
```bash
# Verifica que los archivos existan:
ls -la .env
ls -la .env.local

# Verifica el contenido:
cat .env
cat .env.local
```

### **Error común: "CORS / Connection refused"**
```bash
# Asegúrate de ejecutar AMBOS servidores:
npm run dev:full

# O por separado:
npm run dev    # Frontend en puerto 5173
npm run server # Backend en puerto 3001
```

### **Error común: "Invalid credentials"**
- ✅ Verifica que uses credenciales de **PRUEBA** (empiezan con TEST-)
- ✅ Verifica que no haya espacios extra al copiar/pegar
- ✅ Verifica que el archivo .env esté en la **raíz** del proyecto

---

## ✅ **Checklist Final**

- [ ] ✅ Archivo `.env` creado con credenciales
- [ ] ✅ Archivo `.env.local` creado con credenciales públicas  
- [ ] ✅ Ejecutado `npm run dev:full`
- [ ] ✅ Abierto `http://localhost:5173`
- [ ] ✅ Agregado productos al carrito
- [ ] ✅ Probado checkout con tarjetas de prueba
- [ ] ✅ Visto páginas de éxito/error/pendiente

---

## 🎉 **¡Listo! Tu tienda acepta pagos**

Cuando todo funcione en modo de prueba:

1. **Para ir a producción**: Cambia las credenciales TEST por las reales
2. **Para deploy**: Sigue la [Guía de Producción](./PRODUCTION_DEPLOYMENT.md)

---

**🚀 ¿Necesitas más detalles?**
- 📖 [Guía completa de métodos de pago](./GUIA_METODOS_PAGO.md)
- 🔧 [Configuración avanzada MercadoPago](./MERCADOPAGO_SETUP.md)  
- 💳 [Configuración avanzada PayPal](./PAYPAL_SETUP.md)
