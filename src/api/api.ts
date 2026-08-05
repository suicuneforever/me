import { GameData } from '../types/types';

export const getRecentlyPlayedGames = async (): Promise<GameData[]> => {
  const res = await fetch('https://portfolio-server-seven-lemon.vercel.app/api/steam/recent');
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

export const sendEmail = async (name: string, email: string, message: string, company?: string) => {
  const res = await fetch('https://portfolio-server-seven-lemon.vercel.app/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipient: email,
      text: `Name: ${name}\nCompany: ${company ?? 'n/a'}\n\n${message}`,
    }),
  });

  return await res.json();
};
