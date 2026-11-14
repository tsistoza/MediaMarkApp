import type { Request, Response } from "express";
import type { QueryResult } from "pg";
import query from "../config/db.ts";

export const getVideos = async (req: Request, res: Response) => {
    const { q } = req.query;
    let rawSQL;
    if (q) {
        rawSQL = `--sql
            SELECT * from videos WHERE title LIKE $1
            ORDER BY title;
        `;
    } else {
        rawSQL = `--sql 
            SELECT * FROM videos;
            `;
    }

    try {
        let data: QueryResult;
        if (q) data = await query(rawSQL, [ `%${q}%` ])
        else data = await query(rawSQL, []);
        res.status(200).json({ success: true, data: data.rows });
    } catch (error){
        console.error("Error in getVideos function:", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const addVideo = async (req: Request, res: Response) => {
    const { title, duration, link } = req.body;
    

    try {
        const rawSQL = `--sql
            INSERT into videos (title, duration, link)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const data = await query(rawSQL, [ `${title}`, `${duration}`, `${link ? link : "#"}` ]);
        res.status(201).json({ success: true, data: data.rows });
    } catch (error) {
        console.error("Error in addVideo function:", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const updateVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, duration, link } = req.body;
    try {
        const rawSQL = `--sql
            UPDATE videos
            SET title = $1, duration = $2, link = $3
            WHERE id = $4
            RETURNING *;
        `;
        const data = await query(rawSQL, [ `${title}`, `${duration}`, `${link ? link : "#"}`, `${id}` ]);
        res.status(200).json({ success: true, data: data.rows[0] });
    } catch (error) {
        console.error("Error in updateVideo function:", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const deleteVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rawSQL = `--sql
            DELETE FROM videos
            WHERE id = $1
            RETURNING *;
        `;
        const data = await query(rawSQL, [ `${id}` ]);
        res.status(200).json({ success: true, removed: data.rowCount })
    } catch (error) {
        console.error("Error in deleteVideo function:", error);
        res.status(500).json({ success: false, error: error });
    }
};
