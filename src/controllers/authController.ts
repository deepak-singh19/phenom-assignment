import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import jwt from "jsonwebtoken";
import { getAccessToken, spotifyApi } from "../config/spotifyAuth";
import {generateToken} from "../utils/jwt";
import AppError from "../utils/AppError";



export const loginWithSpotify = asyncHandler(async (req: Request, res: Response) => {
  const authURL = spotifyApi.createAuthorizeURL(["user-top-read"], "random-state");
  res.json({ authURL });
});

export const handleSpotifyCallback = asyncHandler(async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!code) throw new AppError("Authorization code is missing", 400);

  try {
    // Get Access Token from Spotify
    const accessToken = await getAccessToken(code);
    spotifyApi.setAccessToken(accessToken);

    // Get User Info
    const userInfo = await spotifyApi.getMe();
    const user_id = userInfo.body.id;

    // Generate JWT Token
    const token = generateToken(user_id, accessToken)

    console.log("User ID: ", user_id)
    console.log("Access Token: ", accessToken)

    res.json({ success: true, token, user_id });
  } catch (error) {
    console.error("Spotify Auth Error:", error);
    throw new AppError("Failed to authenticate with Spotify", 500);
  }
});
