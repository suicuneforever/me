const STEAM_API_KEY = '65A2C534DD5A61261C1F2CCD33927F81';
const STEAM_ID = '76561198341352380';

export const getRecentlyPlayedGames = async () => {
  const res = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`,
  );
  return await res.json();
};
