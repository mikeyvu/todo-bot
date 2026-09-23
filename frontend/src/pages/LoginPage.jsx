import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
    const { user, loading, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (!loading && user) {
        return <Navigate to="/" replace />;
    }

    const handleSuccess = async (credentialResponse) => {
        try {
            await loginWithGoogle(credentialResponse.credential);
            toast.success("Signed in");
            navigate(location.state?.from?.pathname || "/", { replace: true });
        } catch (error) {
            console.error("Error while signing in with Google", error);
            toast.error("Google sign-in failed");
        }
    };

    return (
        <div className="min-h-screen w-full relative">
            {/* Dark Horizon Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
                }}
            />
            <div className="container flex min-h-screen items-center justify-center pt-8 mx-auto relative z-10">
                <div className="w-full max-w-md p-6 space-y-6">
                    <Header />

                    <Card>
                        <CardHeader>
                            <CardTitle>Sign in to continue</CardTitle>
                            <CardDescription>
                                Use your Google account to see your own tasks.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => toast.error("Google sign-in failed")}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
