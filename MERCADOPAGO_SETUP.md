# � Guía Completa: Configuración de MercadoPago para HRStore

## 🎯 **¿Qué vamos a hacer?**
Vamos a configurar MercadoPago como método de pago en tu tienda. Es el método preferido en México y Latinoamérica, permite pagos con tarjetas, OXXO, transferencias y más.

---

## 📝 **PASO 1: Crear cuenta en MercadoPago**

### 1.1 Acceder al portal de desarrolladores
1. **Ve a**: [https://www.mercadopago.com.mx/developers](https://www.mercadopago.com.mx/developers)
2. **Haz clic en**: "Ingresar" (esquina superior derecha)
3. **Opciones**:
   - Si ya tienes cuenta MercadoPago → Usa esa cuenta
   - Si no tienes cuenta → Haz clic en "Crear cuenta"

> 💡 **Tip**: Puedes usar tu cuenta MercadoPago personal existente

### 1.2 Completar registro
- Ingresa tu información personal o de negocio
- Verifica tu email y número de teléfono
- Acepta los términos y condiciones

---

## 📱 **PASO 2: Acceder al Panel de Desarrolladores**

### 2.1 Navegar a las herramientas de desarrollo:
1. **Una vez logueado**, busca "Desarrolladores" en el menú
2. **O ve directamente a**: [https://www.mercadopago.com.mx/developers/panel](https://www.mercadopago.com.mx/developers/panel)
3. **Haz clic en**: "Tus integraciones" o "Panel"

### 2.2 ¿Qué verás?
- Dashboard con estadísticas
- Menú lateral con opciones de configuración
- Sección de credenciales

---

## 🔑 **PASO 3: Obtener tus credenciales**

### 3.1 Ir a la sección de credenciales:
1. **En el menú lateral**, haz clic en "Credenciales"
2. **Verás dos tipos**:
   - ✅ **Credenciales de prueba** (para testing)
   - 🔴 **Credenciales de producción** (para ventas reales)

### 3.2 Empezar con credenciales de prueba:
```
🔍 BUSCA EN LA PANTALLA:
┌─────────────────────────────────────┐
│ Credenciales de prueba              │
│ ○ Public Key: TEST-xxxxxxxx-xxx...  │
│ ○ Access Token: TEST-xxxxxxxx...    │
└─────────────────────────────────────┘
```

### 3.3 ¿Qué es cada credencial?
- **Public Key**: Se usa en el frontend (es seguro mostrarla)
- **Access Token**: Se usa en el backend (¡NUNCA la compartas!)

### 3.4 Copiar credenciales:
- **Public Key**: Empieza con "TEST-" (para pruebas)
- **Access Token**: También empieza con "TEST-" (para pruebas)

---

## ⚙️ **PASO 4: Configurar credenciales en tu proyecto**

### 4.1 Crear archivo .env (en la raíz del proyecto)
```bash
# MercadoPago Configuration
MERCADOPAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN_AQUI
PORT=3001
NODE_ENV=development
```

### 4.2 Crear archivo .env.local (en la raíz del proyecto)
```bash
# MercadoPago Public Key (para el frontend)
VITE_MERCADOPAGO_PUBLIC_KEY=TU_PUBLIC_KEY_AQUI
VITE_API_URL=http://localhost:3001
VITE_BASE_URL=http://localhost:5173
```

### 4.3 Ejemplo real:
```bash
# .env
MERCADOPAGO_ACCESS_TOKEN=TEST-12345678901234567890-123456-abcdef1234567890abcdef1234567890-123456789

# .env.local
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-abcdef12-3456-7890-abcd-ef1234567890
```

---

## 👥 **PASO 5: Crear usuarios de prueba**

### 5.1 ¿Por qué necesitas usuarios de prueba?
- Para simular compradores reales
- Para probar el flujo completo de pago
- Para verificar que todo funciona antes de ir a producción

### 5.2 Crear usuarios de prueba:
1. **En el Panel**, ve a "Usuarios de prueba"
2. **Haz clic en**: "Crear usuario de prueba"
3. **Configura**:
   ```
   País: México
   Dinero disponible: $10,000
   ```
4. **Crea dos usuarios**:
   - 👤 **Comprador**: Para simular clientes
   - 🏪 **Vendedor**: Para recibir pagos

### 5.3 Datos que obtendrás:
```
👤 COMPRADOR:
Email: test_user_123456789@testuser.com
Contraseña: qatest123
Saldo: $10,000 MXN

🏪 VENDEDOR:
Email: test_user_987654321@testuser.com
Contraseña: qatest123
```

---

## 🧪 **PASO 6: Probar con tarjetas de prueba**

### 6.1 Tarjetas para diferentes escenarios:

```
✅ VISA - Pago aprobado:
Número: 4013 5406 8274 6260
CVV: 123
Fecha: 11/25
Titular: APRO

✅ MASTERCARD - Pago aprobado:
Número: 5031 7557 3453 0604
CVV: 123
Fecha: 11/25
Titular: APRO

❌ VISA - Pago rechazado:
Número: 4013 5406 8274 6269
CVV: 123
Fecha: 11/25
Titular: OTHE

⏳ VISA - Pago pendiente:
Número: 4009 1748 5283 6260
CVV: 123
Fecha: 11/25
Titular: CONT
```

### 6.2 ¿Qué significa cada resultado?
- **APRO** = Aprobado (pago exitoso)
- **OTHE** = Rechazado (fondos insuficientes, etc.)
- **CONT** = Pendiente (esperando confirmación)
- **Número**: 4013 5406 8274 6269
- **CVV**: 123
- **Fecha**: 11/25

#### ⏳ Pago pendiente
- **Número**: 4009 1748 5283 6260
- **CVV**: 123
- **Fecha**: 11/25

### 6. Configurar webhooks (opcional)
Para recibir notificaciones de estado de pagos:
1. En el Panel de MercadoPago, ve a "Webhooks"
2. Agrega la URL: `https://tu-dominio.com/api/webhooks/mercadopago`
3. Selecciona eventos: "Payments"

## 🛠️ Comandos para desarrollo

### Ejecutar frontend y backend simultáneamente:
```bash
npm run dev:full
```

### Solo frontend (en puerto 5173):
```bash
npm run dev
```

### Solo backend (en puerto 3001):
```bash
npm run server
```

### Build para producción:
```bash
npm run build
npm start
```

## 🔧 Troubleshooting

### Error: "Invalid public key"
- Verifica que hayas configurado correctamente la variable `VITE_MERCADOPAGO_PUBLIC_KEY`
- Asegúrate de usar la Public Key de prueba (empieza con TEST-)

### Error: "Preference creation failed"
- Verifica que el backend esté ejecutándose en puerto 3001
- Revisa que hayas configurado `MERCADOPAGO_ACCESS_TOKEN` en .env

### CORS Error
- Verifica que el frontend esté en puerto 5173 y backend en 3001
- Si cambias puertos, actualiza las variables de entorno

## 📱 Flujo de pago completo

1. **Usuario agrega productos al carrito**
2. **Hace clic en "Pagar con MercadoPago"**
3. **Se crea la preferencia de pago en el backend**
4. **MercadoPago muestra el formulario de pago**
5. **Usuario completa el pago**
6. **MercadoPago redirige a las páginas de resultado**
7. **Backend recibe webhooks con el estado del pago**

## 🌐 URLs importantes

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Documentación MercadoPago**: https://www.mercadopago.com.mx/developers/docs
- **Panel de desarrolladores**: https://www.mercadopago.com.mx/developers/panel

---

## ⚠️ Notas importantes

- **NUNCA** subas tus credenciales reales a Git
- Las credenciales de prueba empiezan con "TEST-"
- Para producción, usa credenciales reales y HTTPS
- Los webhooks solo funcionan con URLs públicas
