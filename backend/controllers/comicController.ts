import type { Request, Response } from "express";
import query from "../config/db.ts";

export const getComics = async (req: Request, res: Response) => {
    try {
        const rawSQL = `--sql
            SELECT * FROM comics;
        `;

        const data = await query(rawSQL);
        console.log("Fetched Products");
        res.status(200).json({ success: true, data: data.rows });
    } catch (error) {
        console.error("Error fetching comis: ", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const getComicByName = async (req: Request, res: Response) => {
    const { name } = req.params;

    try {
        const rawSQL = `--sql
            SELECT * FROM comics
            WHERE name LIKE ${name};
        `;

        const data = await query(rawSQL);
        res.status(200).json({ success: true, data: data.rows });
    } catch (error) {
        console.error("Error in getComicByName:", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const addComic = async (req: Request, res: Response) => {
    const { title, chapter, page } = req.body;

    try { 
        const rawSQL = `--sql
            INSERT into comics (title, chapter, page )
            VALUES (${title}, ${chapter}, ${page});
        `;

        const data = await query(rawSQL);
        res.status(201).json({ success: true, id: data.rows[0].id });
    } catch (error) {
        console.error("Error in addComic: ", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const updateComic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, chapter, page } = req.body;
    try {
        const rawSQL = `--sql
            UPDATE comics
            SET title = ${title},
                chapter = ${chapter},
                page = ${page}
            WHERE id = ${id};
        `;
        const data = await query(rawSQL);
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
            WHERE id = ${id};
            `;
        const data = await query(rawSQL);
        res.status(200).json({ success: true, updated: data.rowCount });
    } catch (error) {
        console.error("Error in deleteComic: ", error);
        res.status(500).json({ success: false, error: error });
    }
};
