import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const PrivateRoutes = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRoutes };
