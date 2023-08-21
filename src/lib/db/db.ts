import { Client } from "pg";

export const client = new Client({
    connectionString: process.env.POSTGRES_URL,
});
client.connect();
