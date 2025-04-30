/**
 * This script provides instructions for completely resetting your Expo project
 * while preserving your component code
 * 
 * Run with: node reset-project.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n=== PIANO TEACHER APP RESET UTILITY ===\n');

// Create backup directory for components
console.log('1. Creating backup directory for your components...');
if (!fs.existsSync('backup')) {
  fs.mkdirSync('backup');
  fs.mkdirSync('backup/components', { recursive: true });
  console.log('✅ Created backup directory');
} else {
  console.log('⚠️ Backup directory already exists');
}

// Copy components to backup
console.log('\n2. Copying component files to backup...');
if (fs.existsSync('components')) {
  try {
    const componentsDir = fs.readdirSync('components');
    componentsDir.forEach(file => {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        fs.copyFileSync(
          path.join('components', file),
          path.join('backup/components', file)
        );
        console.log(`✅ Backed up: components/${file}`);
      }
    });
  } catch (e) {
    console.error('❌ Error backing up components:', e.message);
  }
} else {
  console.log('⚠️ No components directory found');
}

// Backup App.tsx
console.log('\n3. Backing up App.tsx...');
if (fs.existsSync('App.tsx')) {
  fs.copyFileSync('App.tsx', 'backup/App.tsx');
  console.log('✅ Backed up App.tsx');
} else {
  console.log('⚠️ App.tsx not found');
}

console.log('\n=== MANUAL STEPS TO COMPLETE RESET ===\n');
console.log(`
1. Delete these folders/files:
   - node_modules/
   - .expo/
   - yarn.lock or package-lock.json
   - Any index.js, index.ts, main.ts files

2. Create a fresh Expo project:
   npx create-expo-app PianoTeacherNew --template blank-typescript
   
3. Install dependencies in the new project:
   cd PianoTeacherNew
   npm install expo-av @react-navigation/native @react-navigation/stack 
   npm install react-native-gesture-handler react-native-reanimated 
   npm install react-native-safe-area-context react-native-screens react-native-svg

4. Copy your backed-up files:
   - Copy backup/components/* to PianoTeacherNew/components/
   - Copy backup/App.tsx to PianoTeacherNew/App.tsx

Your component code is now backed up in the 'backup' folder.
Follow the steps above to create a clean project with your existing code.
`);