import { Router } from "express";
import { getComicByName, getComics, addComic, deleteComic, updateComic } from "../controllers/comicController.ts";
const router = Router();

router.get("/", getComics);
router.get("/q=:name", getComicByName);
router.put("/:id", updateComic);
router.post("/", addComic);
router.delete("/:id", deleteComic);

export default router;
