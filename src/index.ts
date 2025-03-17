import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import trackRoutes from "./routes/trackRoutes";
import { errorHandler } from "./middleware/errorHandler";
import limiter from "./utils/limiter";
import morgan from "morgan";



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(limiter)

app.use("/api/auth", authRoutes);
app.use("/api/user", trackRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Server running on port 3000"));
