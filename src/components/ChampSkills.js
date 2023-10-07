import { getSpellImg } from "./runesImg";

import champJSON from "../assets/loldata/current/data/en_US/championFull.json";

import "../styles/ChampSkills.css";
import { useLangData } from "../App";

const MAX_LVL = 18;
const MAX_SKILL_LVL = 5;

function ChampSkills({ evolves, champName, skills, displayPickrate }) {
  const { spells } = champJSON.data[champName];
  const lang = useLangData();

  const qImg = getSpellImg(spells[0].id);
  const wImg = getSpellImg(spells[1].id);
  const eImg = getSpellImg(spells[2].id);
  const rImg = getSpellImg(spells[3].id);

  const rateKey = displayPickrate ? "mostPlayed" : "mostWinrate";

  const evolvePriority = getEvolvesPriority(evolves?.[rateKey].order);

  let skillsOrder = skills[rateKey].order;

  while (skillsOrder.length < MAX_LVL) {
    skillsOrder += "0";
  }

  const skillPriority = getSkillsPriority(skillsOrder);
  const skillOrderArr = Array.from(skillsOrder);

  const getSpellPriorityContainer = (index, arr) => {
    let skillKey, skillImg;

    switch (Object.keys(arr[index - 1])[0]) {
      case "Q":
        skillImg = qImg;
        skillKey = "Q";
        break;
      case "W":
        skillImg = wImg;
        skillKey = "W";
        break;
      case "E":
        skillImg = eImg;
        skillKey = "E";
        break;
      case "R":
        skillImg = rImg;
        skillKey = "R";
        break;
      default:
    }

    return (
      <>
        <img src={skillImg} alt="slt" />
        <span>{skillKey}</span>
      </>
    );
  };

  const getSkillPriorityContainer = (index) =>
    getSpellPriorityContainer(index, skillPriority);

  const getEvolvesPriorityContainer = (index) =>
    getSpellPriorityContainer(index, evolvePriority);

  const getSkillsOrderContainer = (currSkillIndex) => {
    const containers = [];

    skillOrderArr.forEach((skillUped, index) => {
      const isSkillUped = skillUped === currSkillIndex;

      const Container = isSkillUped ? (
        <SkillOrderContainerFilled
          key={index}
          i={index}
        ></SkillOrderContainerFilled>
      ) : (
        <SkillOrderContainerEmpty key={index}></SkillOrderContainerEmpty>
      );

      containers.push(Container);
    });

    return containers;
  };

  const SkillOrderContainerFilled = ({ i }) => (
    <span style={{ background: "rgba(247, 247, 255, 0.1)", color: "white" }}>
      {i + 1}
    </span>
  );

  const SkillOrderContainerEmpty = () => (
    <span style={{ background: "#7878B4" }}></span>
  );

  const SkillPriorityFrame = ({ children }) => (
    <div id="skills-priority-frame">
      <span>{lang.skillPriority}</span>
      <div className="skills-priority-container">{children}</div>
    </div>
  );
  const SkillPriorityContainer = ({ priorityNb }) => (
    <div className="single-skill-priority-container">
      {getSkillPriorityContainer(priorityNb)}
    </div>
  );

  const SpellPrioritySeparator = () => (
    <div className="skill-priority-separator">
      <span>{">"}</span>
    </div>
  );

  const SkillContainer = ({ srcImg, skillIndex }) => (
    <div className="skill-container">
      <img src={srcImg} alt="slt" />
      <div className="skill-path">{getSkillsOrderContainer(skillIndex)}</div>
    </div>
  );

  const EvolvePriorityFrame = ({ children }) => (
    <div id="skills-speciality-frame">
      <span>{lang.evolvePriority}</span>
      <div className="skills-priority-container">{children}</div>
    </div>
  );

  const EvolvePriorityContainer = ({ priorityNb }) => (
    <div className="single-skill-priority-container">
      {getEvolvesPriorityContainer(priorityNb)}
    </div>
  );

  const EmptyEvolveContainer = () => (
    <span style={{ flex: "1", fontStyle: "italic", margin: "1rem" }}>
      {lang.noEvolve}
    </span>
  );

  return (
    <div id="skills-frame">
      <div id="champ-skills-path-frame">
        <SkillContainer srcImg={qImg} skillIndex="1" />
        <SkillContainer srcImg={wImg} skillIndex="2" />
        <SkillContainer srcImg={eImg} skillIndex="3" />
        <SkillContainer srcImg={rImg} skillIndex="4" />
      </div>

      <div id="skills-and-evolutions-priority-frame">
        <SkillPriorityFrame>
          <SkillPriorityContainer priorityNb={1} />
          <SpellPrioritySeparator />
          <SkillPriorityContainer priorityNb={2} />
          <SpellPrioritySeparator />
          <SkillPriorityContainer priorityNb={3} />
        </SkillPriorityFrame>

        <EvolvePriorityFrame>
          {evolvePriority ? (
            <>
              <EvolvePriorityContainer priorityNb={1} />
              <SpellPrioritySeparator />
              <EvolvePriorityContainer priorityNb={2} />
              <SpellPrioritySeparator />
              <EvolvePriorityContainer priorityNb={3} />
            </>
          ) : (
            <EmptyEvolveContainer />
          )}
        </EvolvePriorityFrame>
      </div>
    </div>
  );
}

function getSkillsPriority(skillsPath) {
  const matchCond = (i) =>
    skillsPath.match(new RegExp(i, "g")).length < MAX_SKILL_LVL
      ? MAX_LVL
      : skillsPath.lastIndexOf(`${i}`);

  const skillsArr = [
    {
      Q: matchCond(1),
    },
    {
      W: matchCond(2),
    },
    {
      E: matchCond(3),
    },
  ];

  sortByValue(skillsArr);

  return skillsArr;
}

function getEvolvesPriority(evolvesPath) {
  if (!evolvesPath) return null;

  const getIndex = (i) => evolvesPath.indexOf(`${i}`);

  const qIndex = getIndex(1);
  const wIndex = getIndex(2);
  const eIndex = getIndex(3);
  const rIndex = getIndex(4);

  const hasEvolve = qIndex || wIndex || eIndex || rIndex;

  if (!hasEvolve) return null;

  const evolvesArr = [
    {
      Q: qIndex,
    },
    {
      W: wIndex,
    },
    {
      E: eIndex,
    },
    {
      R: rIndex,
    },
  ];

  sortByValue(evolvesArr);

  return evolvesArr;
}

function sortByValue(array) {
  array.sort((a, b) => Object.values(a)[0] > Object.values(b)[0]);
}

export default ChampSkills;
