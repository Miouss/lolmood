import { getSummonerImg } from "./runesImg";

import sumsFrameSVG from "../assets/sums-frame.svg";
import sumsDesignSVG from "../assets/sums-design.svg";

import "../styles/ChampSums.css";

function ChampSums({ summonersData, displayPickRate }) {
  const summonersMP = initializeTree(summonersData.mostPlayed);

  const summonersMW = initializeTree(summonersData.mostWinrate, false);

  const { rate, summoners } = displayPickRate ? summonersMP : summonersMW;

  const SummonersTitle = () => <span id="sums-title">Summoners</span>;
  const SummonerDecoratorFrame = () => (
    <img id="sums-frame-svg" src={sumsFrameSVG} alt="slt" />
  );
  const SummonerDecoratorDesign = () => (
    <img id="sums-design-svg" src={sumsDesignSVG} alt="slt" />
  );

  const SummonersContainer = ({ children }) => (
    <div id="sums-container">{children}</div>
  );

  const SummonersFrame = ({ children }) => (
    <div id="sums-frame">{children}</div>
  );
  const SummonersImgContainer = ({ children }) => (
    <div id="sums-imgs-container">{children}</div>
  );

  const SummonerImg = ({ src }) => (
    <div className="sum-img-container">
      <img src={src} alt="slt" />
    </div>
  );
  const Rate = ({ value }) => <span id="rate-value">{value}%</span>;

  return (
    <SummonersFrame>
      <SummonersTitle />
      <SummonerDecoratorFrame />
      <SummonerDecoratorDesign />
      <SummonersContainer>
        <SummonersImgContainer>
          <SummonerImg src={summoners[0]["img"]} />
          <SummonerImg src={summoners[1]["img"]} />
        </SummonersImgContainer>
        <Rate value={rate} />
      </SummonersContainer>
    </SummonersFrame>
  );
}

function initializeTree(arr, isMostPlayed = true) {
  const rate = isMostPlayed ? arr.playrate : arr.winrate;

  const arrSorted = [];

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
