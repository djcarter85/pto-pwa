import { useQuery } from "@tanstack/react-query";
import { getLeaderboardPage } from "../../services/pto-api-service";

export const LeaderboardPage = () => {
  const { data, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboardPage,
  });

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (!data) {
    return <div>loading ...</div>;
  }

  return (
    <div>
      {data.leaderboard.map((x) => (
        <p key={x.player.id}>
          {x.player.name}, {x.totalPoints} pts
        </p>
      ))}
    </div>
  );
};
