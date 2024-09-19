import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PrivateRoutes } from "./components/private-routes";
import { LoginPage } from "./pages/login-page";
import { getDashboardHomeUrl, getLoginUrl } from "./utils/urls";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to={getLoginUrl()} />} />
      <Route path={getLoginUrl()} element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path={getDashboardHomeUrl()} element={<div>home</div>} />
      </Route>
      <Route path="*" element={<div>404 not found</div>} />
    </>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
