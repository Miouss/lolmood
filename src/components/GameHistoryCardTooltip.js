import React from "react";
import ReactTooltip from "react-tooltip";
import { useLangData } from "../App";

export function GameHistoryCardTooltipItem({
  itemsJSON,
  identifier,
  itemIcon,
  index,
}) {
  const { lang } = useLangData();
  const plusPrefixClass = lang === "en" ? "plus-prefix" : "";

  return (
    <article data-tip data-for={`${identifier}${index}`}>
      <ReactTooltip
        className={`tooltip-container ${plusPrefixClass}`}
        id={`${identifier}${index}`}
        effect="solid"
        data-place="bottom"
      >
        <div className="tooltip-title">
          <img src={itemIcon} alt={`item${index}`} />
          <h6>{itemsJSON.name}</h6>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: itemsJSON.description,
          }}
        ></div>
      </ReactTooltip>

      <img src={itemIcon} alt={`item${index}`} />
    </article>
  );
}

export function GameHistoryCardTooltipPerk({ runeJSON, idPerk, perkIcon }) {
  if (!runeJSON) return <EmptyItemContainer />;

  const [perkName, perkDesc] = getRuneData(runeJSON, idPerk);

  return (
    <div className="perk" key={`${idPerk}`} data-tip data-for={`${idPerk}`}>
      <ReactTooltip
        class="tooltip-container"
        id={`${idPerk}`}
        effect="solid"
        data-place="bottom"
      >
        <div className="tooltip-title">
          <img src={perkIcon} alt={`perk${idPerk}`} />
          <h6>{perkName}</h6>
        </div>
        <div dangerouslySetInnerHTML={{ __html: perkDesc }}></div>
      </ReactTooltip>
      <img src={perkIcon} alt={`perk${idPerk}`} />
    </div>
  );
}

export function GameHistoryCardTooltipRunes({
  runeJSON,
  idRunes,
  runeIcon,
  index,
  row,
}) {
  if (!runeJSON) return <EmptyItemContainer />;

  const [runeName, runeDescription] = getRuneData(runeJSON, idRunes[index]);

  return (
    <div data-tip data-for={`${idRunes[index]}${row}`}>
      <ReactTooltip
        className="tooltip-container"
        id={`${idRunes[index]}${row}`}
        effect="solid"
        data-place="bottom"
      >
        <div className="tooltip-title">
          <img src={runeIcon} alt={`rune${index}`} />
          <h6>{runeName}</h6>
        </div>
        <div dangerouslySetInnerHTML={{ __html: runeDescription }}></div>
      </ReactTooltip>
      <img className="runes" src={runeIcon} alt={`rune${index}`} />
    </div>
  );
}

function EmptyItemContainer() {
  return <img class="runes" alt="" />;
}

function getRuneData(runeJSON, idSearched) {
  let nameFound = null;
  let descFound = null;

  runeJSON.forEach(({ runes }) =>
    runes.forEach(({ id, name, longDesc }) => {
      if (id === idSearched) {
        nameFound = name;
        descFound = longDesc;
      }
    })
  );

  return [nameFound, descFound];
}
