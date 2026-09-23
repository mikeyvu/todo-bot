import jwt from "jsonwebtoken";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const TOKEN_COOKIE = "token";
export const TOKEN_MAX_AGE = SEVEN_DAYS_MS;

export const signToken = (userId) =>
    jwt.sign({ sub: String(userId) }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

// One source of truth: res.cookie() and res.clearCookie() must use identical
// attributes (path/sameSite/secure) or the browser won't drop the cookie on logout.
export const cookieOptions = () => ({
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
});
