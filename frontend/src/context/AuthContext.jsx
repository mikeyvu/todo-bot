import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // "still deciding" — NOT "logged out"

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await api.get("/auth/me");
                if (!cancelled) setUser(res.data.user);
            } catch {
                if (!cancelled) setUser(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const onUnauthorized = () => setUser(null);
        window.addEventListener("auth:unauthorized", onUnauthorized);
        return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
    }, []);

    const loginWithGoogle = useCallback(async (credential) => {
        const res = await api.post("/auth/google", { credential });
        setUser(res.data.user);
        return res.data.user;
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post("/auth/logout");
        } finally {
            window.google?.accounts?.id?.disableAutoSelect();
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
