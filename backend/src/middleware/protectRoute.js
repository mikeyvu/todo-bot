import User from "../models/User.js";
import { verifyToken, TOKEN_COOKIE } from "../config/jwt.js";

export const protectRoute = async (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        const token =
            req.cookies?.[TOKEN_COOKIE] ||
            (header.startsWith("Bearer ") ? header.slice(7) : null);

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = verifyToken(token); // throws if expired/tampered
        const user = await User.findById(decoded.sub).select("_id email name picture");

        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authenticated" });
    }
};
