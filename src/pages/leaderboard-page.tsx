import { useAuth } from "../hooks/use-auth";

const LeaderboardPage = () => {
  const { token } = useAuth();

  return (
    <div>
      <div>LeaderboardPage</div>
      <div>Token: {token?.toString()}</div>
    </div>
  );
};

export { LeaderboardPage };
