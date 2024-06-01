import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login-page.tsx";
import { LeaderboardPage } from "./pages/leaderboard-page.tsx";
import { PrivateRoutes } from "./components/private-routes.tsx";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/700.css";
import { TournamentLayout } from "./layouts/tournament-layout.tsx";
import { PredictionsPage } from "./pages/predictions-page.tsx";
import { HomePage } from "./pages/home-page.tsx";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-west-2_JwWpg0O8l",
      userPoolClientId: "fe5g7q4n3ftb34ckaqv0r4q05",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/tournament/:tournamentCode"
            element={<TournamentLayout />}
          >
            <Route path="home" element={<HomePage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="predictions" element={<PredictionsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
