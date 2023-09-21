import runesJSON from "../assets/loldata/current/data/en_US/runesReforged.json";

import Health from "../assets/loldata/img/perk-images/StatMods/StatModsHealthScalingIcon.png";
import Armor from "../assets/loldata/img/perk-images/StatMods/StatModsArmorIcon.png";
import MagicResist from "../assets/loldata/img/perk-images/StatMods/StatModsMagicResIcon.png";
import AttackSpeed from "../assets/loldata/img/perk-images/StatMods/StatModsAttackSpeedIcon.png";
import CDR from "../assets/loldata/img/perk-images/StatMods/StatModsCDRScalingIcon.png";
import AdaptiveForce from "../assets/loldata/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png";

function getRunePath() {
  let runePathImg = {};

  runesJSON.forEach((style) => {
    runePathImg[style["id"]] = {
      icon: style["icon"].replace("perk-images/Styles/", ""),
      name: style["name"],
    };

    style["slots"].forEach((runes) => {
      runes["runes"].forEach((rune) => {
        runePathImg[rune["id"]] = rune["icon"].replace(
          "perk-images/Styles/",
          ""
        );
      });
    });
  });

  return runePathImg;
}

let runePathImg = getRunePath();

export const getStyleName = (id) => {
  return runePathImg[id]["name"];
};

export const statsModImgs = {
  5001: Health,
  5002: Armor,
  5003: MagicResist,
  5005: AttackSpeed,
  5007: CDR,
  5008: AdaptiveForce,
};

function importAll(r) {
  let itemsImgs = {};

  r.keys().map((item) => {
    itemsImgs[item.replace("./", "")] = r(item);
  });

  return itemsImgs;
}

const runeImg = importAll(
  require.context("../assets/loldata/img/perk-images/Styles", true, /\.(png)$/)
);

export const getRuneImg = (id) => {
  if (typeof runePathImg[id] === "object") {
    return runeImg[`${runePathImg[id]["icon"]}`];
  }

  return runeImg[`${runePathImg[id]}`];
};

const itemsImgs = importAll(
  require.context("../assets/loldata/current/img/item/", false, /\.(png)$/)
);

export const getItemImg = (id) => {
  return itemsImgs[`${id}.png`];
};

const emblemesImgs = importAll(
  require.context("../assets/loldata/current/img/emblem/", false, /\.(png)$/)
);

export const getEmblemeImg = (id) => {
  return emblemesImgs[`${id}.png`];
};

const passiveImgs = importAll(
  require.context("../assets/loldata/current/img/passive/", false, /\.(png)$/)
);

export const getPassiveImg = (id) => {
  return passiveImgs[`${id}.png`];
};

const spellsImgs = importAll(
  require.context("../assets/loldata/current/img/spell/", false, /\.(png)$/)
);

export const getSpellImg = (id) => {
  return spellsImgs[`${id}.png`];
};

const summonersImgs = importAll(
  require.context("../assets/loldata/current/img/summoner/", false, /\.(png)$/)
);

export const getSummonerImg = (id) => {
  return summonersImgs[`${id}.png`];
};

export const initializeTree = (
  tree,
  type,
  number,
  getImgFunction,
  arrayFct = false
) => {
  let rate = undefined;

  if ("winRate" in tree) {
    rate = tree["winRate"];
  } else {
    rate = tree["playRate"];
  }

  let arrayType = new Array(number);

  for (let i = 0; i < number; i++) {
    arrayType[i] = {
      id: tree[type][i],
      img: arrayFct
        ? getImgFunction[tree[type][i]]
        : getImgFunction(tree[type][i]),
    };
  }

  return {
    [`${type}`]: arrayType,
    played: tree["played"],
    rate: rate,
  };
};
