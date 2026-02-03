#!/usr/bin/env node

/**
 * Project Setup Script
 * This script helps initialize the project once the tech stack is determined
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Project Setup...\n');

// Check if PRD is available
function checkPRD() {
  console.log('📋 Checking for Product Requirements Document...');
  
  const prdPath = path.join(__dirname, '..', 'docs', 'PRD.md');
  const hasLocalPRD = fs.existsSync(prdPath);
  
  if (!hasLocalPRD) {
    console.log('❌ No PRD found. Please provide the Product Requirements Document first.');
    console.log('   Create docs/PRD.md or provide a Google Docs URL\n');
    return false;
  }
  
  console.log('✅ PRD found!\n');
  return true;
}

// Check Node.js and npm versions
function checkNodeVersion() {
  console.log('🔍 Checking Node.js version...');
  
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    
    console.log(`   Node.js: ${nodeVersion}`);
    console.log(`   npm: ${npmVersion}`);
    
    const majorVersion = parseInt(nodeVersion.substring(1).split('.')[0]);
    if (majorVersion < 18) {
      console.log('⚠️  Warning: Node.js 18+ is recommended\n');
    } else {
      console.log('✅ Node.js version is compatible\n');
    }
  } catch (error) {
    console.log('❌ Node.js or npm not found. Please install Node.js first.\n');
    return false;
  }
  
  return true;
}

// Initialize git hooks
function setupGitHooks() {
  console.log('🔧 Setting up Git hooks...');
  
  try {
    // Check if .git directory exists
    if (!fs.existsSync('.git')) {
      console.log('   Git not initialized. Skipping git hooks setup.\n');
      return;
    }
    
    // Create pre-commit hook placeholder
    const hooksDir = '.git/hooks';
    const preCommitPath = path.join(hooksDir, 'pre-commit');
    
    if (!fs.existsSync(preCommitPath)) {
      const preCommitContent = `#!/bin/sh
# Pre-commit hook
# This will be configured once the tech stack is determined

echo "Running pre-commit checks..."

# TODO: Add linting, formatting, and testing checks
# Example:
# npm run lint
# npm run test

exit 0
`;
      
      fs.writeFileSync(preCommitPath, preCommitContent);
      execSync(`chmod +x ${preCommitPath}`);
      console.log('✅ Git hooks configured\n');
    } else {
      console.log('✅ Git hooks already exist\n');
    }
  } catch (error) {
    console.log('⚠️  Could not setup git hooks (this is okay)\n');
  }
}

// Create environment file
function setupEnvironment() {
  console.log('🔧 Setting up environment...');
  
  const envPath = '.env';
  const envExamplePath = '.env.example';
  
  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
    console.log('   Please update .env with your actual configuration values\n');
  } else if (fs.existsSync(envPath)) {
    console.log('✅ .env file already exists\n');
  } else {
    console.log('⚠️  No .env.example found to copy from\n');
  }
}

// Main setup function
function main() {
  console.log('==================================================');
  console.log('         UNNAMED PROJECT SETUP SCRIPT           ');
  console.log('==================================================\n');
  
  // Run setup checks
  const nodeOk = checkNodeVersion();
  if (!nodeOk) {
    process.exit(1);
  }
  
  const prdAvailable = checkPRD();
  
  setupEnvironment();
  setupGitHooks();
  
  console.log('==================================================');
  console.log('                SETUP SUMMARY                    ');
  console.log('==================================================');
  
  if (prdAvailable) {
    console.log('✅ PRD is available - ready for architecture design');
    console.log('✅ Environment configured');
    console.log('✅ Git hooks set up');
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('   1. Review the PRD in docs/PRD.md');
    console.log('   2. Design technical architecture');
    console.log('   3. Select appropriate tech stack');
    console.log('   4. Update package.json with chosen dependencies');
    console.log('   5. Configure build and development scripts');
  } else {
    console.log('⏳ Waiting for PRD to complete setup');
    console.log('✅ Environment configured');
    console.log('✅ Git hooks set up');
    
    console.log('\n📋 REQUIRED:');
    console.log('   Please provide the Product Requirements Document');
    console.log('   - Create docs/PRD.md with project requirements');
    console.log('   - OR provide Google Docs URL with PRD content');
    console.log('   - Then run this setup script again');
  }
  
  console.log('\n🚀 Happy coding!');
}

// Run the setup
main();