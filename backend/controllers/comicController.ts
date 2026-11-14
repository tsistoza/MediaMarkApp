import type { Request, Response } from "express";
import query from "../config/db.ts";

export const getComics = async (req: Request, res: Response) => {
    const { q } = req.query;
    let rawSQL = "";
    if (q) {
        rawSQL = `--sql
            SELECT * FROM comics
            WHERE title LIKE $1
            ORDER BY created_at;
        `;
    } else {
        rawSQL = `--sql
            SELECT * from comics;
        `;
    }

    try {
        let data = null;
        if (q) data = await query(rawSQL, [ `%${q}%` ]);
        else data = await query(rawSQL, []);
        console.log("Fetched comics");
        res.status(200).json({ success: true, data: data.rows });
    } catch (error) {
        console.error("Error fetching comis: ", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const getComicByName = async (req: Request, res: Response) => {
    const { title } = req.params;

    try {
        const rawSQL = `--sql
            SELECT * FROM comics
            WHERE title LIKE $1
            ORDER BY created_at;
        `;

        const data = await query(rawSQL, [ `%${title}%` ]);
        res.status(200).json({ success: true, data: data.rows });
    } catch (error) {
        console.error("Error in getComicByName:", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const addComic = async (req: Request, res: Response) => {
    const { title, chapter, link } = req.body;

    try { 
        const rawSQL = `--sql
            INSERT into comics ( title, chapter, link )
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const data = await query(rawSQL, [`${title}`, `${chapter}`, `${link ? link : "#"}`]);
        res.status(201).json({ success: true, data: data.rows[0].id });
    } catch (error) {
        console.error("Error in addComic: ", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const updateComic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, chapter, link } = req.body;
    try {
        const rawSQL = `--sql
            UPDATE comics
            SET title = $1,
                chapter = $2,
                link = $3
            WHERE id = $4
            RETURNING *;
        `;
        const data = await query(rawSQL, [ `${title}`, `${chapter}`, `${link}`, `${id}` ]);
        res.status(200).json({ success: true, updated: data.rowCount})
    } catch (error) {
        console.error("Error in updateComic: ", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const deleteComic = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rawSQL = `--sql
            DELETE FROM comics
            WHERE id = $1
            RETURNING *;
            `;
        const data = await query(rawSQL, [ `${id}`]);
        res.status(200).json({ success: true, updated: data.rowCount });
    } catch (error) {
        console.error("Error in deleteComic: ", error);
        res.status(500).json({ success: false, error: error });
    }
};
