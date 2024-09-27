import { useNavigate } from "react-router-dom";
import { logIn } from "../services/auth-service";
import { getDashboardHomeUrl } from "../utils/urls";
import { useState } from "react";

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
      <form onSubmit={onLogInClick}>
        <div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </main>
  );
};

export { LoginPage };
