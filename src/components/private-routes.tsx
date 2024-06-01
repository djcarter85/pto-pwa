import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { getLoginUrl } from "../utils/urls";

const PrivateRoutes = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return token ? <Outlet /> : <Navigate to={getLoginUrl()} />;
};

export { PrivateRoutes };
