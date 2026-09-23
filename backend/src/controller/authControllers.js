import User from "../models/User.js";
import { verifyGoogleIdToken } from "../config/google.js";
import { signToken, cookieOptions, TOKEN_COOKIE, TOKEN_MAX_AGE } from "../config/jwt.js";

const publicUser = (user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture,
});

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ message: "Missing credential" });
        }

        const profile = await verifyGoogleIdToken(credential);

        // Upsert: first login creates the user, later logins refresh name/picture.
        const user = await User.findOneAndUpdate(
            { googleId: profile.googleId },
            {
                $set: { email: profile.email, name: profile.name, picture: profile.picture },
                $setOnInsert: { googleId: profile.googleId },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.cookie(TOKEN_COOKIE, signToken(user._id), {
            ...cookieOptions(),
            maxAge: TOKEN_MAX_AGE,
        });

        return res.status(200).json({ user: publicUser(user) });
    } catch (error) {
        console.error("Error while calling googleLogin", error);
        return res.status(401).json({ message: "Google sign-in failed" });
    }
};

export const getMe = async (req, res) => {
    return res.status(200).json({ user: publicUser(req.user) });
};

export const logout = async (req, res) => {
    res.clearCookie(TOKEN_COOKIE, cookieOptions());
    return res.status(200).json({ message: "Logged out" });
};
