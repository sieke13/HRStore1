#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Verificando configuración de HRStore...\n');

// Verificar archivos de configuración
const checks = [
  {
    name: 'Archivo .env (Backend)',
    path: '.env',
    required: ['MERCADOPAGO_ACCESS_TOKEN', 'PAYPAL_CLIENT_ID'],
    type: 'backend'
  },
  {
    name: 'Archivo .env.local (Frontend)',
    path: '.env.local',
    required: ['VITE_MERCADOPAGO_PUBLIC_KEY', 'VITE_PAYPAL_CLIENT_ID'],
    type: 'frontend'
  },
  {
    name: 'Dependencias de Node.js',
    path: 'node_modules',
    type: 'directory'
  },
  {
    name: 'Archivos de build',
    path: 'package.json',
    type: 'file'
  }
];

let allGood = true;

for (const check of checks) {
  const fullPath = path.join(__dirname, check.path);
  
  if (check.type === 'directory') {
    if (fs.existsSync(fullPath)) {
      console.log(`✅ ${check.name}: OK`);
    } else {
      console.log(`❌ ${check.name}: No encontrado`);
      if (check.path === 'node_modules') {
        console.log('   → Ejecuta: npm install');
      }
      allGood = false;
    }
  } else if (check.type === 'file') {
    if (fs.existsSync(fullPath)) {
      console.log(`✅ ${check.name}: OK`);
    } else {
      console.log(`❌ ${check.name}: No encontrado`);
      allGood = false;
    }
  } else if (check.required) {
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const missingVars = check.required.filter(varName => !content.includes(varName));
      
      if (missingVars.length === 0) {
        console.log(`✅ ${check.name}: OK`);
      } else {
        console.log(`⚠️  ${check.name}: Falta configurar: ${missingVars.join(', ')}`);        if (check.type === 'backend') {
          console.log('   → MercadoPago: https://www.mercadopago.com.mx/developers/panel');
          console.log('   → PayPal: https://developer.paypal.com/developer/applications');
        }
        allGood = false;
      }
    } else {
      console.log(`❌ ${check.name}: No encontrado`);
      console.log(`   → Crea el archivo ${check.path}`);
      allGood = false;
    }
  }
}

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('🎉 ¡Todo está configurado correctamente!');
  console.log('\n📋 Comandos para ejecutar:');
  console.log('   npm run dev:full  # Ejecutar todo');
  console.log('   npm run dev       # Solo frontend');
  console.log('   npm run server    # Solo backend');
} else {
  console.log('⚠️  Hay problemas de configuración que necesitan atención.');
  console.log('\n📖 Lee MERCADOPAGO_SETUP.md y PAYPAL_SETUP.md para más información.');
}

console.log('\n🌐 URLs importantes:');
console.log('   Frontend:  http://localhost:5173');
console.log('   Backend:   http://localhost:3001/api');
console.log('   MercadoPago: https://www.mercadopago.com.mx/developers');
console.log('   PayPal: https://developer.paypal.com/developer/applications');

export default function verify() {
  return allGood;
}
