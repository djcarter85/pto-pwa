import { signIn } from "aws-amplify/auth";
import { useState } from "react";

const LoginPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    await signIn({ username: emailAddress, password: password });
  };

  return (
    <div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={emailAddress}
          onChange={(ev) => setEmailAddress(ev.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <div>
        <input
          type="submit"
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
