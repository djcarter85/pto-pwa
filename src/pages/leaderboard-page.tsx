import { useEffect, useState } from "react";
import { z } from "zod";
import { fetchAuthSession } from "aws-amplify/auth";

const schema = z.object({
  leaderboard: z.array(
    z.object({
      rank: z.number(),
      player: z.object({ id: z.string(), name: z.string() }),
      totalPoints: z.number(),
    }),
  ),
});

const useLeaderboardData = () => {
  const [data, setData] = useState<z.infer<typeof schema> | null>(null);

  useEffect(() => {
    const getData = async () => {
      const session = await fetchAuthSession();

      const response = await fetch(
        "https://api.pto.football/leaderboardPage?roundCode=pl2324-38",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${session.tokens?.idToken}` },
        },
      );

      if (response.status === 200) {
        const json = await response.json();
        setData(schema.parse(json));
      }
    };

    getData();
  }, []);

  return { data };
};

const LeaderboardPage = () => {
  const { data } = useLeaderboardData();

  if (!data) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div>LeaderboardPage</div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.leaderboard.map((l) => (
            <tr key={l.player.id}>
              <td>{l.rank}</td>
              <td>{l.player.name}</td>
              <td>{l.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { LeaderboardPage };
