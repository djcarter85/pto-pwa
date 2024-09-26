import { useQuery } from "@tanstack/react-query";
import { getPredictionsPage } from "../../services/pto-api-service";

export const PredictionsPage = () => {
  const { data, error } = useQuery({
    queryKey: ["predictions"],
    queryFn: getPredictionsPage,
  });

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (!data) {
    return <div>loading ...</div>;
  }

  return <div>{data.player.name}</div>;
};
