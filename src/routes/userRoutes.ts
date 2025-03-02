import express from "express";
import { registerUser, loginUser, getUser, deleteUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getUser);
router.delete("/delete/:username", verifyToken, deleteUser);

export default router;