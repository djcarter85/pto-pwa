import axios from "axios";
import { z } from "zod";
import { getSession } from "./auth-service";
import {
  playerSchema,
  tournamentSchema,
  roundSchema,
  dateSchema,
  scoreSchema,
  matchSchema,
} from "./schema-service";

const baseUrl = "https://api.pto.football";

const getWithAuth = async (path: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Not logged in");
  }

  return await axios.get(`${baseUrl}${path}`, {
    headers: { Authorization: "Bearer " + session.idToken },
  });
};

const postWithAuth = async (path: string, payload: any) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Not logged in");
  }

  return await axios({
    method: "post",
    url: `${baseUrl}${path}`,
    headers: { Authorization: "Bearer " + session.idToken },
    data: payload,
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
    round: roundSchema.nullable(),
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
            match: matchSchema,
            predictedScore: scoreSchema.nullable(),
            predictionStatus: z.enum(["HIDDEN", "EDITABLE", "FIXED"]),
            points: z.number().nullable(),
          }),
        ),
      }),
    ),
  });

  // TODO: support any player
  const response = await getWithAuth("/predictionsPage");

  return predictionsPageSchema.parse(response.data);
};

export const getAccountPage = async () => {
  const accountPageSchema = z.object({ emailAddress: z.string() });

  const response = await getWithAuth("/accountPage");

  return accountPageSchema.parse(response.data);
};

export const postPredictions = async (
  playerId: string,
  matchId: string,
  homePrediction: number,
  awayPrediction: number,
) => {
  const payload = {
    playerId: playerId,
    predictions: [
      {
        matchId: matchId,
        predictedScore: {
          home: homePrediction,
          away: awayPrediction,
        },
      },
    ],
  };

  await postWithAuth("/predictions", payload);
};
