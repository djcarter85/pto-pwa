import { useQuery } from "@tanstack/react-query";
import { getPredictionsPage } from "../../services/pto-api-service";
import { Loading } from "../../components/loading";
import { formatDate } from "../../utils/formats";
import { Fragment } from "react";
import { Header } from "../../components/header";

const Team = ({ team }: { team: { id: number; name: string } }) => {
  return (
    <div className="inline-flex flex-row items-center gap-2">
      <img src={`/assets/teams/logo-${team.id}.svg`} className="size-8" />
      <div>{team.name}</div>
    </div>
  );
};

const ScoreValue = ({ score }: { score?: number }) => {
  return (
    <div className="flex size-8 items-center justify-center rounded-md bg-neutral-200">
      <span>{score ?? ""}</span>
    </div>
  );
};

const getPointsText = (points?: number) => {
  if (points === undefined) {
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
      <div className="my-2 grid grid-cols-[1fr_auto_auto_auto]">
        {data.matchGroups
          .toSorted((a, b) => a.date.toUnixInteger() - b.date.toUnixInteger())
          .map((mg) => (
            <Fragment key={mg.date.toISO()}>
              <div className="col-span-4 my-2 px-1 text-center text-lg">
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
                    className="col-span-4 my-1 grid grid-cols-subgrid items-center gap-x-3 gap-y-2 bg-neutral-100 px-3 py-2"
                  >
                    <Team team={mp.match.homeTeam} />
                    <ScoreValue score={mp.predictedScore?.home} />
                    <ScoreValue score={mp.match.finalScore?.home} />
                    <div className="text-center text-sm">
                      {mp.match.kickoff.toFormat("HH:mm")}
                    </div>
                    <Team team={mp.match.awayTeam} />
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
