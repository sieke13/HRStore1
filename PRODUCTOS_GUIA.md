# 🚀 Guía Rápida - Sistema de Productos HRStore

## 📋 **Cómo usar el sistema completo**

### 🛡️ **Panel de Administración** (`/admin`)

1. **Acceder al panel**: Navega a `http://localhost:5173/admin`

2. **Agregar productos**:
   - Ve a "Agregar Producto"
   - Completa todos los campos requeridos
   - Sube una imagen (opcional)
   - Haz clic en "Agregar Producto"
   - ✅ El producto aparecerá automáticamente en `/products`

3. **Editar productos**:
   - Ve a "Gestionar Productos"
   - Haz clic en "Editar" en cualquier producto
   - Modifica los campos necesarios
   - Guarda los cambios

4. **Eliminar productos**:
   - En "Gestionar Productos"
   - Haz clic en "Eliminar"
   - Confirma la eliminación

### 🛍️ **Página de Productos** (`/products`)

- **Ver todos los productos**: Los productos agregados desde el admin aparecen aquí
- **Filtrar por categoría**: Usa los botones de filtro
- **Agregar al carrito**: Haz clic en "Add to Cart"
- **Ver detalles**: Descripción, stock, categoría

### 🏠 **Navegación**

- **Desde Home**: Haz clic en "Ver Productos" o "Explorar Catálogo"
- **Desde Header**: Usa el menú "Productos"
- **Desde Admin**: Usa los botones "Ver Tienda" o "Ir al Inicio"

## 🔄 **Sincronización en tiempo real**

### ✅ **Lo que funciona automáticamente**:

1. **Producto agregado en Admin** → Aparece en `/products`
2. **Producto editado en Admin** → Se actualiza en `/products`
3. **Producto eliminado en Admin** → Se elimina de `/products`
4. **Cambios de stock** → Se reflejan en tiempo real
5. **Nuevas categorías** → Se muestran en los filtros

### 💾 **Almacenamiento**:
- Todos los datos se guardan en `localStorage`
- Los productos persisten entre sesiones
- No se pierde información al cerrar el navegador

## 📦 **Productos de Prueba Incluidos**

El sistema incluye 15 productos de ejemplo:

### 🔧 **Reparaciones** (7 productos):
- Reparación Pantalla iPhone 13 - $MX 2,499.99
- Reparación Pantalla Samsung Galaxy S23 - $MX 1,899.99
- Cambio de Batería iPhone 12 - $MX 899.99
- Reparación Placa Base iPhone - $MX 3,999.00
- Cambio de Puerto de Carga - $MX 799.99
- Reparación Cámara Trasera - $MX 1,299.99

### 📱 **Accesorios** (4 productos):
- Protector de Pantalla Cristal Templado - $MX 249.99
- Funda Protectora Transparente - $MX 399.99
- Cable USB-C a Lightning Certificado - $MX 199.99
- Audífonos Bluetooth Premium - $MX 899.99

### 🛠️ **Componentes** (2 productos):
- Kit de Herramientas de Reparación - $MX 599.99
- Pantalla LCD Xiaomi Redmi Note - $MX 699.99

### 🔧 **Servicios** (3 productos):
- Servicio de Diagnóstico Completo - $MX 299.99
- Servicio de Liberación de Operador - $MX 499.99
- Limpieza Profunda de Dispositivo - $MX 199.99

## 🎯 **Características del Sistema**

### ✨ **Panel de Administración**:
- Dashboard con estadísticas en tiempo real
- CRUD completo de productos
- Subida de imágenes
- Gestión de stock
- Configuración de la tienda

### 🛍️ **Página de Productos**:
- Filtros por categoría
- Contador de productos por categoría
- Indicadores de stock bajo
- Productos agotados marcados
- Carrito de compras funcional
- Diseño responsive

### 🔧 **Funcionalidades Técnicas**:
- Hook personalizado `useProducts`
- Persistencia en localStorage
- Sincronización automática
- Validación de formularios
- Manejo de errores

## 🚀 **Próximos Pasos**

Para mejorar el sistema, puedes:

1. **Añadir autenticación** al panel de admin
2. **Implementar pagos** reales con MercadoPago/PayPal
3. **Agregar búsqueda** de productos
4. **Sistema de reviews** y calificaciones
5. **Envío por email** de confirmaciones
6. **Base de datos** real en lugar de localStorage
7. **Sistema de usuarios** y cuentas

## 📞 **Soporte**

Si necesitas ayuda:
- Revisa los archivos `ADMIN_PANEL.md` para documentación detallada
- Verifica que todos los archivos estén en su lugar
- Usa las herramientas de desarrollo del navegador para debug

¡Tu sistema de productos está listo para usar! 🎉
