import { useQuery } from "@tanstack/react-query";
import { getLeaderboardPage } from "../../services/pto-api-service";
import cx from "classix";
import { Loading } from "../../components/loading";
import { Header } from "../../components/header";

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
      <Header
        tournamentName={data.tournament.shortName}
        roundName={data.round?.shortName ?? "Overall"}
      />
      <table className="mb-3 w-full">
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
            <tr key={x.player.id} className="odd:bg-neutral-50">
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
