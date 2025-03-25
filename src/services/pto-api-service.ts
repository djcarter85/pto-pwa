import axios from "axios";
import { z } from "zod";
import { getSession } from "./auth-service";
import { DateTime } from "luxon";

const baseUrl = "https://api.pto.football";

const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  isHuman: z.boolean(),
});

const dateSchema = z
  .string()
  .transform((x) => DateTime.fromISO(x))
  .refine((d) => d.isValid, "Invalid DateTime.");

const dateTimeUtcSchema = z
  .string()
  .transform((x) => DateTime.fromISO(x))
  .refine((d) => d.isValid, "Invalid DateTime.");

const scoreSchema = z.object({
  home: z.number(),
  away: z.number(),
});

const tournamentSchema = z.object({ name: z.string() });

const roundSchema = z.object({ name: z.string() });

const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortName: z.string(),
});

const getWithAuth = async (path: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Not logged in");
  }

  return await axios.get(`${baseUrl}${path}`, {
    headers: { Authorization: "Bearer " + session.idToken },
  });
};

export const getHomePage = async () => {
  const homePageSchema = z.object({ player: playerSchema });

  const response = await getWithAuth("/homePage");

  return homePageSchema.parse(response.data);
};

export const getLeaderboardPage = async () => {
  const leaderboardPageSchema = z.object({
    leaderboard: z.array(
      z.object({
        rank: z.number(),
        rankIsShared: z.boolean(),
        player: playerSchema,
        matchesPredicted: z.number(),
        totalPoints: z.number(),
        pointsPerMatch: z.number(),
      }),
    ),
    tournament: tournamentSchema,
    round: z.optional(roundSchema),
  });

  const response = await getWithAuth("/leaderboardPage");

  return leaderboardPageSchema.parse(response.data);
};

export const getPredictionsPage = async () => {
  const predictionsPageSchema = z.object({
    player: playerSchema,
    tournament: tournamentSchema,
    round: roundSchema,
    matchGroups: z.array(
      z.object({
        date: dateSchema,
        matchPredictions: z.array(
          z.object({
            match: z.object({
              id: z.string(),
              homeTeam: teamSchema,
              awayTeam: teamSchema,
              kickoff: dateTimeUtcSchema,
              finalScore: scoreSchema.optional(),
            }),
            predictedScore: scoreSchema.optional(),
          }),
        ),
      }),
    ),
  });

  // TODO: support any player
  const response = await getWithAuth(
    "/predictionsPage?playerId=375ec333-4ff2-4573-917c-f7336a611ff4",
  );

  return predictionsPageSchema.parse(response.data);
};

export const getAccountPage = async () => {
  const accountPageSchema = z.object({ emailAddress: z.string() });

  const response = await getWithAuth("/accountPage");

  return accountPageSchema.parse(response.data);
};
