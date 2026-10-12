
import { betterAuth } from "better-auth";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing");
}

const appUrl =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

export const auth = betterAuth({
  baseURL: appUrl,

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

  trustedOrigins: [
    "http://localhost:3000",
    appUrl,
    "https://bazardor-alpha-six.vercel.app",
  ],
});
