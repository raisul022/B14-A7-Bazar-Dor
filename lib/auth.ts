
import { betterAuth } from "better-auth";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing from .env.local");
}

export const auth = betterAuth({
  database: new Pool({
    connectionString: databaseUrl,
    max: 5,
    ssl: {
      rejectUnauthorized: true,
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  trustedOrigins: ["http://localhost:3000"],
});
