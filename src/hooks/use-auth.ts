import { JWT, fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<JWT | undefined>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await fetchAuthSession();
      setToken(session.tokens?.idToken);
      setIsLoading(false);
    };
    fetchSession();
  });

  return { token, isLoading, isLoggedIn: !!token };
};

export { useAuth };
