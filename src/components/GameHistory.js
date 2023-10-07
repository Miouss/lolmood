import React, { useState, useEffect } from "react";

import GameHistoryCard from "./GameHistoryCard";
import PageSelector from "./GameHistoryPageSelector";

import "../styles/GameHistory.css";

function GameHistory({ data }) {
  const GameHistoryCards = [];

  data.forEach((match, i) => {
    GameHistoryCards.push(<GameHistoryCard key={i} match={match} />);
  });

  const pageLength = Math.ceil(GameHistoryCards.length / 5);

  const [bgColorPageSelector, setBgColorPageSelector] = useState(() => {
    const array = ["black"];

    [...Array(pageLength)].forEach(() => array.push(["inherit"]));

    return array;
  });

  const [previousPageIndex, setPreviousPageIndex] = useState(0);

  const [cardIndex, setCardIndex] = useState(0);

  const handleSwitchPage = (pageIndex, previousIndex) => {
    setCardIndex(pageIndex * 5);

    if (pageIndex !== previousIndex) {
      setBgColorPageSelector((oldArray) => {
        oldArray[previousIndex] = "inherit";
        oldArray[pageIndex] = "black";

        return oldArray;
      });
      setPreviousPageIndex(pageIndex);
    }
  };

  const displayPageSelector = () => {
    const pageSelectorArray = [];
    console.log(pageLength);
    [...Array(pageLength)].forEach((_, i) => {
      pageSelectorArray.push(
        <PageSelector
          key={i}
          handleSwitchPage={handleSwitchPage}
          bgColor={bgColorPageSelector[i]}
          previousPageIndex={previousPageIndex}
          pageIndex={i}
        />
      );
    });

    return pageSelectorArray;
  };

  const displayGameHistoryCards = () => {
    const gameHistoryCardsArray = [];

    [...Array(5)].forEach((_, i) => {
      gameHistoryCardsArray.push(GameHistoryCards[cardIndex + i]);
    });

    return gameHistoryCardsArray;
  };

  useEffect(() => {
    handleSwitchPage(0, previousPageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="game-history-page-container">
        <div className="game-history">{displayGameHistoryCards()}</div>
        <div className="game-page">{displayPageSelector()}</div>
      </div>
    </>
  );
}

export default GameHistory;
