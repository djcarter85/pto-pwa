import { useData } from "./use-data";
import { tournamentsSchema } from "../schemas/tournaments-schema";

const useTournaments = () => {
  const { data } = useData("/tournaments", tournamentsSchema);
  return { tournaments: data };
};

export { useTournaments };
