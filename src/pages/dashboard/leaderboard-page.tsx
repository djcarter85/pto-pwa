import { useQuery } from "@tanstack/react-query";
import { getLeaderboardPage } from "../../services/pto-api-service";
import cx from "classix";

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
    <div className="my-4">
      <table className="w-full">
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
                className={cx("px-3 py-1 text-left", x.player.isHuman || "italic")}
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
