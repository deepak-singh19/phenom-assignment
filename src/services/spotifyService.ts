import { spotifyApi } from "../config/spotifyAuth";

// export const getUserTopTracks = async (user_id: string, access_token:string) => {
//   try {
//     spotifyApi.setAccessToken(access_token);
//     const topTracks = await spotifyApi.getMyTopTracks();
//     console.log("Top Tracks:", JSON.stringify(topTracks.body, null, 2));
//     return topTracks.body.items;
//   } catch (error) {
//     console.error("Error fetching top tracks:", error);
//     throw new Error("Failed to fetch top tracks");
//   }
// };

export const getUserTopTracks = async (user_id: string, access_token: string) => {
  try {
    spotifyApi.setAccessToken(access_token);
    const topTracks = await spotifyApi.getMyTopTracks();
    
    // ✅ Extract useful track details (name, artist, etc.)
    return topTracks.body.items.map(track => ({
      name: track.name,
      artist: track.artists.map(artist => artist.name).join(", "),
      album: track.album.name,
      preview_url: track.preview_url, // Link to 30-sec preview (if available)
      spotify_url: track.external_urls.spotify // Link to Spotify
    }));
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw new Error("Failed to fetch top tracks");
  }
};