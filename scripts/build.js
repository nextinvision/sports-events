const { execSync } = require('child_process');
require('dotenv').config();

try {
    console.log('Running prisma generate...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('Running next build...');
    execSync('npx next build', { stdio: 'inherit' });
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
