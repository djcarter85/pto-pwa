import { useQuery } from "@tanstack/react-query";
import { getPredictionsPage } from "../../services/pto-api-service";
import { Loading } from "../../components/loading";
import { formatDate } from "../../utils/formats";
import { Fragment } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { DateTime } from "luxon";

const TeamImage = ({ teamId }: { teamId: number }) => {
  return <img src={`/assets/teams/logo-${teamId}.svg`} className="size-8" />;
};

const TeamName = ({ teamName }: { teamName: string }) => {
  return <div className="text-lg">{teamName}</div>;
};

const ScoreInput = ({
  type,
  matchId,
  initialValue,
}: {
  type: string;
  matchId: string;
  initialValue?: number;
}) => {
  return (
    <Input
      id={`pred-${type}-${matchId}`}
      type="number"
      inputMode="numeric"
      defaultValue={initialValue}
      onValueChanged={() => {}}
      min={0}
      max={10}
      className="size-9 text-center"
    />
  );
};

const ScoreValue = ({ score }: { score?: number }) => {
  return (
    <div className="flex size-9 items-center justify-center rounded-md bg-neutral-100">
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

const MatchBlock = ({
  matchPrediction,
}: {
  matchPrediction: {
    match: {
      id: string;
      homeTeam: { id: number; name: string };
      awayTeam: { id: number; name: string };
      kickoff: DateTime;
      finalScore: {
        home: number;
        away: number;
      } | null;
    };
    predictedScore: {
      home: number;
      away: number;
    } | null;
    points: number | null;
  };
}) => {
  return (
    <div className="col-span-5 grid grid-cols-subgrid items-center gap-x-3 gap-y-1 px-3 py-2">
      <TeamImage teamId={matchPrediction.match.homeTeam.id} />
      <TeamName teamName={matchPrediction.match.homeTeam.name} />
      <ScoreInput
        type="home"
        matchId={matchPrediction.match.id}
        initialValue={matchPrediction.predictedScore?.home}
      />
      <ScoreValue score={matchPrediction.match.finalScore?.home} />
      <div className="text-center text-sm">
        {matchPrediction.match.kickoff.toFormat("HH:mm")}
      </div>
      <TeamImage teamId={matchPrediction.match.awayTeam.id} />
      <TeamName teamName={matchPrediction.match.awayTeam.name} />
      <ScoreInput
        type="away"
        matchId={matchPrediction.match.id}
        initialValue={matchPrediction.predictedScore?.away}
      />
      <ScoreValue score={matchPrediction.match.finalScore?.away} />
      <div className="text-center text-sm">
        {getPointsText(matchPrediction.points)}
      </div>
    </div>
  );
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
        tournamentName={data.tournament.shortName}
        roundName={data.round.shortName}
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
                  <MatchBlock key={mp.match.id} matchPrediction={mp} />
                ))}
            </Fragment>
          ))}
      </div>
    </div>
  );
};
