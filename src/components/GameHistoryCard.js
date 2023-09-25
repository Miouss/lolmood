import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import GameHistoryCardItems from "./GameHistoryCardItems";
import GameHistoryCardStyles from "./GameHistoryCardStyles";

import { getSummonerImg } from "./runesImg";

import "../styles/GameHistoryCard.css";

function GameHistoryCard({
  lang,
  match: {
    matchId,
    items,
    runes,
    statsMods,
    primaryStyleId,
    subStyleId,
    perkId,
    champName,
    lane,
    kills,
    deaths,
    assists,
    summoners,
    win,
  },
}) {
  const [colorOpacity, setColorOpacity] = useState(1);

  const nav = useNavigate();

  const champImg = require(`../assets/loldata/img/champion/centered/${champName}_0.jpg`);
  const laneImg = require(`../assets/loldata/current/img/position/${lane.toLowerCase()}.png`);

  const summonerImg = [
    getSummonerImg(summoners[0]),
    getSummonerImg(summoners[1]),
  ];

  const getRGB = (win) => (win ? "32, 140, 209" : "189, 37, 124");

  const color = `rgba(${getRGB(win)}, ${colorOpacity})`;

  return (
    <>
      <div
        onMouseEnter={() => setColorOpacity(0.5)}
        onMouseLeave={() => setColorOpacity(1)}
        onClick={() => nav("/champ/" + champName, { state: { champName } })}
        className="game-history-card"
        style={{ border: `solid 1px ${color}` }}
      >
        <div className="game-history-card-champ-lane">
          <div className="champ-container">
            <img className="champ-img" src={champImg} alt={champName} />
          </div>

          <div className="lane-container">
            <img className="lane-img" src={laneImg} alt={lane} />
          </div>
        </div>
        <div className="game-history-card-summoners">
          <img src={summonerImg[0]} alt={lane} />
          <img src={summonerImg[1]} alt={lane} />
        </div>

        <GameHistoryCardStyles
          idRunes={runes}
          idStatsMods={statsMods}
          idPrimaryStyle={primaryStyleId}
          idSubStyle={subStyleId}
          idPerk={perkId}
          identifier={matchId}
          lang={lang}
        />
        <GameHistoryCardItems
          idItems={items}
          identifier={matchId}
          lang={lang}
        />

        <div
          className="game-history-card-kda"
          style={{ backgroundColor: color }}
        >
          <div>
            <div>K</div>
            <div>D</div>
            <div>A</div>
          </div>
          <div>
            <div>{kills}</div>
            <div>{deaths}</div>
            <div>{assists}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameHistoryCard;
