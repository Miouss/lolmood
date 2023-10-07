import { getEmblemeImg } from "./runesImg";

import frameSVG from "../assets/summoner-details-frame.svg";
import { useLangData } from "../App";
import "../styles/SummonerCard.css";

function SummonerCard({ name, grade, lp, games, wins, tier }) {
  const {
    rank: rankLabel,
    games: gamesLabel,
    winrate: winrateLabel,
  } = useLangData();

  const rankIcon = getEmblemeImg(grade);

  const rank = `${grade} ${tier}`;

  const winrate = ((wins / games) * 100).toFixed(2);

  return (
    <>
      <div id="summoner-card-frame">
        <div id="summoner-details-frame">
          <img id="summoner-details-frame-svg" src={frameSVG} />

          <div id="summoner-details-name-and-rank">
            <span>{name}</span>
            <img src={rankIcon} />
          </div>
        </div>

        <div id="summoner-stats-frame">
          <div>
            <span>{rankLabel}</span>
            <span>LP</span>
            <span>{gamesLabel}</span>
            <span>{winrateLabel}</span>
          </div>

          <div>
            <span>{rank}</span>
            <span>{lp}</span>
            <span>{games}</span>
            <span>{winrate}%</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummonerCard;
