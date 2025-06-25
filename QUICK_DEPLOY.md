# 🚀 Guía Rápida de Despliegue - HRStore

## ⚡ Despliegue en 5 Minutos

### **1. Preparar Credenciales de Producción** (2 min)

#### MercadoPago:
1. Ve a https://www.mercadopago.com.mx/developers/panel
2. Cambia a "Credenciales de producción"
3. Copia tu Public Key y Access Token (empiezan con `APP_USR-`)

#### PayPal:
1. Ve a https://developer.paypal.com/developer/applications  
2. Crea app en modo "Live"
3. Copia Client ID y Client Secret

### **2. Elegir Plataforma de Hosting** (1 min)

#### 🥇 **Opción Recomendada: Vercel + Railway**
- **Frontend**: Vercel (gratis)
- **Backend**: Railway (gratis hasta $5/mes)
- **Ventajas**: Configuración automática, SSL gratis, domains fáciles

#### 🥈 **Opción Alternativa: Netlify + Heroku**
- **Frontend**: Netlify (gratis)  
- **Backend**: Heroku (gratis limitado)

### **3. Desplegar Frontend en Vercel** (1 min)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variables en dashboard.vercel.com
# Variables necesarias:
VITE_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxxxx
VITE_PAYPAL_CLIENT_ID=Aexxxxxxxxxxxxxxx
VITE_API_URL=https://tu-backend.railway.app
```

### **4. Desplegar Backend en Railway** (1 min)

```bash
# 1. Subir código a GitHub
git add .
git commit -m "Production ready"
git push

# 2. Conectar repositorio en railway.app
# 3. Configurar variables:
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxx
PAYPAL_CLIENT_ID=Aexxxxxxxxxxxxxxx
PAYPAL_CLIENT_SECRET=EGxxxxxxxxxxxxxxx
PAYPAL_MODE=live
NODE_ENV=production
```

## 📋 **Checklist Rápido**

```bash
# Verificar configuración antes de desplegar
npm run verify:prod

# Build de producción con verificación
npm run build:prod

# Deploy automático a Vercel
npm run deploy:vercel
```

### ✅ **Variables Críticas Frontend:**
- [ ] `VITE_MERCADOPAGO_PUBLIC_KEY` (APP_USR-...)
- [ ] `VITE_PAYPAL_CLIENT_ID` (Ae...)
- [ ] `VITE_API_URL` (https://...)

### ✅ **Variables Críticas Backend:**
- [ ] `MERCADOPAGO_ACCESS_TOKEN` (APP_USR-...)
- [ ] `PAYPAL_CLIENT_SECRET` (EG...)
- [ ] `PAYPAL_MODE=live`
- [ ] `NODE_ENV=production`

## 🔧 **Troubleshooting Rápido**

### **Error: "Invalid credentials"**
```bash
# Verificar que no uses credenciales TEST-
echo $VITE_MERCADOPAGO_PUBLIC_KEY | grep APP_USR
```

### **Error: CORS**
```bash
# Actualizar CORS en server.js
const allowedOrigins = ['https://tu-frontend.vercel.app'];
```

### **Error: Webhooks**
```bash
# Configurar webhook URLs en:
# MercadoPago: https://tu-backend.railway.app/api/webhooks/mercadopago
# PayPal: https://tu-backend.railway.app/api/webhooks/paypal
```

## 🌍 **URLs después del despliegue**

- **Frontend**: https://hrstore.vercel.app
- **Backend**: https://hrstore-backend.railway.app
- **Admin MercadoPago**: https://mercadopago.com.mx/developers/panel
- **Admin PayPal**: https://developer.paypal.com/developer/applications

## 🔄 **Actualizaciones futuras**

```bash
# 1. Hacer cambios en código
# 2. Commit y push
git add .
git commit -m "Update feature"
git push

# 3. Deploy automático (si configuraste auto-deploy)
# O manual:
vercel --prod  # Frontend
# Railway se actualiza automáticamente con git push
```

## 📞 **Soporte**

- **Errores de MercadoPago**: https://www.mercadopago.com.mx/developers/panel/support
- **Errores de PayPal**: https://developer.paypal.com/support/
- **Errores de Vercel**: https://vercel.com/support
- **Errores de Railway**: https://railway.app/help

---

### 🎯 **¡Listo en 5 minutos!**

Una vez configurado, tu tienda estará disponible 24/7 con:
- ✅ Pagos reales funcionando
- ✅ SSL/HTTPS automático  
- ✅ Escalabilidad automática
- ✅ Backups automáticos
- ✅ Monitoring incluido
