import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getUserTopTracks } from "../services/spotifyService";
import TrackAdvice from "../models/trackAdvice.model";
import { getAdvice } from "../services/adviceService";

// Define custom request type
interface AuthRequest extends Request {
  user?: { user_id: string; access_token: string };
}

export const fetchTrackAdvice = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: No user data" });
  }

  const { user_id, access_token } = req.user;

  console.log(`Fetching top tracks for user: ${user_id} with ${access_token}`);

  const tracks = await getUserTopTracks(user_id, access_token);
  if (!tracks || tracks.length === 0) {
    return res.status(404).json({ message: "No top tracks found." });
  }

  // Process first track as an example (modify as needed)
  const track = tracks[0];
  const advice = await getAdvice(track.name);

  console.log("track", track, "Advice ", advice)

  // Save in the required format
  const savedData = await TrackAdvice.create({
    user_id,
    track: {
      name: track.name,
      artist: track.artist|| "Unknown Artist",
    },
    advice,
    searched_at: new Date().toISOString(), // Ensure the correct timestamp format
  });

  res.json(savedData);
});
