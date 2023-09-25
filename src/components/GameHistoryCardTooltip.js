import React from "react";
import ReactTooltip from "react-tooltip";

function GameHistoryCardTooltip(props) {
  switch (props.type) {
    case "runes":
      if (props.runeJSON === undefined) {
        return <img class="runes" alt="" />;
      }
      return setRunesTooltip(
        props.runeJSON,
        props.idRunes,
        props.runeIcon,
        props.index,
        props.row
      );
    case "perk":
      if (props.runeJSON === undefined) {
        return <img class="runes" alt="" />;
      }
      return setPerkToolTip(props.runeJSON, props.idPerk, props.perkIcon);
    case "items":
      return setItemsToolTip(
        props.itemsJSON,
        props.idItems,
        props.itemIcon,
        props.identifier,
        props.index,
        props.lang
      );
    default:
  }
}

function setRunesTooltip(runeJSON, idRunes, runeIcon, index, row) {
  let runeName = null;
  let runeDescription = null;

  runeJSON.forEach((slot) =>
    slot["runes"].forEach((rune) => {
      if (rune["id"] === idRunes[index]) {
        runeName = rune["name"];
        runeDescription = rune["longDesc"];
      }
    })
  );

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

function setPerkToolTip(runeJSON, idPerk, perkIcon) {
  let perkName = null;
  let perkDescription = null;

  runeJSON.forEach((slot) =>
    slot["runes"].forEach((rune) => {
      if (rune["id"] === idPerk) {
        perkName = rune["name"];
        perkDescription = rune["longDesc"];
      }
    })
  );

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
        <div dangerouslySetInnerHTML={{ __html: perkDescription }}></div>
      </ReactTooltip>
      <img src={perkIcon} alt={`perk${idPerk}`} />
    </div>
  );
}

function setItemsToolTip(
  itemsJSON,
  idItems,
  itemIcon,
  identifier,
  index,
  lang
) {
  return (
    <article data-tip data-for={`${identifier}${index}`}>
      <ReactTooltip
        className={`tooltip-container ${lang === "en" && "plus-prefix"}`}
        id={`${identifier}${index}`}
        effect="solid"
        data-place="bottom"
      >
        <div className="tooltip-title">
          <img src={itemIcon} alt={`item${index}`} />
          <h6>{itemsJSON.data[idItems[index]]["name"]}</h6>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: itemsJSON.data[idItems[index]]["description"],
          }}
          style={{
            position: "relative",
            "& attention:before": {
              content: '"+"',
              position: "absolute",
              left: 0,
            },
          }}
        ></div>
      </ReactTooltip>

      <img src={itemIcon} alt={`item${index}`} />
    </article>
  );
}

export default GameHistoryCardTooltip;
