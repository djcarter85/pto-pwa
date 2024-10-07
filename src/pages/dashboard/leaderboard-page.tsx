import { useQuery } from "@tanstack/react-query";
import { getLeaderboardPage } from "../../services/pto-api-service";
import cx from "classix";
import { Loading } from "../../components/loading";

export const LeaderboardPage = () => {
  const { data, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboardPage,
  });

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="px-3 py-3 text-center bg-gradient-to-br from-blue-800 to-blue-700 text-blue-50">
        <div className="text-2xl font-bold">{data.tournament.name}</div>
        <div className="text-lg">{data.round?.name ?? "Overall"}</div>
      </div>
      <table className="w-full mb-3">
        <thead>
          <tr className="">
            <th className="px-3 py-1 text-left">#</th>
            <th className="px-3 py-1 text-left">Player</th>
            <th className="px-3 py-1 text-center">MP</th>
            <th className="px-3 py-1 text-center">PTS</th>
            <th className="px-3 py-1 text-center">AVG</th>
          </tr>
        </thead>
        <tbody>
          {data.leaderboard.map((x) => (
            <tr key={x.player.id} className="odd:bg-neutral-100">
              <td className="px-3 py-1 text-left">
                {x.rank}
                {x.rankIsShared && "="}
              </td>
              <td
                className={cx(
                  "px-3 py-1 text-left",
                  x.player.isHuman || "italic",
                )}
              >
                {x.player.name}
              </td>
              <td className="px-3 py-1 text-center">{x.matchesPredicted}</td>
              <td className="px-3 py-1 text-center">{x.totalPoints}</td>
              <td className="px-3 py-1 text-center">
                {x.pointsPerMatch.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
