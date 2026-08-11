import { Email, GameData } from "../types/types";

const API_URL = "https://portfolio-server-seven-lemon.vercel.app/api";

export const getRecentlyPlayedGames = async (): Promise<GameData[]> => {
  const res = await fetch(`${API_URL}/steam/recent`);
  const data = await res.json();

  return data.response.games.map((game: any) => {
    return {
      name: game.name,
      playtimeTwoWeeks: game.playtime_2weeks,
      playtimeForever: game.playtime_forever,
      imgUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
    } as GameData;
  });
};

export const sendEmail = async (email: Email) => {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: email,
      text: `Name: ${email.name}\nEmail: ${email.email}\nCompany: ${email.company ?? "n/a"}\n\n${email.message}`,
    }),
  });

  return await res.json();
};
