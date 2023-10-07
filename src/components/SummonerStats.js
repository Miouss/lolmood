import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchGamesData } from "./fetchData";

import SummonerCard from "./SummonerCard";
import StatsByChamp from "./StatsByChamp";
import GameHistory from "./GameHistory";

import "../styles/SummonerStats.css";

function SummonerStats({ data, setData }) {
  const location = useLocation();

  async function requestData(summonerName, region) {
    const data = await fetchGamesData(summonerName, region);

    setData(data);
  }

  useEffect(() => {
    if (data === null) {
      const [, , region, summonerName] = location["pathname"].split("/");

      requestData(summonerName, region);
    }
  }, []);

  if (data === null) return null;

  return (
    <>
      <div className="summoner-stats-area">
        <div>
          <SummonerCard {...data.account} />
          <StatsByChamp topChampsByMostPlayed={data.topChampsByMostPlayed} />
        </div>
        <GameHistory data={data.matchesData} />
      </div>
    </>
  );
}

export default SummonerStats;
