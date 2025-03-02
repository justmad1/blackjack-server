import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
    user?: { userId: string; username: string, status?: "user" | "admin" };
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access Denied: No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export { verifyToken, AuthRequest };