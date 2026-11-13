import { Router } from "express";
import { getVideos, addVideo, updateVideo, deleteVideo } from "../controllers/videoController.ts";

const router = Router();

router.get("/", getVideos);
router.post("/", addVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;
