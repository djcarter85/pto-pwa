import { useQuery } from "@tanstack/react-query";
import { getPredictionsPage } from "../../services/pto-api-service";
import { Loading } from "../../components/loading";
import { ClockFill, PersonFill, TrophyFill } from "react-bootstrap-icons";
import { formatDate } from "../../utils/formats";
import { Fragment, ReactNode } from "react";

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

const Foo = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex size-8 items-center justify-center rounded-full bg-blue-800 text-neutral-100">
      {children}
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
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 border-b border-b-neutral-600 px-4 py-4 text-lg">
        <Foo>
          <TrophyFill />
        </Foo>
        <div>{data.tournament.name}</div>
        <Foo>
          <ClockFill />
        </Foo>
        <div>{data.round.name}</div>
        <Foo>
          <PersonFill />
        </Foo>
        <div>{data.player.name}</div>
      </div>
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
