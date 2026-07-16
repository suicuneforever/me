export const getRecentlyPlayedGames = async () => {
  const res = await fetch('https://portfolio-backend-orpin-iota.vercel.app/api/steam/recent');
  return await res.json();
};
