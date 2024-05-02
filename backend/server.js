import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatGptRoute from "./routes/gemini.routes.js";

import { app, server } from "./socket/socket.js";
const PORT = process.env.PORT || 3005;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gemini", chatGptRoute);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running in port ${PORT}`);
});
