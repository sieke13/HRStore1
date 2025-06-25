# 💳 Guía Completa: Configuración de PayPal para HRStore

## 🎯 **¿Qué vamos a hacer?**
Vamos a configurar PayPal como método de pago en tu tienda. Necesitarás obtener tus credenciales de PayPal para que los clientes puedan pagar con tarjetas de crédito, débito y sus cuentas PayPal.

---

## 📝 **PASO 1: Crear cuenta de desarrollador en PayPal**

### 1.1 Acceder al portal de desarrolladores
1. **Ve a**: [https://developer.paypal.com/](https://developer.paypal.com/)
2. **Haz clic en**: "Log into Dashboard" (en la esquina superior derecha)
3. **Opciones**:
   - Si ya tienes cuenta PayPal personal → Usa esa cuenta
   - Si no tienes cuenta → Haz clic en "Sign Up" y crea una nueva

> 💡 **Tip**: Puedes usar tu cuenta PayPal personal existente para desarrollo

### 1.2 Verificar tu cuenta
- PayPal puede pedirte verificar tu número de teléfono
- Sigue las instrucciones en pantalla para completar la verificación

---

## 📱 **PASO 2: Crear tu aplicación PayPal**

### 2.1 En el Dashboard de desarrolladores:
1. **Haz clic en**: "Create App" (botón azul)
2. **Completa el formulario**:
   ```
   App Name: HRStore
   Merchant: [Selecciona tu cuenta o "Create new account"]
   Platform: Web
   Intent: Payments (Accept payments)
   ```
3. **Haz clic en**: "Create App"

### 2.2 ¿Qué es cada campo?
- **App Name**: Nombre interno para identificar tu tienda
- **Merchant**: La cuenta que recibirá los pagos
- **Platform**: Tipo de aplicación (web, móvil, etc.)
- **Intent**: Para qué usarás PayPal (en nuestro caso, recibir pagos)

---

## 🔑 **PASO 3: Obtener tus credenciales**

Una vez creada tu aplicación, verás una pantalla con tus credenciales:

### 3.1 Credenciales de Sandbox (para pruebas)
```
🔍 BUSCA EN LA PANTALLA:
┌─────────────────────────────────────┐
│ Sandbox                             │
│ ○ Client ID: sb-xxxxx...            │
│ ○ Secret: EHxxxxxxxx...             │
└─────────────────────────────────────┘
```

### 3.2 ¿Qué significa Sandbox?
- **Sandbox** = Ambiente de pruebas
- **Live** = Ambiente real (con dinero real)
- Siempre empezamos con Sandbox para probar que todo funcione

### 3.3 Copiar tus credenciales
1. **Client ID**: Empieza con "AeA..." o "sb-..."
2. **Secret**: Empieza con "E..." (no lo compartas nunca)

---

## ⚙️ **PASO 4: Configurar credenciales en tu proyecto**

### 4.1 Crear archivo .env (en la raíz del proyecto)
```bash
# PayPal Configuration
PAYPAL_CLIENT_ID=TU_CLIENT_ID_AQUI
PAYPAL_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI
PAYPAL_MODE=sandbox
```

### 4.2 Crear archivo .env.local (en la raíz del proyecto)
```bash
# PayPal Client ID (para el frontend)
VITE_PAYPAL_CLIENT_ID=TU_CLIENT_ID_AQUI
```

### 4.3 Ejemplo real:
```bash
# .env
PAYPAL_CLIENT_ID=AeA1QIZXhgJqg8VV4tXkkKhHPEXNWAJVKnI4VQ1bS8kc8N9QJVgSN_8qBZyV4nFJdqh3RQS7z7GJmDt8_vP
PAYPAL_CLIENT_SECRET=EG6n3rI-KGKqg8VQ4tYkkKhHPEXNWAJVKnI4VQ1bS8kc8N9QJVgSN_8qBZyV4nFJdqh3RQS7z7GJmDt8_vP
PAYPAL_MODE=sandbox
```

---

## 🧪 **PASO 5: Probar que funciona**

### 5.1 Cuentas de prueba automáticas
PayPal crea automáticamente cuentas para hacer pruebas:

**👤 Comprador** (para simular clientes):
- Email: `sb-xxxxxx@personal.example.com`
- Contraseña: `xxxxxxxx`
- Saldo: $10,000 USD

**🏢 Vendedor** (para recibir pagos):
- Email: `sb-xxxxxx@business.example.com`
- Contraseña: `xxxxxxxx`

> 📍 **Dónde encontrar estas cuentas**: Dashboard → Sandbox → Accounts

### 5.2 Tarjetas de prueba (sin cuenta PayPal)
```
✅ VISA - Pago aprobado:
Número: 4012888888881881
CVV: 123
Fecha: 12/25

✅ MASTERCARD - Pago aprobado:
Número: 5555555555554444
CVV: 123
Fecha: 12/25

❌ VISA - Pago rechazado:
Número: 4000000000000002
CVV: 123
Fecha: 12/25
```
- **Email**: sb-merchant@business.example.com
- **Contraseña**: (ver en Dashboard → Sandbox → Accounts)

### 6. Tarjetas de prueba para Sandbox

#### ✅ Visa - Pago aprobado
- **Número**: 4012888888881881
- **CVV**: 123
- **Fecha**: Cualquier fecha futura

#### ✅ Mastercard - Pago aprobado
- **Número**: 5555555555554444
- **CVV**: 123
- **Fecha**: Cualquier fecha futura

#### ❌ Visa - Pago rechazado
- **Número**: 4000000000000002
- **CVV**: 123
- **Fecha**: Cualquier fecha futura

### 7. Configurar webhooks (opcional)
Para recibir notificaciones de PayPal:
1. En tu aplicación PayPal, ve a "Webhooks"
2. Agrega la URL: `https://tu-dominio.com/api/webhooks/paypal`
3. Selecciona eventos:
   - PAYMENT.CAPTURE.COMPLETED
   - PAYMENT.CAPTURE.DENIED
   - CHECKOUT.ORDER.APPROVED

## 🛠️ Testing en HRStore

### Flujo de prueba completo:
1. Ejecuta tu aplicación: `npm run dev:full`
2. Ve a http://localhost:5173
3. Agrega productos al carrito
4. Selecciona "PayPal" como método de pago
5. Usa las credenciales de sandbox para pagar
6. Verifica que funcionen las redirecciones

### URLs de prueba:
- **Sandbox PayPal**: https://sandbox.paypal.com
- **Dashboard Developer**: https://developer.paypal.com/developer/applications
- **Documentación**: https://developer.paypal.com/docs/

## 🚀 Configuración para Producción

### 1. Obtener credenciales Live
1. En el Dashboard de PayPal, cambia a "Live"
2. Crea una nueva aplicación para producción
3. Obtén las credenciales Live (diferentes a Sandbox)

### 2. Variables de entorno para producción
```bash
# Cambiar a credenciales reales
PAYPAL_CLIENT_ID=tu-client-id-real
PAYPAL_CLIENT_SECRET=tu-client-secret-real
PAYPAL_MODE=live

# Frontend
VITE_PAYPAL_CLIENT_ID=tu-client-id-real
```

### 3. Consideraciones importantes
- **HTTPS obligatorio** para pagos en producción
- Configura webhooks con URL pública
- Verifica que tu dominio esté autorizado
- Revisa límites de transacciones

## 🔧 Troubleshooting

### Error: "Invalid client_id"
- Verifica que estés usando el Client ID correcto
- Asegúrate de que coincida el modo (sandbox/live)

### Error: "Order creation failed"
- Revisa que el backend esté ejecutándose
- Verifica las credenciales en variables de entorno

### Error: "CORS blocked"
- Verifica que el proxy de Vite esté configurado
- Asegúrate de que las URLs coincidan

### PayPal no carga
- Verifica que VITE_PAYPAL_CLIENT_ID esté configurado
- Revisa la consola del navegador para errores

## 💡 Diferencias PayPal vs MercadoPago

| Característica | PayPal | MercadoPago |
|---|---|---|
| **Mercados** | Global | Latinoamérica |
| **Monedas** | 25+ monedas | Peso MX, USD, etc. |
| **Comisiones** | 3.49% + $0.49 | 3.98% + IVA |
| **Tiempo liquidación** | 1-3 días | Inmediato |
| **Medios de pago** | Tarjetas, PayPal wallet | Tarjetas, OXXO, transferencias |

## 📞 Soporte

- **PayPal Developer**: https://developer.paypal.com/support/
- **Documentación API**: https://developer.paypal.com/docs/api/
- **Comunidad**: https://www.paypal-community.com/t5/Developer-Community/ct-p/developer-community
