import axios from "axios";
import { z } from "zod";

const baseUrl = "https://api.pto.football";

const homePageSchema = z.object({
  player: z.object({ id: z.string(), name: z.string() }),
});

export const getHomePage = async () => {
  const response = await axios.get(`${baseUrl}/homePage`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("idToken") },
  });

  return homePageSchema.parse(response.data);
};
