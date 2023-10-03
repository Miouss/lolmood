import React from "react";
import GameHistoryCardTooltip from "./GameHistoryCardTooltip";

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
            return idItems[i] ? (
              <GameHistoryCardTooltip
                key={`${i}${identifier}`}
                type="items"
                itemsJSON={itemsJSON}
                idItems={idItems}
                itemIcon={itemIcon}
                identifier={identifier}
                index={i}
                lang={lang}
              />
            ) : (
              <EmptyItem key={`${i}${identifier}`} />
            );
          })}
        </div>
        <div>
          {itemsIconsSecondRow.map((itemIcon, i) =>
            idItems[i + 3] ? (
              <GameHistoryCardTooltip
                key={`${i}${identifier}`}
                type="items"
                itemsJSON={itemsJSON}
                idItems={idItems}
                itemIcon={itemIcon}
                identifier={identifier}
                index={i}
              />
            ) : (
              <EmptyItem key={`${i}${identifier}`} />
            )
          )}
        </div>
      </div>
    </>
  );
}

function EmptyItem() {
  return <div className="empty-item"></div>;
}
export default GameHistoryCardItems;
