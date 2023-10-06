import React from "react";
import { GameHistoryCardTooltipItem } from "./GameHistoryCardTooltip";

import enItemsJSON from "../assets/loldata/current/data/en_US/item.json";
import frItemsJSON from "../assets/loldata/current/data/fr_FR/item.json";

import { getItemImg } from "./runesImg";

import "../styles/GameHistoryCardItems.css";

function GameHistoryCardItems({ idItems, identifier, lang }) {
  const itemsIconsFirstRow = [];
  const itemsIconsSecondRow = [];

  for (let i = 0; i < idItems.length; i++) {
    if (i < 3) {
      itemsIconsFirstRow[i] = getItemImg(idItems[i]);
    } else {
      itemsIconsSecondRow[i - 3] = getItemImg(idItems[i]);
    }
  }

  const itemsJSON = lang === "fr" ? frItemsJSON : enItemsJSON;

  return (
    <>
      <div className="game-history-card-items">
        <div>
          {itemsIconsFirstRow.map((itemIcon, i) => {
            const key = i + idItems + identifier;

            return idItems[i] ? (
              <GameHistoryCardTooltipItem
                key={key}
                itemsJSON={itemsJSON.data[idItems[i]]}
                itemIcon={itemIcon}
                identifier={identifier}
                index={i}
                lang={lang}
              />
            ) : (
              <EmptyItem key={key} />
            );
          })}
        </div>
        <div>
          {itemsIconsSecondRow.map((itemIcon, i) => {
            i += 3;
            const key = i + idItems + identifier;
            return idItems[i] ? (
              <GameHistoryCardTooltipItem
                key={key}
                itemsJSON={itemsJSON.data[idItems[i]]}
                itemIcon={itemIcon}
                identifier={identifier + identifier}
                index={i}
                lang={lang}
              />
            ) : (
              <EmptyItem key={key} />
            );
          })}
        </div>
      </div>
    </>
  );
}

function EmptyItem() {
  return <div className="empty-item"></div>;
}
export default GameHistoryCardItems;
