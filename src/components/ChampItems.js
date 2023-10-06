import { getItemImg } from "./runesImg";

import itemSetFrameSVG from "../assets/items-set-frame.svg";
import itemSetDesignSVG from "../assets/items-set-design.svg";

import "../styles/ChampItems.css";

function ChampItems({ starting, completed: { core, nth }, displayPickRate }) {
  const startItems = {
    MP: initializeItems(starting.mostPlayed),
    MW: initializeItems(starting.mostWinrate, false),
  };

  const coreItems = {
    MP: initializeItems(core.mostPlayed),
    MW: initializeItems(core.mostWinrate, false),
  };

  const nthItems = {
    4: {
      MP: initializeNthItems(nth.mostPlayed[0]),
      MW: initializeNthItems(nth.mostWinrate[0], false),
    },
    5: {
      MP: initializeNthItems(nth.mostPlayed[1]),
      MW: initializeNthItems(nth.mostWinrate[1], false),
    },
    6: {
      MP: initializeNthItems(nth.mostPlayed[2]),
      MW: initializeNthItems(nth.mostWinrate[2], false),
    },
  };

  const keyType = displayPickRate ? "MP" : "MW";

  return (
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
  );
}

function initializeItems(arr, isMostPlayed = true) {
  const rate = isMostPlayed ? arr.playrate : arr.winrate;

  const arrayType = [];

  arr.items.forEach((item, i) => {
    if (!item) return;

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
  const rate = isMostPlayed ? "playrate" : "winrate";

  const arrayType = [];

  arr.forEach((item, i) => {
    if (!item) return;
    arrayType[i] = {
      id: item.itemId,
      img: getItemImg(item.itemId),
      played: item.played,
      rate: item[rate],
    };
  });

  const arrSorted = isMostPlayed
    ? getArrSorted(arrayType).byMostPlayed()
    : getArrSorted(arrayType).byMostWinrate();

  return arrSorted.slice(0, 3);
}

function getArrSorted(arr) {
  const sortBy = (key) => arr.sort((a, b) => b[key] > a[key]);

  return {
    byMostPlayed: () => sortBy("played"),
    byMostWinrate: () => sortBy("winrate"),
  };
}

function getSingleItemContainer(itemsArray, displayPickRate) {
  if (!itemsArray || itemsArray.length === 0) {
    return <EmptyItemsContainer />;
  }

  const itemContainer = [];

  itemsArray.forEach((item) => {
    itemContainer.push(
      <div className="single-item-container">
        <img className="items-img" src={item["img"]} />
        <div className="single-item-container-rate">
          <span>{item["rate"]}%</span>
          {displayPickRate ? null : <span>{item["played"]} games</span>}
        </div>
      </div>
    );
  });

  return itemContainer;
}

function getPickRateContainerForNthItems(nthItems) {
  if (!nthItems) return null;

  const played = nthItems.reduce((acc, curr) => acc + curr.played, 0);

  return <NthItemContainer played={played} />;
}

function getMultipleItemsContainer(itemsArray) {
  if (itemsArray === null) return <EmptyItemsContainer />;

  const { items, rate, played } = itemsArray;

  const nbItemById = {};

  items.forEach(({ id }) => {
    nbItemById[id] ? (nbItemById[id] += 1) : (nbItemById[id] = 1);
  });

  const itemContainer = [];

  items.forEach(({ img, id }) => {
    if (!nbItemById[id]) return;

    const isDuplicateItems = nbItemById[id] > 1;

    const ItemContainer = isDuplicateItems ? (
      <DuplicateStartItemContainer itemId={nbItemById[id]} img={img} />
    ) : (
      <SingleStartItemContainer img={img} />
    );

    itemContainer.push(ItemContainer);

    delete nbItemById[id];
  });

  itemContainer.push(<ItemContainerRate rate={rate} played={played} />);

  return itemContainer;
}

function NthItemContainer({ played }) {
  return (
    <span className="nth-items-container" style={{ paddingLeft: "0.4rem" }}>
      ({played} games)
    </span>
  );
}

function SingleStartItemContainer({ img, children }) {
  return (
    <div style={{ position: "relative" }}>
      <img className="items-img" src={img} alt="itemImg" />
      {children}
    </div>
  );
}

function DuplicateStartItemContainer({ itemId, img }) {
  return (
    <SingleStartItemContainer img={img}>
      <span className="duplicate-items">x{itemId}</span>
    </SingleStartItemContainer>
  );
}

function ItemContainerRate({ rate, played }) {
  return (
    <div className="single-item-container-rate">
      <span>{rate}%</span>
      <span>{played} games</span>
    </div>
  );
}

function EmptyItemsContainer() {
  return (
    <div class="empty-items-container">
      No games with enough data were found, so there is no items stats to
      display
    </div>
  );
}

export default ChampItems;
