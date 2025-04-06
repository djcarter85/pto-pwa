import { useQuery } from "@tanstack/react-query";
import { getLeaderboardPage } from "../../services/pto-api-service";
import cx from "classix";
import { Loading } from "../../components/loading";
import { Header } from "../../components/header";
import { Fragment } from "react";

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
        <div className="py-1 pl-3 text-left">#</div>
        <div className="py-1 text-left">Player</div>
        <div className="py-1 text-center">MP</div>
        <div className="py-1 text-center">PTS</div>
        <div className="py-1 pr-3 text-center">AVG</div>
        {data.leaderboard.map((x) => (
          <Fragment key={x.player.id}>
            <div className="py-1 pl-3 text-left">
              {x.rank}
              {x.rankIsShared && "="}
            </div>
            <div
              className={cx(
                "py-0.5 text-left text-lg",
                x.player.isHuman || "italic",
              )}
            >
              {x.player.name}
            </div>
            <div className="py-1 text-center">{x.matchesPredicted}</div>
            <div className="text-primary-700 py-0.5 text-center text-lg font-bold">
              {x.totalPoints}
            </div>
            <div className="py-1 pr-3 text-center">
              {x.pointsPerMatch.toFixed(2)}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
