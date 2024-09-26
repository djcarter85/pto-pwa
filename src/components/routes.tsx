import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../services/auth-service";
import { getDashboardHomeUrl, getLoginUrl } from "../utils/urls";

const PrivateRoutes = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={getLoginUrl()} />;
};

const NonPrivateRoutes = () => {
  return isLoggedIn() ? <Navigate to={getDashboardHomeUrl()} /> : <Outlet />;
};

export { PrivateRoutes, NonPrivateRoutes };
