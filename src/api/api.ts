export const getRecentlyPlayedGames = async () => {
  const res = await fetch('https://portfolio-server-seven-lemon.vercel.app/api/steam/recent');
  return await res.json();
};
