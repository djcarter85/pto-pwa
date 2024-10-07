import { useQuery } from "@tanstack/react-query";
import { getPredictionsPage } from "../../services/pto-api-service";
import { Loading } from "../../components/loading";
import { Header } from "../../components/header";
import { PersonFill } from "react-bootstrap-icons";

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
      <div>
        <PersonFill />
        {data.player.name}
      </div>
      <div>
        {data.matchGroups.map((mg) => (
          <div key={mg.date}>
            <div>{mg.date}</div>
            {mg.matchPredictions.map((mp) => (
              <div key={mp.match.id}>{mp.match.homeTeam.name} vs {mp.match.awayTeam.name}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
