const { execSync } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');

// Load .env file explicitly
const envPath = path.resolve(__dirname, '..', '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.warn('⚠️  Could not load .env file:', result.error.message);
} else {
    console.log(`✅ Loaded ${Object.keys(result.parsed || {}).length} environment variables from .env`);
}

// Merge current process env with loaded env vars
const env = { ...process.env, ...result.parsed };

try {
    console.log('Running prisma generate...');
    execSync('npx prisma generate', { 
        stdio: 'inherit',
        env: env,
        cwd: path.resolve(__dirname, '..')
    });

    console.log('Running next build...');
    execSync('npx next build', { 
        stdio: 'inherit',
        env: env,
        cwd: path.resolve(__dirname, '..')
    });
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
