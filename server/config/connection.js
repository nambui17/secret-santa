import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/secretSanta";

mongoose.connect(connectionString);

export default mongoose.connection;
