import { API_HOST } from "../config";

export async function fetchGamesData(summonerName, region, count = 10) {
  const url = `http://${API_HOST}/summoner/${region.toLowerCase()}/${summonerName}/games/${count}`;
  const res = await fetch(url);

  const data = await res.json();

  return data;
}
