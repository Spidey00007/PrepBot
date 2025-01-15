import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables from .env file
config({ path: ".env" }); // or .env.local

// if (!process.env.DATABASE_URL) {
//   throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
// }
console.log("Database URL:", process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);