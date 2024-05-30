import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";

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
      className="rounded border border-gray-500/80 px-3 py-2"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
};

const LoginPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = async () => {
    await signIn({ username: emailAddress, password: password });
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Navigate to="/leaderboard" />;
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center">
      <div className="mx-auto my-8 flex w-96 flex-col gap-4 rounded-lg border border-gray-900/20 bg-white p-8 shadow-xl">
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
          className="rounded bg-sky-500 p-2 font-bold text-sky-50 hover:bg-sky-600"
          onClick={(e) => {
            e.preventDefault();
            logIn();
          }}
          value="Log in ..."
        />
      </div>
    </div>
  );
};

export { LoginPage };
