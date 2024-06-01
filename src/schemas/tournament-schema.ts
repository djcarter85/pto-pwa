import { z } from "zod";

const tournamentSchema = z.object({ code: z.string(), name: z.string() });

export { tournamentSchema };
