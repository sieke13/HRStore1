# 🌐 Configuración de Variables de Entorno para Producción

## 🚀 Principales Plataformas de Hosting

### **Vercel** (Recomendado para frontend)
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las variables:
   - `VITE_MERCADOPAGO_PUBLIC_KEY` = tu-public-key-producción
   - `VITE_PAYPAL_CLIENT_ID` = tu-client-id-producción
   - `VITE_API_URL` = https://tu-api.vercel.app

### **Netlify**
1. Site Settings → Environment Variables
2. Agrega las mismas variables con prefijo VITE_

### **Railway** (Para backend Node.js)
1. Variables → Add Variable
2. Agrega:
   - `MERCADOPAGO_ACCESS_TOKEN` = tu-access-token-producción
   - `PAYPAL_CLIENT_ID` = tu-client-id
   - `PAYPAL_CLIENT_SECRET` = tu-client-secret
   - `NODE_ENV` = production

### **Heroku**
1. Settings → Config Vars
2. Agrega todas las variables necesarias

### **DigitalOcean App Platform**
1. Settings → Environment Variables
2. Encrypted by default

## 🔧 Scripts de Despliegue Automatizado

### Para automatizar el despliegue con variables:

```bash
# build-production.sh
#!/bin/bash
echo "🚀 Building for production..."

# Verificar que las variables estén configuradas
if [ -z "$VITE_MERCADOPAGO_PUBLIC_KEY" ]; then
    echo "❌ Error: VITE_MERCADOPAGO_PUBLIC_KEY no está configurado"
    exit 1
fi

if [ -z "$VITE_PAYPAL_CLIENT_ID" ]; then
    echo "❌ Error: VITE_PAYPAL_CLIENT_ID no está configurado"
    exit 1
fi

# Build del proyecto
npm run build

echo "✅ Build completado con variables de producción"
```

## 🛡️ Configuración Segura

### **Variables Públicas vs Privadas**

#### ✅ Seguras para el frontend (VITE_):
- `VITE_MERCADOPAGO_PUBLIC_KEY` (Public Key)
- `VITE_PAYPAL_CLIENT_ID` (Client ID público)
- `VITE_API_URL` (URL pública)

#### ❌ NUNCA en el frontend:
- `MERCADOPAGO_ACCESS_TOKEN` (Private key)
- `PAYPAL_CLIENT_SECRET` (Secret)
- Credenciales de base de datos
- API keys privadas

## 📋 Checklist de Despliegue

### **Antes de subir a producción:**

1. **✅ Obtener credenciales de producción**
   - MercadoPago: Cambiar de TEST- a credenciales reales
   - PayPal: Cambiar de sandbox a live

2. **✅ Configurar variables en la plataforma**
   - No usar archivos .env en producción
   - Configurar en el panel del hosting

3. **✅ Actualizar URLs**
   - API endpoints a URLs de producción
   - Callbacks de pagos a dominio real
   - CORS permitir dominio de producción

4. **✅ Habilitar HTTPS**
   - Obligatorio para pagos
   - Certificado SSL automático en la mayoría de hostings

5. **✅ Configurar webhooks**
   - URLs públicas para notificaciones
   - Endpoints seguros con validación

## 🔄 Flujo de Despliegue Recomendado

### **Opción 1: Frontend (Vercel) + Backend (Railway)**

```yaml
# Frontend en Vercel
Variables:
  VITE_MERCADOPAGO_PUBLIC_KEY: "APP_USR-xxxxxxxxx"
  VITE_PAYPAL_CLIENT_ID: "Aexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  VITE_API_URL: "https://hrstore-backend.up.railway.app"

# Backend en Railway
Variables:
  MERCADOPAGO_ACCESS_TOKEN: "APP_USR-xxxxxxxxx"
  PAYPAL_CLIENT_ID: "Aexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  PAYPAL_CLIENT_SECRET: "EGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  PAYPAL_MODE: "live"
  NODE_ENV: "production"
  PORT: "3001"
```

### **Opción 2: Todo en una plataforma (Vercel Full-Stack)**

```yaml
Variables:
  # Frontend
  VITE_MERCADOPAGO_PUBLIC_KEY: "APP_USR-xxxxxxxxx"
  VITE_PAYPAL_CLIENT_ID: "Aexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  
  # Backend (Serverless Functions)
  MERCADOPAGO_ACCESS_TOKEN: "APP_USR-xxxxxxxxx"
  PAYPAL_CLIENT_SECRET: "EGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## 🔐 Mejores Prácticas de Seguridad

### **1. Rotación de Credenciales**
- Cambiar keys periódicamente
- Revocar credenciales de desarrollo

### **2. Monitoreo**
- Logs de transacciones
- Alertas de errores
- Monitoreo de uso de API

### **3. Validación**
- Verificar signatures en webhooks
- Validar amounts en backend
- Rate limiting en endpoints

### **4. Backup de Configuración**
```bash
# Exportar variables (sin valores sensibles)
echo "VITE_MERCADOPAGO_PUBLIC_KEY=" > .env.template
echo "VITE_PAYPAL_CLIENT_ID=" >> .env.template
echo "VITE_API_URL=" >> .env.template
```

## 🚨 Troubleshooting Común

### **Error: "Invalid credentials"**
- Verificar que uses credenciales de producción (no TEST-)
- Confirmar que las variables estén configuradas en el hosting

### **Error: CORS**
- Agregar dominio de producción a CORS del backend
- Verificar que VITE_API_URL apunte al backend correcto

### **Error: Webhooks no funcionan**
- URLs deben ser públicas y con HTTPS
- Verificar que los endpoints respondan 200 OK

### **Error: "Environment variable not found"**
- Variables deben tener prefijo VITE_ para frontend
- Reiniciar después de agregar variables en hosting

## 📝 Comandos Útiles

```bash
# Verificar build local con variables de producción
VITE_MERCADOPAGO_PUBLIC_KEY=tu-key npm run build

# Verificar que las variables se incluyan en build
grep -r "VITE_" dist/

# Test de producción local
npm run serve
```

## 🌍 URLs de Configuración por Plataforma

- **Vercel**: https://vercel.com/dashboard → Project → Settings → Environment Variables
- **Netlify**: https://app.netlify.com → Site → Settings → Environment variables  
- **Railway**: https://railway.app → Project → Variables
- **Heroku**: https://dashboard.heroku.com → App → Settings → Config Vars
