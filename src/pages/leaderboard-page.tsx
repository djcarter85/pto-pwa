import { z } from "zod";
import { useData } from "../hooks/use-data";
import { useParams } from "react-router-dom";

const leaderboardPageSchema = z.object({
  leaderboard: z.array(
    z.object({
      rank: z.number(),
      rankIsShared: z.boolean(),
      player: z.object({ id: z.string(), name: z.string() }),
      matchesPredicted: z.number(),
      totalPoints: z.number(),
    }),
  ),
});

const safeDivide = (points: number, matchesPredicted: number) => {
  if (matchesPredicted === 0) {
    return 0;
  }
  return points / matchesPredicted;
};

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
      <table className="mb-4 mt-1 w-full">
        <thead>
          <tr>
            <th className="p-1 text-center">#</th>
            <th className="p-1 text-left">Player</th>
            <th className="p-1 text-center">MP</th>
            <th className="p-1 text-center">Pts</th>
            <th className="p-1 text-center">Avg</th>
          </tr>
        </thead>
        <tbody>
          {data.leaderboard.map((l) => (
            <tr key={l.player.id} className="odd:bg-gray-200">
              <td className="p-1 text-center">
                {l.rank}
                {l.rankIsShared && "="}
              </td>
              <td className="p-1">{l.player.name}</td>
              <td className="p-1 text-center">{l.matchesPredicted}</td>
              <td className="p-1 text-center">{l.totalPoints}</td>
              <td className="p-1 text-center">
                {safeDivide(l.totalPoints, l.matchesPredicted).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { LeaderboardPage };
