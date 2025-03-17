import express from "express";
import { loginWithSpotify, handleSpotifyCallback } from "../controllers/authController";

const router = express.Router();

router.get("/login", loginWithSpotify);
router.get("/callback", handleSpotifyCallback);

export default router;
