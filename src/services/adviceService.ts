import axios from "axios";

export const getAdvice = async (trackName: string): Promise<string> => {
  try {
    const keyword = trackName.split(" ")[0].toLowerCase();
    const response = await axios.get(`https://api.adviceslip.com/advice/search/${keyword}`);

    if (response.data.slips && response.data.slips.length > 0) {
      return response.data.slips[0].advice; 
    }

    return "No relevant advice found."; 
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Could not retrieve advice at this time."; 
  }
};
