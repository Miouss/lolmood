import { getRuneImg, getStyleName, statsModImgs } from "./runesImg";

import runeFrameSVG from "../assets/runes-frame.svg";

import primaryStyleSVG from "../assets/primary-style.svg";
import subStyleSVG from "../assets/sub-style.svg";
import statsModsSVG from "../assets/stats-mods.svg";

import "../styles/ChampRunes.css";

function ChampRunes({ runes, mods, displayPickRate }) {
  const runesMW = initializeRunesTree(runes.mostWinrate);
  const runesMP = initializeRunesTree(runes.mostPlayed);

  const statsModsMP = initializeStatsModsTree(mods);

  const { primaryStyle, subStyle } = displayPickRate ? runesMP : runesMW;
  const primaryRunes = primaryStyle.runes;
  const subRunes = subStyle.runes;

  const StatsModsContainer = ({ children }) => (
    <div id="stats-mods-container">{children}</div>
  );

  const StatsModsDecoratorImg = () => (
    <img id="stats-mods-svg" src={statsModsSVG} alt="stats mods decorator" />
  );

  const StatModImg = ({ src }) => <img src={src} alt="stat mod img" />;

  const RunesContentContainer = ({ children }) => (
    <div id="runes-contents">{children}</div>
  );

  const RunesFrameImg = () => <img src={runeFrameSVG} alt="rune frame img" />;

  const RunesContainer = ({ children }) => (
    <div id="runes-container">{children}</div>
  );

  const RunesFrameContainer = ({ children }) => (
    <div id="runes-frame-container">{children}</div>
  );

  const RunesTitle = () => <div id="runes-title">RUNES</div>;

  const PrimaryStyleContainer = ({ children }) => (
    <div id="primary-style-container">{children}</div>
  );

  const SubStyleContainer = ({ children }) => (
    <div id="sub-style-container">{children}</div>
  );

  const PrimaryStyleRunesContainer = ({ children }) => (
    <div id="primary-style-runes">{children}</div>
  );

  const SubStyleRunesContainer = ({ children }) => (
    <div id="sub-style-runes">{children}</div>
  );

  const PerkImg = () => (
    <div id="runes-tree-perk">
      <img src={primaryRunes[0].img} alt="perk img" />
    </div>
  );

  const RuneImg = ({ src }) => (
    <img className="runes-tree-rune" src={src} alt="rune img" />
  );

  const PrimaryStyleDecoratorImg = () => (
    <img
      id="primary-style-svg"
      src={primaryStyleSVG}
      alt="primary style decorator"
    />
  );

  const SubStyleDecoratorImg = () => (
    <img id="sub-style-svg" src={subStyleSVG} alt="sub style decorator" />
  );

  const StyleImg = ({ src }) => (
    <img className="runes-tree-style" src={src} alt="style img" />
  );

  const StyleTitleContainer = ({ name, children }) => (
    <div>
      {children}
      <span> {name}</span>
    </div>
  );

  return (
    <RunesContainer>
      <RunesTitle />
      <RunesFrameContainer>
        <RunesFrameImg />
        <RunesContentContainer>
          <PrimaryStyleContainer>
            <PrimaryStyleDecoratorImg />
            <StyleTitleContainer name={primaryStyle.name}>
              <StyleImg src={primaryStyle.img} />
            </StyleTitleContainer>
            <PrimaryStyleRunesContainer>
              <PerkImg />
              <RuneImg src={primaryRunes[1].img} />
              <RuneImg src={primaryRunes[2].img} />
              <RuneImg src={primaryRunes[3].img} />
            </PrimaryStyleRunesContainer>
          </PrimaryStyleContainer>

          <div>
            <SubStyleContainer>
              <SubStyleDecoratorImg />
              <StyleTitleContainer name={subStyle.name}>
                <StyleImg src={subStyle.img} />
              </StyleTitleContainer>

              <SubStyleRunesContainer>
                <RuneImg src={subRunes[0].img} />
                <RuneImg src={subRunes[1].img} />
              </SubStyleRunesContainer>
            </SubStyleContainer>

            <StatsModsContainer>
              <StatsModsDecoratorImg />
              <StatModImg src={statsModsMP[0].img} />
              <StatModImg src={statsModsMP[1].img} />
              <StatModImg src={statsModsMP[2].img} />
            </StatsModsContainer>
          </div>
        </RunesContentContainer>
      </RunesFrameContainer>
    </RunesContainer>
  );
}

function initializeRunesTree(runesTree) {
  const { primaryId, subId, perkId } = runesTree.styles;
  const [rune1, rune2, rune3] = runesTree.primary.runesIds;
  const [rune4, rune5] = runesTree.secondary.runesIds;

  const styleBase = (id) => ({
    id,
    img: getRuneImg(id),
    name: getStyleName(id),
  });

  const runeObj = (id) => ({ id, img: getRuneImg(id) });

  return {
    primaryStyle: {
      ...styleBase(primaryId),
      runes: [runeObj(perkId), runeObj(rune1), runeObj(rune2), runeObj(rune3)],
    },
    subStyle: {
      ...styleBase(subId),
      runes: [runeObj(rune4), runeObj(rune5)],
    },
  };
}

function initializeStatsModsTree(mods) {
  const statsModsArr = [];

  const statsModObj = (id) => ({ id, img: statsModImgs[id] });

  mods.forEach((id) => {
    statsModsArr.push(statsModObj(id));
  });

  return statsModsArr;
}

export default ChampRunes;
