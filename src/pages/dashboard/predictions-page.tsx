import { useQuery } from "@tanstack/react-query";
import { getPredictionsPage } from "../../services/pto-api-service";
import { Loading } from "../../components/loading";
import { Header } from "../../components/header";
import { PersonFill } from "react-bootstrap-icons";
import { Fragment } from "react";
import { formatDate } from "../../utils/formats";

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
      <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2">
        {data.matchGroups.map((mg) => (
          <div
            key={mg.date.toISO()}
            className="col-span-3 grid grid-cols-subgrid"
          >
            <div className="col-span-3 my-2 px-1 text-center text-lg font-bold">
              {formatDate(mg.date)}
            </div>
            {mg.matchPredictions.map((mp) => (
              <Fragment key={mp.match.id}>
                <div className="px-1 text-right">{mp.match.homeTeam.name}</div>
                <div className="px-1 text-center">
                  {mp.predictedScore ? (
                    <span>
                      {mp.predictedScore.home}-{mp.predictedScore.away}
                    </span>
                  ) : (
                    <>&nbsp;</>
                  )}
                </div>
                <div className="px-1 text-left">{mp.match.awayTeam.name}</div>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
