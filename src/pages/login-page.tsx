import { useNavigate } from "react-router-dom";
import { logIn } from "../services/auth-service";
import { getDashboardHomeUrl } from "../utils/urls";
import { useState } from "react";
import { Container } from "../components/container";
import { Input } from "../components/input";
import logo from "../assets/logo.png";

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
      <Container className="flex min-h-dvh flex-col justify-center px-6">
        <form onSubmit={onLogInClick} className="space-y-4">
          <div className="flex justify-center">
            <img src={logo} className="size-24 rounded-lg" />
          </div>
          <div>
            <Input
              id="email"
              type="email"
              value={email}
              setValue={setEmail}
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
              value={password}
              setValue={setPassword}
              autoComplete="current-password"
              placeholder="Password"
              required={true}
              className="block w-full px-3 py-1.5"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Log in
            </button>
          </div>
        </form>
      </Container>
    </main>
  );
};

export { LoginPage };
