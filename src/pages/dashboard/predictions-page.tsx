import { useQuery } from "@tanstack/react-query";
import {
  getPredictionsPage,
  postPredictions,
} from "../../services/pto-api-service";
import { Loading } from "../../components/loading";
import { formatDate } from "../../utils/formats";
import { Fragment, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { ArrowRepeat, Check } from "react-bootstrap-icons";
import { z } from "zod";
import { matchSchema } from "../../services/schema-service";

const TeamImage = ({ teamId }: { teamId: number }) => {
  return <img src={`/assets/teams/logo-${teamId}.svg`} className="size-8" />;
};

const TeamName = ({ teamName }: { teamName: string }) => {
  return <div className="text-lg">{teamName}</div>;
};

const StatusIndicator = ({ match }: { match: z.infer<typeof matchSchema> }) => {
  if (match.finalScore) {
    return (
      <div className="flex flex-row items-center justify-center gap-x-2 text-sm">
        <div aria-label="success" className="status status-success"></div>
        <div>FT</div>
      </div>
    );
  }

  if (match.currentScore) {
    return (
      <div className="flex flex-row items-center justify-center gap-x-2 text-sm">
        <div aria-label="info" className="inline-grid *:[grid-area:1/1]">
          <div className="status status-info animate-ping"></div>
          <div className="status status-info"></div>
        </div>
        <div>L</div>
      </div>
    );
  }

  return (
    <div className="text-center text-sm">{match.kickoff.toFormat("HH:mm")}</div>
  );
};

const ScoreInput = ({
  type,
  matchId,
  initialValue,
  onValueChanged,
}: {
  type: string;
  matchId: string;
  initialValue?: number;
  onValueChanged: (value: number) => void;
}) => {
  return (
    <Input
      id={`pred-${type}-${matchId}`}
      type="number"
      inputMode="numeric"
      defaultValue={initialValue}
      onValueChanged={(v) => {
        const parsedValue = parseInt(v);
        if (!isNaN(parsedValue)) {
          onValueChanged(parsedValue);
        }
      }}
      min={0}
      max={10}
      className="size-9 text-center"
    />
  );
};

const ScoreValue = ({ score }: { score?: number }) => {
  return (
    <div className="bg-base-200 flex size-9 items-center justify-center rounded-md">
      <span>{score ?? ""}</span>
    </div>
  );
};

const PointsIndicator = ({ points }: { points: number | null }) => {
  if (points === null) {
    return null;
  }

  const plural = points !== 1;

  return (
    <div className="flex flex-row items-baseline justify-center gap-x-1">
      <div className="font-semibold text-lg">{points}</div>
      <div className="text-base-content/50 text-sm font-semibold">pt{plural && "s"}</div>
    </div>
  );
};

const SaveIndicator = ({ status }: { status: "SAVING" | "SAVED" }) => {
  switch (status) {
    case "SAVING":
      return (
        <div className="text-info flex justify-center text-2xl">
          <ArrowRepeat className="animate-spin" />
        </div>
      );
    case "SAVED":
      return (
        <div className="text-success flex justify-center text-2xl">
          <Check />
        </div>
      );
  }
};

const MatchBlock = ({
  matchPrediction,
  playerId,
}: {
  matchPrediction: {
    match: z.infer<typeof matchSchema>;
    predictedScore: {
      home: number;
      away: number;
    } | null;
    points: number | null;
  };
  playerId: string;
}) => {
  const [saveStatus, setSaveStatus] = useState<"SAVING" | "SAVED" | undefined>(
    undefined,
  );

  // No need to use state, as we don't need to re-render uncontrolled components.
  let home = matchPrediction.predictedScore?.home;
  let away = matchPrediction.predictedScore?.away;

  const savePredictionIfValid = async () => {
    if (home !== undefined && away != undefined) {
      // TODO: handle errors
      setSaveStatus("SAVING");
      await postPredictions(playerId, matchPrediction.match.id, home, away);
      setSaveStatus("SAVED");
    }
  };

  return (
    <div className="col-span-5 grid grid-cols-subgrid items-center gap-x-3 gap-y-1 px-3 py-2">
      <TeamImage teamId={matchPrediction.match.homeTeam.id} />
      <TeamName teamName={matchPrediction.match.homeTeam.name} />
      <ScoreInput
        type="home"
        matchId={matchPrediction.match.id}
        initialValue={matchPrediction.predictedScore?.home}
        onValueChanged={async (v) => {
          home = v;
          await savePredictionIfValid();
        }}
      />
      <ScoreValue score={matchPrediction.match.finalScore?.home} />
      <StatusIndicator match={matchPrediction.match} />
      <TeamImage teamId={matchPrediction.match.awayTeam.id} />
      <TeamName teamName={matchPrediction.match.awayTeam.name} />
      <ScoreInput
        type="away"
        matchId={matchPrediction.match.id}
        initialValue={matchPrediction.predictedScore?.away}
        onValueChanged={async (v) => {
          away = v;
          await savePredictionIfValid();
        }}
      />
      <ScoreValue score={matchPrediction.match.finalScore?.away} />
      <div className="text-center">
        {saveStatus ? (
          <SaveIndicator status={saveStatus} />
        ) : (
          <PointsIndicator points={matchPrediction.points} />
        )}
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
                  <MatchBlock
                    key={mp.match.id}
                    matchPrediction={mp}
                    playerId={data.player.id}
                  />
                ))}
            </Fragment>
          ))}
      </div>
    </div>
  );
};
