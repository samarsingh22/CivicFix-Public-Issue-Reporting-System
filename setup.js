#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 CivicFix Setup Script');
console.log('========================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  try {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created successfully!');
    console.log('⚠️  Please edit .env file and add your Google Maps API key');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
  }
} else {
  console.log('✅ .env file already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    console.log('💡 Try running "npm install" manually');
  }
} else {
  console.log('✅ Dependencies already installed');
}

// Check if Google Maps API key is configured
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('your_google_maps_api_key_here')) {
    console.log('\n⚠️  IMPORTANT: Please update your .env file with your actual Google Maps API key');
    console.log('   You can get one from: https://console.cloud.google.com/');
  } else {
    console.log('✅ Google Maps API key appears to be configured');
  }
} catch (error) {
  console.log('⚠️  Could not check .env file configuration');
}

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Edit .env file with your API keys');
console.log('2. Run "npm run dev" to start development server');
console.log('3. Open http://localhost:5173 in your browser');
console.log('\n📚 Check README.md for more information'); 