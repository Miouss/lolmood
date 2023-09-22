import { getSummonerImg } from "./runesImg";

import sumsFrameSVG from "../assets/sums-frame.svg";
import sumsDesignSVG from "../assets/sums-design.svg";

import "../styles/ChampSums.css";

function ChampSums({ summoners, displayPickRate }) {
  let summonersMP = initializeTree(summoners.mostPlayed);

  let summonersMW = initializeTree(summoners.mostWinrate, false);

  let summonersRate = displayPickRate ? summonersMP : summonersMW;

  return (
    <div id="sums-frame">
      <span id="sums-title">Summoners</span>
      <img id="sums-frame-svg" src={sumsFrameSVG} alt="slt" />
      <img id="sums-design-svg" src={sumsDesignSVG} alt="slt" />
      <div id="sums-imgs-container">
        <div className="sums-single-img-container">
          <img src={summonersRate["summoners"][0]["img"]} alt="slt" />
          <span>{summonersRate["rate"]}%</span>
        </div>
        <div className="sums-single-img-container">
          <img src={summonersRate["summoners"][1]["img"]} alt="slt" />
          <span>{summonersRate["rate"]}%</span>
        </div>
      </div>
    </div>
  );
}

function initializeTree(arr, isMostPlayed = true) {
  const rate = isMostPlayed ? arr.playrate : arr.winrate;

  let arrSorted = [];

  arr.sums.forEach((sum) => {
    arrSorted.push({
      id: sum,
      img: getSummonerImg(sum),
    });
  });

  return {
    summoners: arrSorted,
    played: arr.played,
    rate,
  };
}

export default ChampSums;
