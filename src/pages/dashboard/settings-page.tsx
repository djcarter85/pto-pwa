import { getAccountPage } from "../../services/pto-api-service";
import { useQuery } from "@tanstack/react-query";
import { logOut } from "../../services/auth-service";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Loading } from "../../components/loading";

export const SettingsPage = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const { data, error } = useQuery({
    queryKey: ["account"],
    queryFn: getAccountPage,
  });

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (!data) {
    return <Loading />;
  }

  const onLogOut = () => {
    logOut();
    setRedirectToLogin(true);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div>
        <span>You are logged in as {data.emailAddress}</span>
      </div>
      <div>
        <button
          className="rounded-sm bg-blue-800 px-4 py-2 text-blue-50 hover:bg-blue-900"
          onClick={onLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};
