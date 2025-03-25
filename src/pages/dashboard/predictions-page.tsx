import { useQuery } from "@tanstack/react-query";
import { getPredictionsPage } from "../../services/pto-api-service";
import { Loading } from "../../components/loading";
import { Header } from "../../components/header";
import { PersonFill } from "react-bootstrap-icons";
import { formatDate } from "../../utils/formats";

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
        roundName={data.round?.name}
      />
      <div className="my-2 flex flex-row items-center gap-x-2 px-2 text-lg">
        <PersonFill />
        <span>{data.player.name}</span>
      </div>
      <div>
        {data.matchGroups
          .toSorted((a, b) => a.date.toUnixInteger() - b.date.toUnixInteger())
          .map((mg) => (
            <div key={mg.date.toISO()}>
              <div className="my-2 px-1 text-center text-lg font-bold">
                {formatDate(mg.date)}
              </div>
              {mg.matchPredictions.toSorted((a, b)=> a.match.kickoff.toUnixInteger() - b.match.kickoff.toUnixInteger()).map((mp) => (
                <div
                  key={mp.match.id}
                  className="my-1 grid grid-cols-[1fr_auto_auto] items-center gap-x-3 gap-y-2 bg-neutral-100 px-3 py-2"
                >
                  <Team team={mp.match.homeTeam} />
                  <ScoreValue score={mp.predictedScore?.home} />
                  <ScoreValue score={mp.match.finalScore?.home} />
                  <Team team={mp.match.awayTeam} />
                  <ScoreValue score={mp.predictedScore?.away} />
                  <ScoreValue score={mp.match.finalScore?.away} />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};
