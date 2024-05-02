import express from "express";
import { runGemini } from "../controllers/gemini.controller.js";
// import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

router.get("/send/:prompt", runGemini);

export default router;
