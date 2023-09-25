export async function fetchGamesData(summonerName, region, count = 10) {
  const url = `http://localhost:3000/api/summoner/${region.toLowerCase()}/${summonerName}/games/${count}`;
  const res = await fetch(url);

  const data = await res.json();

  return data;
}
