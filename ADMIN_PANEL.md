# Panel de Administración - HRStore México 🇲🇽

## 🛡️ Acceso al Panel de Administración

El panel de administración de HRStore es una sección oculta que solo puede ser accedida mediante la URL directa:

```
http://localhost:5173/admin
```

## 🚀 Características del Panel

### Dashboard Principal
- **Estadísticas en tiempo real**: Visualiza el número total de productos, órdenes, ventas totales en pesos mexicanos y stock disponible
- **Interfaz moderna**: Diseño elegante con gradientes y animaciones suaves
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Moneda mexicana**: Todos los precios en pesos mexicanos (MXN)

### Gestión de Productos
- **Lista de productos**: Ve todos los productos con imagen, precio, categoría y stock
- **Edición en tiempo real**: Edita precios, descripciones, stock y más
- **Eliminación segura**: Confirmación antes de eliminar productos
- **Imágenes**: Soporte para subir y previsualizar imágenes de productos

### Agregar Nuevos Productos
- **Formulario completo**: Campos para nombre, precio, categoría, descripción, imagen y stock
- **Categorías predefinidas**: Reparaciones, Accesorios, Componentes, Servicios
- **Validación**: Campos requeridos y validación de datos
- **Vista previa**: Previsualización de imágenes antes de guardar

### Gestión de Órdenes
- **Lista de órdenes**: Ve todas las órdenes con estado, cliente y total
- **Estados**: Pendiente, Completado, Cancelado
- **Detalles completos**: Información del cliente y elementos de la orden

### Configuración
- **Datos de la tienda**: Nombre, email, teléfono (formato mexicano)
- **Configuración monetaria**: Moneda en pesos mexicanos (MXN)
- **Persistencia**: Todos los cambios se guardan automáticamente

## 💾 Almacenamiento de Datos

El panel utiliza `localStorage` para persistir los datos:

- **Productos**: `hrstore_products`
- **Órdenes**: `hrstore_orders`
- **Configuración**: `hrstore_settings`

## 🎨 Características de Diseño

- **Tema oscuro**: Interfaz elegante con fondo negro
- **Gradientes**: Uso de gradientes azul-púrpura para elementos importantes
- **Animaciones**: Transiciones suaves y efectos hover
- **Iconos**: Uso de emojis para mejorar la experiencia visual
- **Tipografía**: Fuentes modernas y legibles

## 🇲🇽 Configuración para México

### Moneda y Precios
- **Moneda principal**: Peso Mexicano (MXN)
- **Formato de precios**: $MX 2,499.99
- **Precios de ejemplo**:
  - Reparación Pantalla iPhone: $MX 2,499.99
  - Reparación Pantalla Android: $MX 1,599.99
  - Cambio de Batería: $MX 799.99
  - Protector de Pantalla: $MX 199.99

### Configuración Regional
- **Teléfono**: Formato mexicano (+52 55 1234 5678)
- **Sin impuestos**: Sistema simplificado sin cálculo de IVA
- **Idioma**: Español mexicano

## 🛠️ Funcionalidades Técnicas
### Hook personalizado useProducts
const { products, addProduct, updateProduct, deleteProduct } = useProducts();
```

### Componentes modulares
- `Admin.tsx`: Componente principal del panel
- `useProducts.ts`: Hook para gestión de productos
- `admin.css`: Estilos específicos del panel

### Integración con la aplicación
- Ruta `/admin` añadida al router principal
- Compatibilidad con el sistema de tipos existente
- Productos disponibles en `/products` usando los mismos datos

## 🚀 Cómo usar

1. **Acceso**: Navega a `http://localhost:5173/admin`
2. **Dashboard**: Ve las estadísticas principales en la página de inicio
3. **Productos**: 
   - Usa "Gestionar Productos" para editar productos existentes
   - Usa "Agregar Producto" para crear nuevos productos
4. **Órdenes**: Revisa y gestiona las órdenes de clientes
5. **Configuración**: Ajusta la configuración de la tienda

## 🔒 Seguridad

> **Nota**: Este panel es solo para demostración. En un entorno de producción, deberías implementar:
> - Autenticación de administrador
> - Autorización basada en roles
> - Validación del lado del servidor
> - Encriptación de datos sensibles
> - Logs de actividad

## 🎯 Próximas mejoras

- [ ] Sistema de autenticación
- [ ] Backup y restauración de datos
- [ ] Reportes y analíticas avanzadas
- [ ] Gestión de inventario avanzada
- [ ] Notificaciones en tiempo real
- [ ] API REST para integración externa

## 📱 Responsividad

El panel está optimizado para:
- **Desktop**: Experiencia completa con todos los elementos visibles
- **Tablet**: Adaptación de la grilla y navegación
- **Mobile**: Vista compacta con navegación vertical

¡Disfruta gestionando tu tienda HRStore! 🚀
