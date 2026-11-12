import { getNovels, addNovel, updateNovelById, deleteNovelById } from "../controllers/novelController.ts";
import { Router } from "express";

const router = Router();

router.get("/", getNovels);
router.post("/", addNovel);
router.put("/:id", updateNovelById);
router.delete("/:id", deleteNovelById);

export default router;
