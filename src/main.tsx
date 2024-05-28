import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login-page.tsx";
import { LeaderboardPage } from "./pages/leaderboard-page.tsx";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-west-2_JwWpg0O8l",
      userPoolClientId: "fe5g7q4n3ftb34ckaqv0r4q05",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
