import { useNavigate } from "react-router-dom";
import { logIn } from "../services/auth-service";
import { getDashboardHomeUrl } from "../utils/urls";

const LoginPage = () => {
  const navigate = useNavigate();

  const onLogInClick = () => {
    logIn();
    navigate(getDashboardHomeUrl());
  };

  return (
    <div>
      <button onClick={onLogInClick}>Log in</button>
    </div>
  );
};

export { LoginPage };
