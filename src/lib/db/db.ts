import { Client } from "pg";

export const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.SSL_REQUIRED == "true",
});
client.connect();
