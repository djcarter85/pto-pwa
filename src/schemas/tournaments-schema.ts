import { z } from "zod";
import { tournamentSchema } from "./tournament-schema";

const tournamentsSchema = z.object({
  tournaments: z.array(tournamentSchema),
  currentTournament: tournamentSchema,
});

export { tournamentsSchema };
