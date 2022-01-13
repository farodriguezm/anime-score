import { config } from "dotenv";
config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const URI = process.env.URI;
