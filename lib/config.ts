import dotenv from "dotenv";

dotenv.config();

const config = {
  databaseUrl: process.env.DATABASE_URL,
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "123",
  dbHost: process.env.DB_HOST || "localhost",
  dbName: process.env.DB_NAME || "proyecto",
  dbPort: Number(process.env.DB_PORT) || "5000",
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || "3000",
  host: process.env.API_host || "localhost",
  accessToken: process.env.PROD_ACCESS_TOKEN || "",
};

export default config;
