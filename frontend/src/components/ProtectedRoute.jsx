import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen" />;
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
