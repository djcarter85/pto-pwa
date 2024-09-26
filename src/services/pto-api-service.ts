import axios from "axios";
import { z } from "zod";

const baseUrl = "https://api.pto.football";

const playerSchema = z.object({ id: z.string(), name: z.string() });

const homePageSchema = z.object({ player: playerSchema });

const getWithAuth = async (path: string) => {
  return await axios.get(`${baseUrl}${path}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("idToken") },
  });
};

export const getHomePage = async () => {
  const response = await getWithAuth("/homePage");

  return homePageSchema.parse(response.data);
};

export const getLeaderboardPage = async () => {
  const leaderboardPageSchema = z.object({
    leaderboard: z.array(
      z.object({
        rank: z.number(),
        player: playerSchema,
        totalPoints: z.number(),
      }),
    ),
  });

  const response = await getWithAuth("/leaderboardPage");

  return leaderboardPageSchema.parse(response.data);
};

export const getPredictionsPage = async () => {
  const predictionsPageSchema = z.object({ player: playerSchema });

  // TODO: support any player
  const response = await getWithAuth("/predictionsPage?playerId=375ec333-4ff2-4573-917c-f7336a611ff4");

  return predictionsPageSchema.parse(response.data);
};
