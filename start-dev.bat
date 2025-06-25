@echo off
echo 🚀 Iniciando HRStore en modo desarrollo...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js no está instalado
    echo Descarga Node.js desde: https://nodejs.org
    pause
    exit /b 1
)

REM Verificar si las dependencias están instaladas
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    npm install
    if errorlevel 1 (
        echo ❌ Error instalando dependencias
        pause
        exit /b 1
    )
)

REM Verificar si existen archivos de configuración
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado
    echo Por favor configura tus credenciales de MercadoPago
    echo Lee el archivo MERCADOPAGO_SETUP.md para más información
    pause
)

if not exist ".env.local" (
    echo ⚠️  Archivo .env.local no encontrado
    echo Por favor configura tus variables de entorno del frontend
    echo Lee el archivo MERCADOPAGO_SETUP.md para más información
    pause
)

echo.
echo 🌐 Iniciando servidor de desarrollo...
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:3001/api
echo.
echo Para detener el servidor, presiona Ctrl+C
echo.

REM Ejecutar frontend y backend simultáneamente
npm run dev:full
