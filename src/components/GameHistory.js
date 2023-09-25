import React, { useState, useEffect } from "react";

import GameHistoryCard from "./GameHistoryCard";
import PageSelector from "./GameHistoryPageSelector";

import "../styles/GameHistory.css";

function GameHistory({ data, lang }) {
  let GameHistoryCards = [];

  data.forEach((match, i) => {
    GameHistoryCards.push(
      <GameHistoryCard key={i} match={match} lang={lang} />
    );
  });

  let [bgColorPageSelector, setBgColorPageSelector] = useState(() => {
    let array = ["black"];

    for (let i = 1; i < GameHistoryCards.length / 5; i++) {
      array.push(["inherit"]);
    }

    return array;
  });

  let [previousIndex, setPreviousIndex] = useState(0);

  let [arrayIndex, setArrayIndex] = useState(0);

  function handleSwitchPage(buttonIndex, previousIndex) {
    setArrayIndex(buttonIndex * 5);

    if (buttonIndex !== previousIndex) {
      let oldArray = bgColorPageSelector;

      oldArray[previousIndex] = "inherit";
      oldArray[buttonIndex] = "black";
      setBgColorPageSelector(oldArray);
      setPreviousIndex(buttonIndex);
    }
  }

  function displayPageSelector() {
    let pageSelectorArray = [];

    for (let i = 0; i < GameHistoryCards.length / 5; i++) {
      pageSelectorArray.push(
        <PageSelector
          key={i}
          handleSwitchPage={handleSwitchPage}
          bgColorPageSelector={bgColorPageSelector}
          previousIndex={previousIndex}
          indexButton={i}
        />
      );
    }

    return pageSelectorArray;
  }

  useEffect(() => {
    handleSwitchPage(0, previousIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="game-history-page-container">
        <div className="game-history">
          {GameHistoryCards[arrayIndex]}
          {GameHistoryCards[arrayIndex + 1]}
          {GameHistoryCards[arrayIndex + 2]}
          {GameHistoryCards[arrayIndex + 3]}
          {GameHistoryCards[arrayIndex + 4]}
        </div>
        <div className="game-page">{displayPageSelector()}</div>
      </div>
    </>
  );
}

export default GameHistory;
