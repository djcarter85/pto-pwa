import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { NonPrivateRoutes, PrivateRoutes } from "./components/routes";
import { LoginPage } from "./pages/login-page";
import {
  getDashboardHomeUrl,
  getLoginUrl,
  getDashboardLeaderboardUrl,
} from "./utils/urls";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/dashboard/home-page";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { LeaderboardPage } from "./pages/dashboard/leaderboard-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to={getLoginUrl()} />} />
      <Route element={<NonPrivateRoutes />}>
        <Route path={getLoginUrl()} element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route element={<DashboardLayout />}>
          <Route path={getDashboardHomeUrl()} element={<HomePage />} />
          <Route
            path={getDashboardLeaderboardUrl()}
            element={<LeaderboardPage />}
          />
        </Route>
      </Route>
      <Route path="*" element={<div>404 not found</div>} />
    </>,
  ),
);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
