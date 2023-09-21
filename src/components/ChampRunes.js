import { getRuneImg, getStyleName, statsModImgs } from "./runesImg";

import runeFrameSVG from "../assets/runes-frame.svg";

import primaryStyleSVG from "../assets/primary-style.svg";
import subStyleSVG from "../assets/sub-style.svg";
import statsModsSVG from "../assets/stats-mods.svg";

import "../styles/ChampRunes.css";

function ChampRunes({ runes, statsMods, displayPickRate }) {
  let runesMW = initializeRunesTree(runes["mostWinrate"]);
  let runesMP = initializeRunesTree(runes["mostPlayed"]);

  let statsModsTree = initializeStatsModsTree(statsMods);

  let runesTree = displayPickRate ? runesMP : runesMW;

  return (
    <>
      <div id="runes-frame">
        <div id="rune-title">RUNES</div>
        <div id="rune-frame">
          <img id="rune-frame-svg" src={runeFrameSVG} alt="slt" />
          <div id="runes-contents">
            <div id="primary-style-container">
              <img id="primary-style-svg" src={primaryStyleSVG} alt="" />
              <div>
                <img
                  className="runes-tree-style"
                  src={runesTree["primaryStyle"]["img"]}
                  alt="SLT"
                />
                <span> {runesTree["primaryStyle"]["name"]}</span>
              </div>
              <div id="primary-style-runes">
                <div id="runes-tree-perk">
                  <img
                    src={runesTree["primaryStyle"]["runes"][0]["img"]}
                    alt="SLT"
                  />
                </div>
                <img
                  className="runes-tree-rune"
                  src={runesTree["primaryStyle"]["runes"][1]["img"]}
                  alt="SLT"
                />
                <img
                  className="runes-tree-rune"
                  src={runesTree["primaryStyle"]["runes"][2]["img"]}
                  alt="SLT"
                />
                <img
                  className="runes-tree-rune"
                  src={runesTree["primaryStyle"]["runes"][3]["img"]}
                  alt="SLT"
                />
              </div>
            </div>

            <div>
              <div id="sub-style-container">
                <img id="sub-style-svg" src={subStyleSVG} alt="" />
                <div>
                  <img
                    className="runes-tree-style"
                    src={runesTree["subStyle"]["img"]}
                    alt="SLT"
                  />
                  <span> {runesTree["subStyle"]["name"]}</span>
                </div>

                <div id="sub-style-runes">
                  <img
                    className="runes-tree-rune"
                    src={runesTree["subStyle"]["runes"][0]["img"]}
                    alt="SLT"
                  />
                  <img
                    className="runes-tree-rune"
                    src={runesTree["subStyle"]["runes"][1]["img"]}
                    alt="SLT"
                  />
                </div>
              </div>

              <div id="stats-mods-container">
                <img id="stats-mods-svg" src={statsModsSVG} alt="" />

                <img src={statsModsTree["mods"][0]["img"]} alt="SLT" />
                <img src={statsModsTree["mods"][1]["img"]} alt="SLT" />
                <img src={statsModsTree["mods"][2]["img"]} alt="SLT" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function initializeRunesTree(runesTree) {
  const { primaryId, subId, perkId } = runesTree.styles;
  const [rune1, rune2, rune3] = runesTree.primary.runesIds;
  const [rune4, rune5] = runesTree.secondary.runesIds;

  return {
    primaryStyle: {
      id: primaryId,
      img: getRuneImg(primaryId),
      name: getStyleName(primaryId),
      runes: [
        { id: perkId, img: getRuneImg(perkId) },
        { id: rune1, img: getRuneImg(rune1) },
        { id: rune2, img: getRuneImg(rune2) },
        { id: rune3, img: getRuneImg(rune3) },
      ],
    },
    subStyle: {
      id: subId,
      img: getRuneImg(subId),
      name: getStyleName(subId),
      runes: [
        { id: rune4, img: getRuneImg(rune4) },
        { id: rune5, img: getRuneImg(rune5) },
      ],
    },
  };
}

function initializeStatsModsTree(statsMods) {
  let statsModsArr = [];

  const { played, playrate, mods } = statsMods;

  mods.forEach((id) => {
    statsModsArr.push({
      id: id,
      img: statsModImgs[id],
    });
  });

  return {
    mods: statsModsArr,
    played,
    rate: playrate,
  };
}
export default ChampRunes;
