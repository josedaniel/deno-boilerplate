import { Sequelize } from "sequelize";
import { join } from "path";
import { load } from "dotenv";

// 🗄️ Database configuration
const env = await load();

// 📂 Set up SQLite database path
const DB_PATH = join(Deno.cwd(), "assets", "database.db");

// 🔌 Create Sequelize instance
export const db = new Sequelize({
  dialect: "sqlite",
  storage: DB_PATH,
  logging: env.DEBUG === "true" ? console.log : false
});

// 🔍 Test database connection
export async function testConnection() {
  try {
    await db.authenticate();
    console.log("✅ Database connection established successfully");
    return true;
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    return false;
  }
}