import React from "react";

import "../styles/StatsByChampCard.css";

import "react-circular-progressbar/dist/styles.css";
import { useLangData } from "../App";

function StatsByChampCard({ data: { 0: champName, 1: champData } }) {
  const { games, winrate: winrateLabel } = useLangData();
  const champImg = require(`../assets/loldata/img/champion/centered/${champName}_0.jpg`);

  const { played, winrate, killsAvg, deathsAvg, assistsAvg } = champData;

  return (
    <>
      <div className="stats-by-champ-card">
        <div className="stats-champ-container">
          <img src={champImg} alt="champion" />
        </div>

        <div className="stats-container">
          <div>
            <span>{games}</span>
            <span>{winrateLabel}</span>
            <span>KDA</span>
          </div>
          <div>
            <span>{played}</span>
            <span>{winrate} %</span>
            <span>
              {killsAvg}/{deathsAvg}/{assistsAvg}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsByChampCard;
