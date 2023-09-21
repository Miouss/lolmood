import { getItemImg } from "./runesImg";

import itemSetFrameSVG from "../assets/items-set-frame.svg";
import itemSetDesignSVG from "../assets/items-set-design.svg";

import "../styles/ChampItems.css";

function ChampItems({ starting, completed, displayPickRate }) {
  let startItems = {
    MP: initializeItems(starting.mostPlayed),
    MW: initializeItems(starting.mostWinrate, false),
  };

  let coreItems = {
    MP: initializeItems(completed.core.mostPlayed),
    MW: initializeItems(completed.core.mostWinrate, false),
  };
  let nthItems = {
    4: {
      MP: initializeNthItems(completed.nth.mostPlayed[0]),
      MW: initializeNthItems(completed.nth.mostWinrate[0], false),
    },
    5: {
      MP: initializeNthItems(completed.nth.mostPlayed[1]),
      MW: initializeNthItems(completed.nth.mostWinrate[1], false),
    },
    6: {
      MP: initializeNthItems(completed.nth.mostPlayed[2]),
      MW: initializeNthItems(completed.nth.mostWinrate[2], false),
    },
  };

  console.debug(nthItems);

  const keyType = displayPickRate ? "MP" : "MW";

  return (
    <>
      <div id="items-frame">
        <span id="items-set-title">Item Set</span>
        <div id="all-items-and-svgs-container">
          <img id="items-frame-img" src={itemSetFrameSVG} />
          <img id="items-design-img" src={itemSetDesignSVG} />
          <div id="all-items-container">
            <div id="starting-items">
              <span className="items-title">Starting Items</span>
              <div className="items-display-area">
                {getMultipleItemsContainer(startItems[keyType], "startItems")}
              </div>
            </div>

            <div id="core-items">
              <span className="items-title">Core Items</span>
              <div className="items-display-area">
                {getMultipleItemsContainer(coreItems[keyType], "coreItems")}
              </div>
            </div>

            <div id="fourth-fifth-items-container">
              <div>
                <span className="items-title">4th Item</span>
                {displayPickRate
                  ? getPickRateContainerForNthItems(nthItems[4][keyType])
                  : null}
                <div className="fourth-fifth-items-display-container">
                  {getSingleItemContainer(nthItems[4][keyType])}
                </div>
              </div>

              <div>
                <span className="items-title">5th Item </span>
                {displayPickRate
                  ? getPickRateContainerForNthItems(nthItems[5]?.[keyType])
                  : null}
                <div className="fourth-fifth-items-display-container">
                  {getSingleItemContainer(nthItems[5]?.[keyType])}
                </div>
              </div>
            </div>

            <div id="sixth-items">
              <span className="items-title">
                Last Item{" "}
                {displayPickRate
                  ? getPickRateContainerForNthItems(nthItems[6]?.[keyType])
                  : null}
              </span>

              <div id="sixth-items-display-container">
                {getSingleItemContainer(nthItems[6]?.[keyType])}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function initializeItems(arr, isMostPlayed = true) {
  const rate = isMostPlayed ? arr.playrate : arr.winrate;

  let arrayType = [];

  arr.items.forEach((item, i) => {
    arrayType[i] = {
      id: item,
      img: getItemImg(item),
    };
  });

  return {
    items: arrayType,
    played: arr.played,
    rate: rate,
  };
}

function initializeNthItems(arr, isMostPlayed = true) {
  const rate = isMostPlayed ? arr.playrate : arr.winrate;

  let arrayType = [];

  arr.forEach((item, i) => {
    arrayType[i] = {
      id: item.itemId,
      img: getItemImg(item.itemId),
      played: item.played,
      rate: item[rate],
    };
  });

  return arrayType;
}

function getSingleItemContainer(itemsArray, displayPickRate) {
  if (itemsArray[0]["id"] === 7050) {
    return getEmptyItemsContainer();
  }

  let itemContainer = [];

  itemsArray.forEach((item) => {
    itemContainer.push(
      <>
        <div className="single-item-container">
          <img className="items-img" src={item["img"]} />
          <div className="single-item-container-rate">
            <span>{item["rate"]}%</span>
            {displayPickRate ? null : <span>{item["played"]} games</span>}
          </div>
        </div>
      </>
    );
  });

  return itemContainer;
}

function getPickRateContainerForNthItems(nthItems) {
  if (!nthItems) {
    return null;
  }

  return (
    <>
      <span className="nth-items-container" style={{ paddingLeft: "0.4rem" }}>
        ({nthItems.played} games)
      </span>
    </>
  );
}

function getMultipleItemsContainer(itemsArray) {
  if (itemsArray === null) {
    return getEmptyItemsContainer();
  }

  let itemContainer = [];

  let duplicateIds = {};

  itemsArray.items.forEach((item) => {
    if (duplicateIds[item["id"]] === undefined) {
      duplicateIds[item["id"]] = 1;
    } else {
      duplicateIds[item["id"]] += 1;
    }
  });

  itemsArray.items.forEach((item) => {
    if (duplicateIds[item["id"]] !== 0) {
      let duplicateItemsContainer =
        duplicateIds[item["id"]] > 1 ? (
          <>
            <span className="duplicate-items">x{duplicateIds[item["id"]]}</span>
          </>
        ) : null;

      itemContainer.push(
        <>
          <div style={{ position: "relative" }}>
            <img className="items-img" src={item["img"]} />
            {duplicateItemsContainer}
          </div>
        </>
      );
      duplicateIds[item["id"]] = 0;
    }
  });

  itemContainer.push(
    <>
      <div className="single-item-container-rate">
        <span>{itemsArray["rate"]}%</span>
        <span>{itemsArray["played"]} games</span>
      </div>
    </>
  );

  return itemContainer;
}
function getEmptyItemsContainer() {
  return (
    <>
      <div class="empty-items-container">
        No games with enough data were found, so there is no items stats to
        display
      </div>
    </>
  );
}

export default ChampItems;
