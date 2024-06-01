import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useTournaments } from "../hooks/use-tournaments";
import { getTournamentHomeUrl } from "../utils/urls";

const Input = ({
  type,
  placeholder,
  value,
  setValue,
}: {
  type: "email" | "password";
  placeholder: string;
  value: string;
  setValue: (v: string) => void;
}) => {
  return (
    <input
      className="w-full rounded border border-gray-900/40 px-3 py-2"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
};

const PostLogin = () => {
  const { tournaments } = useTournaments();

  if (!tournaments) {
    return <div>loading ...</div>;
  }

  return (
    <Navigate to={getTournamentHomeUrl(tournaments.currentTournament.code)} />
  );
};

const LoginPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const { isLoggedIn: isAlreadyLoggedIn } = useAuth();

  if (isAlreadyLoggedIn || hasLoggedIn) {
    return <PostLogin />;
  }

  const logIn = async () => {
    await signIn({ username: emailAddress, password: password });
    setHasLoggedIn(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center">
      <div className="mx-auto my-8 flex w-96 max-w-full flex-col items-center gap-4 rounded-lg border border-gray-900/20 bg-white p-8 shadow-xl">
        <img src="/android-chrome-512x512.png" className="w-24 rounded-2xl" />
        <Input
          type="email"
          placeholder="Email"
          value={emailAddress}
          setValue={setEmailAddress}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <input
          type="submit"
          className="w-full rounded bg-blue-900 p-2 font-bold text-white hover:bg-blue-600"
          onClick={(e) => {
            e.preventDefault();
            logIn();
          }}
          value="Log in"
        />
      </div>
    </div>
  );
};

export { LoginPage };
