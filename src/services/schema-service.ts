import { z } from "zod";
import { DateTime } from "luxon";

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  isHuman: z.boolean(),
});

export const dateSchema = z
  .string()
  .transform((x) => DateTime.fromISO(x))
  .refine((d) => d.isValid, "Invalid DateTime.");

export const dateTimeUtcSchema = z
  .string()
  .transform((x) => DateTime.fromISO(x))
  .refine((d) => d.isValid, "Invalid DateTime.");

export const scoreSchema = z.object({
  home: z.number(),
  away: z.number(),
});

export const tournamentSchema = z.object({ name: z.string(), shortName: z.string() });

export const roundSchema = z.object({ name: z.string(), shortName: z.string() });

export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortName: z.string(),
});
