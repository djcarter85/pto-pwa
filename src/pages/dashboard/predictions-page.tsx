import { useQuery } from "@tanstack/react-query";
import { getPredictionsPage } from "../../services/pto-api-service";
import { Loading } from "../../components/loading";
import { formatDate } from "../../utils/formats";
import { Fragment } from "react";
import { Header } from "../../components/header";

const TeamImage = ({ teamId }: { teamId: number }) => {
  return <img src={`/assets/teams/logo-${teamId}.svg`} className="size-8" />;
};

const ScoreValue = ({ score }: { score?: number }) => {
  return (
    <div className="flex size-8 items-center justify-center rounded-md bg-neutral-100">
      <span>{score ?? ""}</span>
    </div>
  );
};

const getPointsText = (points: number | null) => {
  if (points === null) {
    return null;
  }

  if (points === 1) {
    return "1 pt";
  }

  return `${points} pts`;
};

export const PredictionsPage = () => {
  const { data, error } = useQuery({
    queryKey: ["predictions"],
    queryFn: getPredictionsPage,
  });

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <Header
        tournamentName={data.tournament.name}
        roundName={data.round.name}
        playerName={data.player.name}
      />
      <div className="my-2 grid grid-cols-[auto_1fr_auto_auto_auto] gap-y-4">
        {data.matchGroups
          .toSorted((a, b) => a.date.toUnixInteger() - b.date.toUnixInteger())
          .map((mg) => (
            <Fragment key={mg.date.toISO()}>
              <div className="col-span-5 text-center text-lg">
                {formatDate(mg.date)}
              </div>
              {mg.matchPredictions
                .toSorted(
                  (a, b) =>
                    a.match.kickoff.toUnixInteger() -
                    b.match.kickoff.toUnixInteger(),
                )
                .map((mp) => (
                  <div
                    key={mp.match.id}
                    className="col-span-5 grid grid-cols-subgrid items-center gap-x-3 gap-y-2 px-3 py-2"
                  >
                    <TeamImage teamId={mp.match.homeTeam.id} />
                    <div>{mp.match.homeTeam.name}</div>
                    <ScoreValue score={mp.predictedScore?.home} />
                    <ScoreValue score={mp.match.finalScore?.home} />
                    <div className="text-center text-sm">
                      {mp.match.kickoff.toFormat("HH:mm")}
                    </div>
                    <TeamImage teamId={mp.match.awayTeam.id} />
                    <div>{mp.match.awayTeam.name}</div>
                    <ScoreValue score={mp.predictedScore?.away} />
                    <ScoreValue score={mp.match.finalScore?.away} />
                    <div className="text-center text-sm">
                      {getPointsText(mp.points)}
                    </div>
                  </div>
                ))}
            </Fragment>
          ))}
      </div>
    </div>
  );
};
