import express from "express";
import { fetchTrackAdvice } from "../controllers/trackController";
import authenticateJWT from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:user_id/track-advice", authenticateJWT, fetchTrackAdvice);

export default router;
