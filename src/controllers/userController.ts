import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
import { AuthRequest } from "../middlewares/authMiddleware";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, status = "user" } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword, status });
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username, status: newUser.status },
            JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            username: newUser.username,
            status: newUser.status
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err });
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ message: "Invalid username or password" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid username or password" });
            return;
        }

        const token = jwt.sign({ userId: user._id, username: user.username, status: user.status }, JWT_SECRET, {
            expiresIn: "3h",
        });

        res.status(200).json({ token, username: user.username, status: user.status });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err });
    }
};

const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err });
    }
};

const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (req.user.status !== "admin") {
            res.status(403).json({ message: "You do not have permission to delete users" });
            return;
        }

        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User deleted successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err });
    }
};

export { registerUser, loginUser, getUser, deleteUser };