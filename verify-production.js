#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Verificando configuración para PRODUCCIÓN...\n');

// Variables que deben estar configuradas en producción
const requiredEnvVars = {
  frontend: [
    'VITE_MERCADOPAGO_PUBLIC_KEY',
    'VITE_PAYPAL_CLIENT_ID',
    'VITE_API_URL'
  ],
  backend: [
    'MERCADOPAGO_ACCESS_TOKEN',
    'PAYPAL_CLIENT_ID',
    'PAYPAL_CLIENT_SECRET',
    'NODE_ENV'
  ]
};

let allGood = true;
let warnings = [];

console.log('📋 FRONTEND - Variables requeridas:');
console.log('=====================================');

requiredEnvVars.frontend.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    console.log(`❌ ${varName}: NO CONFIGURADO`);
    allGood = false;
  } else if (value.includes('your-') || value.includes('test') || value.includes('TEST-')) {
    console.log(`⚠️  ${varName}: Valor de desarrollo/prueba detectado`);
    warnings.push(varName);
  } else {
    console.log(`✅ ${varName}: OK`);
  }
});

console.log('\n📋 BACKEND - Variables requeridas:');
console.log('===================================');

requiredEnvVars.backend.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    console.log(`❌ ${varName}: NO CONFIGURADO`);
    allGood = false;
  } else if (value.includes('your-') || value.includes('test') || value.includes('TEST-')) {
    console.log(`⚠️  ${varName}: Valor de desarrollo/prueba detectado`);
    warnings.push(varName);
  } else {
    console.log(`✅ ${varName}: OK`);
  }
});

console.log('\n🔍 Verificaciones Adicionales:');
console.log('===============================');

// Verificar NODE_ENV
if (process.env.NODE_ENV === 'production') {
  console.log('✅ NODE_ENV: production');
} else {
  console.log('⚠️  NODE_ENV: No está configurado como "production"');
  warnings.push('NODE_ENV');
}

// Verificar HTTPS en URLs
const apiUrl = process.env.VITE_API_URL;
if (apiUrl && apiUrl.startsWith('https://')) {
  console.log('✅ VITE_API_URL: Usa HTTPS');
} else if (apiUrl) {
  console.log('⚠️  VITE_API_URL: No usa HTTPS (requerido para pagos)');
  warnings.push('HTTPS');
} else {
  console.log('❌ VITE_API_URL: No configurado');
}

// Verificar que no sean credenciales de sandbox/test
const mercadopagoKey = process.env.VITE_MERCADOPAGO_PUBLIC_KEY;
if (mercadopagoKey && mercadopagoKey.startsWith('APP_USR-')) {
  console.log('✅ MercadoPago: Credenciales de producción');
} else if (mercadopagoKey && mercadopagoKey.startsWith('TEST-')) {
  console.log('⚠️  MercadoPago: Credenciales de PRUEBA (cambiar a producción)');
  warnings.push('MercadoPago credentials');
}

const paypalMode = process.env.PAYPAL_MODE;
if (paypalMode === 'live') {
  console.log('✅ PayPal: Modo producción');
} else {
  console.log('⚠️  PayPal: Modo sandbox/prueba (cambiar a "live")');
  warnings.push('PayPal mode');
}

// Resumen final
console.log('\n' + '='.repeat(50));

if (allGood && warnings.length === 0) {
  console.log('🎉 ¡Configuración perfecta para PRODUCCIÓN!');
  console.log('\n🚀 Tu aplicación está lista para desplegar.');
} else if (allGood && warnings.length > 0) {
  console.log('⚠️  Configuración básica OK, pero hay advertencias:');
  warnings.forEach(warning => {
    console.log(`   - ${warning}`);
  });
  console.log('\n💡 Revisa las advertencias antes de desplegar.');
} else {
  console.log('❌ Faltan configuraciones críticas.');
  console.log('\n📖 Lee PRODUCTION_DEPLOYMENT.md para instrucciones.');
}

console.log('\n🌐 Plataformas recomendadas:');
console.log('   Frontend: Vercel (https://vercel.com)');
console.log('   Backend:  Railway (https://railway.app)');
console.log('   Base de datos: PlanetScale, MongoDB Atlas');

console.log('\n📚 Documentación:');
console.log('   - PRODUCTION_DEPLOYMENT.md');
console.log('   - .env.production.template');

export default function verifyProduction() {
  return allGood && warnings.length === 0;
}
