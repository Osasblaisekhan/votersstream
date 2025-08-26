#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

console.log('🚀 VotersStream Email Verification Setup Helper\n');

// Generate JWT Secret
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Create .env file template
const createEnvTemplate = (jwtSecret) => {
  const template = `# VotersStream Backend Environment Variables
# Copy this file to .env and fill in your actual values

# Database
MONGODB_URL=mongodb://localhost:27017/votersstream
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/votersstream

# JWT Configuration
JWT_SECRET=${jwtSecret}
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Email Configuration (Gmail SMTP)
# Follow the Gmail setup guide to get these values
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_gmail@gmail.com
SMTP_PASSWORD=your_app_specific_password

# Email From
FROM_NAME=VotersStream
FROM_EMAIL=noreply@votersstream.com

# Client Configuration
CLIENT_URL=http://localhost:5173

# Server Configuration
PORT=5000
NODE_ENV=development
`;
  return template;
};

// Main setup function
const setupCredentials = () => {
  console.log('1. Generating secure JWT secret...');
  const jwtSecret = generateJWTSecret();
  console.log('✅ JWT Secret generated (128 characters)');
  console.log('   Preview:', jwtSecret.substring(0, 20) + '...\n');

  console.log('2. Creating .env template...');
  const envContent = createEnvTemplate(jwtSecret);
  
  const envPath = path.join(__dirname, 'votters-stream-backend', '.env');
  const envExamplePath = path.join(__dirname, 'votters-stream-backend', '.env.example');
  
  try {
    // Write to .env.example if it doesn't exist
    if (!fs.existsSync(envExamplePath)) {
      fs.writeFileSync(envExamplePath, envContent);
      console.log('✅ Created .env.example');
    }
    
    // Create .env if it doesn't exist
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Created .env file');
    } else {
      console.log('⚠️  .env file already exists, not overwriting');
      console.log('   You can manually copy the JWT secret below:');
      console.log('   JWT_SECRET=' + jwtSecret);
    }
  } catch (error) {
    console.log('ℹ️  Could not write files (backend folder may not exist)');
    console.log('   Please create the .env file manually with these values:\n');
    console.log(envContent);
  }

  console.log('\n📧 Next Steps for Gmail SMTP Setup:');
  console.log('1. Go to https://myaccount.google.com/security');
  console.log('2. Enable 2-Factor Authentication');
  console.log('3. Go to App Passwords');
  console.log('4. Generate password for "Mail"');
  console.log('5. Update SMTP_EMAIL and SMTP_PASSWORD in .env');

  console.log('\n🗄️  Database Setup:');
  console.log('1. Install MongoDB locally OR');
  console.log('2. Create MongoDB Atlas account (free tier available)');
  console.log('3. Update MONGODB_URL in .env');

  console.log('\n🔧 Test Your Setup:');
  console.log('1. cd votters-stream-backend');
  console.log('2. npm install');
  console.log('3. npm run dev');
  console.log('4. Check http://localhost:5000/api/health');

  console.log('\n✅ Setup complete! Check the guide files for detailed instructions.');
};

// Run the setup
setupCredentials();
