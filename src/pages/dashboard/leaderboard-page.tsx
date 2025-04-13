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
      <div className="mb-3 grid w-full grid-cols-[auto_1fr_auto_auto_auto] gap-x-3">
        {data.leaderboard.map((x) => (
          <div
            key={x.player.id}
            className="even:bg-base-200 col-span-5 grid grid-cols-subgrid"
          >
            <div className="py-1 pl-3 text-left">
              {x.rank}
              {x.rankIsShared && "="}
            </div>
            <div
              className={cx(
                "py-1 text-left font-semibold",
                x.player.isHuman || "italic",
              )}
            >
              {x.player.name}
            </div>
            <div className="text-primary py-0.5 text-center">
              <span className="text-lg font-bold">{x.totalPoints}</span>
              <span className="text-neutral/50 pl-1 text-xs">pts</span>
            </div>
            <div className="py-1 text-center">
              <span className="">{x.matchesPredicted}</span>
              <span className="text-neutral/50 pl-1 text-xs">m</span>
            </div>
            <div className="py-1 pr-3 text-center">
              <span>{x.pointsPerMatch.toFixed(2)}</span>
              <span className="text-neutral/50 pl-1 text-xs">avg</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
