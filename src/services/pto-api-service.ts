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
