import { Pool } from "pg";

const pool = new Pool({
    user: "user",
    host: "localhost",
    database: "pg_db",
    password: "password",
    port: 5432,
});

const query = async (text: string, values: string[] | undefined) => await pool.query(text, values);

export default query;
