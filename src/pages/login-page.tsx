import { useNavigate } from "react-router-dom";
import { logIn } from "../services/auth-service";
import { getDashboardHomeUrl } from "../utils/urls";
import { useState } from "react";
import { Container } from "../components/container";
import { Input } from "../components/input";
import logo from "../assets/logo.png";
import { Button } from "../components/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLogInClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const result = await logIn(email, password);
    if (result) {
      navigate(getDashboardHomeUrl());
    }
  };

  return (
    <main className="py-safe">
      <Container className="flex min-h-dvh flex-col justify-center space-y-4 px-6">
        <div className="flex justify-center">
          <img src={logo} className="size-24 rounded-lg" />
        </div>
        <div>
          <Input
            id="email"
            type="email"
            defaultValue=""
            onValueChanged={setEmail}
            autoComplete="email"
            placeholder="Email"
            required={true}
            className="block w-full px-3 py-1.5"
          />
        </div>

        <div>
          <Input
            id="password"
            type="password"
            defaultValue=""
            onValueChanged={setPassword}
            autoComplete="current-password"
            placeholder="Password"
            required={true}
            className="block w-full px-3 py-1.5"
          />
        </div>

        <div>
          <Button text="Log in" onClick={onLogInClick} className="w-full" />
        </div>
      </Container>
    </main>
  );
};

export { LoginPage };
