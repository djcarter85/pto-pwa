import { z } from "zod";
import { tournamentsSchema } from "../schemas/tournaments-schema";

type Tournaments = z.infer<typeof tournamentsSchema>;

export type { Tournaments };
