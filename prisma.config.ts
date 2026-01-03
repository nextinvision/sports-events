import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "prisma/config";

// Load .env file explicitly with correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, ".env");
config({ path: envPath });

// Get DATABASE_URL with fallback for generation
// Prisma generate doesn't need a real connection, just a valid URL format
function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    // For Prisma generate, we can use a dummy URL since it doesn't actually connect
    // This allows generation to work even without a configured database
    console.warn("⚠️  DATABASE_URL not found in environment. Using fallback for Prisma generation.");
    console.warn("⚠️  Make sure to set DATABASE_URL in your .env file for database operations.");
    return "mongodb://localhost:27017/temp";
  }
  
  return url;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: getDatabaseUrl(),
  },
});
