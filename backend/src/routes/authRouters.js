import express from "express";
import { googleLogin, getMe, logout } from "../controller/authControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/google", googleLogin);
router.get("/me", protectRoute, getMe);
router.post("/logout", protectRoute, logout);

export default router;
