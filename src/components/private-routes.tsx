import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../services/auth-service";
import { getLoginUrl } from "../utils/urls";

const PrivateRoutes = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={getLoginUrl()} />;
};

export { PrivateRoutes };
