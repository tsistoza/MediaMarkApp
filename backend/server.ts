import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import comicRoutes from "./routes/comicRoutes.ts";
import query from "./config/db.ts";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Set Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Endpoints
//app.use("/api/novels");
//app.use("/api/videos");
app.use("/api/comics", comicRoutes);

async function initDB() {
    try {
        const rawSQL = `--sql
            CREATE TABLE IF NOT EXISTS novels (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                chapter SMALLINT DEFAULT 0,
                page SMALLINT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS videos (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                duration INTERVAL DEFAULT '00:00:00',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS comics (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                chapter SMALLINT DEFAULT 0,
                page SMALLINT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log(rawSQL);
        await query(rawSQL);
    } catch (error){
        console.error("Init DB", error);
    }
};

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});
