import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Generate Spotify Login URL
const getSpotifyAuthURL = () => {
  const scopes = ["user-top-read"]; 
  return spotifyApi.createAuthorizeURL(scopes, "some-random-state");
};

// Handle Spotify Authorization Code Flow
const getAccessToken = async (code: string) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.setRefreshToken(data.body.refresh_token);
    return data.body.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw new Error("Failed to authenticate with Spotify.");
  }
};

export { spotifyApi, getSpotifyAuthURL, getAccessToken };
