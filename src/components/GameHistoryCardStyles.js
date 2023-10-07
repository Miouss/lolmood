import React from "react";

import enRunesJSON from "../assets/loldata/current/data/en_US/runesReforged.json";
import frRunesJSON from "../assets/loldata/current/data/fr_FR/runesReforged.json";

import { GameHistoryCardTooltipRunes } from "./GameHistoryCardTooltip";
import { GameHistoryCardTooltipPerk } from "./GameHistoryCardTooltip";

import { statsModImgs, getRuneImg } from "./runesImg";

import "../styles/GameHistoryCardStyles.css";
import { useLangData } from "../App";

function GameHistoryCardStyles(props) {
  let perkIcon = getRuneImg(props.idPerk);

  let statsModIcons = [];
  props.idStatsMods.forEach((idStatsMod, index) => {
    statsModIcons[index] = statsModImgs[idStatsMod];
  });

  let runeIcons = [];

  props.idRunes.forEach((idRune, index) => {
    runeIcons[index] = getRuneImg(idRune);
  });

  let primaryRuneIcons = [];
  let subRuneIcons = [];

  runeIcons.forEach((runeIcon, index) => {
    index < 3 ? primaryRuneIcons.push(runeIcon) : subRuneIcons.push(runeIcon);
  });

  let primaryRuneJSON = undefined;
  let subRuneJSON = undefined;

  const { lang } = useLangData();

  let runesJSON = lang === "fr" ? frRunesJSON : enRunesJSON;

  runesJSON.forEach((style) => {
    if (style["id"] === props.idPrimaryStyle) {
      primaryRuneJSON = style["slots"];
    } else if (style["id"] === props.idSubStyle) {
      subRuneJSON = style["slots"];
    }
  });

  return (
    <div className="game-history-card-style">
      <div className="card-perk">
        <GameHistoryCardTooltipPerk
          key={`${props.identifier}${props.idPerk}`}
          runeJSON={primaryRuneJSON}
          idPerk={props.idPerk}
          perkIcon={perkIcon}
        />
      </div>
      <div className="card-style">
        <div className="card-primary-style">
          {primaryRuneIcons.map((primaryRuneIcon, index) => {
            return (
              <GameHistoryCardTooltipRunes
                key={`${props.identifier}${props.idPerk}${index}`}
                runeJSON={primaryRuneJSON}
                idRunes={props.idRunes}
                runeIcon={primaryRuneIcon}
                index={index}
                row="1"
              />
            );
          })}
        </div>
        <div className="card-sub-style">
          {subRuneIcons.map((subRuneIcon, index) => {
            return (
              <GameHistoryCardTooltipRunes
                key={`${props.identifier}${props.idPerk}${index + 3}`}
                runeJSON={subRuneJSON}
                idRunes={props.idRunes}
                runeIcon={subRuneIcon}
                index={index + 3}
                row="2"
              />
            );
          })}
        </div>
        <div className="card-stats-mod">
          {statsModIcons.map((statsModIcon, index) => {
            return (
              <div key={index}>
                <img src={statsModIcon} alt={`statsMod${index}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameHistoryCardStyles;
