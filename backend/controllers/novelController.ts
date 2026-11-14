import type { Request, Response } from "express";
import query from "../config/db.ts";
import type { QueryResult } from "pg";

export const getNovels = async (req: Request, res: Response) => {
    const { q } = req.query;
    let rawSQL = "";
    if (q) {
        rawSQL = `--sql
            SELECT * FROM novels
            WHERE title LIKE $1
            ORDER BY created_at;
        `;
    } else {
        rawSQL = `--sql
            SELECT * FROM novels;
        `;
    }

    try {
        let data: QueryResult;
        if (q) data = await query(rawSQL, [ `%${q}%` ]);
        else data = await query(rawSQL, []);
        res.status(200).json({ success: true, data: data.rows });
    } catch (error) {
        console.error("Error in getNovels function", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const addNovel = async (req: Request, res: Response) => {
    const { title, chapter, page, link } = req.body;
    try {
        const rawSQL = `--sql
            INSERT into novels ( title, chapter, page, link )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const data = await query(rawSQL, [ `${title}`, `${chapter}`, `${page}`, `${link ? link : "#"}`]);
        res.status(201).json({ success: true, data: data.rows[0].id });
    } catch (error) {
        console.error("Error in addNovel function", error);
        res.status(500).json({ success: true, error: error });
    }
};

export const updateNovelById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, chapter, page, link } = req.body;
    try {
        const rawSQL = `--sql
            UPDATE novels
            SET title=$1,
                chapter=$2,
                page=$3,
                link=$4
            WHERE id=$5
            RETURNING *;
        `;
        const data = await query(rawSQL, [ `${title}`, `${chapter}`, `${page}`, `${link ? link : "#"}`, `${id}` ]);
        res.status(200).json({ success: true, id: data.rows[0].id });
    } catch (error) {
        console.error("Error in updateNovelById function", error);
        res.status(500).json({ success: false, error: error });
    }
};

export const deleteNovelById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rawSQL = `--sql
            DELETE FROM novels
            WHERE id=$1
            RETURNING *;
        `;

        const data = await query(rawSQL, [ `${id}` ]);
        res.status(202).json({ success: true, removed: data.rows[0].id });
    } catch (error) {
        console.error("Error in deleteNovelById function", error);
        res.status(500).json({ success: false, error: error });
    }
};
