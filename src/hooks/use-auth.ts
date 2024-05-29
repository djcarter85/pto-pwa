import { JWT, fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState<JWT | undefined>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await fetchAuthSession();
      setToken(session.tokens?.idToken);
    };
    fetchSession();
  });

  return { token };
};

export { useAuth };
