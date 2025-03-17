import mongoose from "mongoose";

const trackAdviceSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  track: { 
    name: { type: String, required: true },
    artist: { type: String, required: true }
  },
  advice: { type: String, required: true },
  searched_at: { type: Date, default: Date.now }
});

const TrackAdvice = mongoose.model("TrackAdvice", trackAdviceSchema);

export default TrackAdvice;
