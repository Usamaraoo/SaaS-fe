import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

export const SubProtectedRoute = () => {
    const { user } = useAuth();


    if (user && user.accessLevel === 0) {
        return <Navigate to="/plans" replace />;
    }

    return <Outlet />;
};