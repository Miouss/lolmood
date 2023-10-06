import React from "react";

import StatsByChampCard from "./StatsByChampCard";

import "../styles/StatsByChamp.css";

function StatsByChamp({ topChampsByMostPlayed }) {
  const StatsByChampCards = [];

  topChampsByMostPlayed.forEach((champStats) => {
    StatsByChampCards.push(
      <StatsByChampCard key={champStats[0]} data={champStats} />
    );
  });

  return (
    <>
      <div className="stats-by-champ-card-area">
        <div>
          {StatsByChampCards[0]}
          {StatsByChampCards[1]}
          {StatsByChampCards[2]}
        </div>
      </div>
    </>
  );
}

export default StatsByChamp;
