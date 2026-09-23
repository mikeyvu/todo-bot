import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verifies signature, issuer, audience and expiry against Google's public keys.
// Throws if the credential is invalid, expired, or was minted for a different client.
export const verifyGoogleIdToken = async (credential) => {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email_verified) {
        throw new Error("Google account email is not verified");
    }

    return {
        googleId: payload.sub, // stable, never reused — the real identity key
        email: payload.email,
        name: payload.name || "",
        picture: payload.picture || "",
    };
};
