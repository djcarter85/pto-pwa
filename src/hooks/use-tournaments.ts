import { z } from "zod";
import { useData } from "./use-data";

const tournamentSchema = z.object({ code: z.string(), name: z.string() });

const tournamentsSchema = z.object({
  tournaments: z.array(tournamentSchema),
  currentTournament: tournamentSchema,
});

const useTournaments = () => {
  const { data } = useData("/tournaments", tournamentsSchema);
  return { tournaments: data };
};

export { useTournaments };
