import { z } from "zod";
import { useData } from "../hooks/use-data";
import { useParams } from "react-router-dom";

const leaderboardPageSchema = z.object({
  leaderboard: z.array(
    z.object({
      rank: z.number(),
      player: z.object({ id: z.string(), name: z.string() }),
      totalPoints: z.number(),
    }),
  ),
});

const LeaderboardPage = () => {
  const { tournamentCode } = useParams();

  const { data } = useData(
    `/leaderboardPage?tournamentCode=${tournamentCode}`,
    leaderboardPageSchema,
  );

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
