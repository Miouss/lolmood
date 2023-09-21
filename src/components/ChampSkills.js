import { getSpellImg } from "./runesImg";

import champJSON from "../assets/loldata/current/data/en_US/championFull.json";

import "../styles/ChampSkills.css";

function ChampSkills({ evolves, champName, skills, displayPickrate }) {
  let qImg = getSpellImg(champJSON["data"][champName]["spells"][0]["id"]);
  let wImg = getSpellImg(champJSON["data"][champName]["spells"][1]["id"]);
  let eImg = getSpellImg(champJSON["data"][champName]["spells"][2]["id"]);
  let rImg = getSpellImg(champJSON["data"][champName]["spells"][3]["id"]);

  let evolvePriority = displayPickrate
    ? getEvolvesPriority(evolves?.mostPlayed.order)
    : getEvolvesPriority(evolves?.mostWinrate.order);

  let skillsOrder = displayPickrate
    ? skills["mostPlayed"].order
    : skills["mostWinrate"].order;

  while (skillsOrder.length < 17) {
    skillsOrder += "0";
  }
  let skillPriority = getSkillsPriority(skillsOrder);

  const getSkillPriorityContainer = (index, array) => {
    let container = undefined;
    let skillKey, skillImg;

    switch (Object.keys(array[index - 1])[0]) {
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

    container = (
      <>
        <img src={skillImg} alt="slt" />
        <span>{skillKey}</span>
      </>
    );
    return container;
  };

  const getSkillsOrderContainer = (skillIndex) => {
    let container = [];

    Array.from(skillsOrder).forEach((skillUped, index) => {
      if (skillUped === skillIndex) {
        container.push(
          <span
            style={{ background: "rgba(247, 247, 255, 0.1)", color: "white" }}
          >
            {index + 1}
          </span>
        );
      } else {
        container.push(<span style={{ background: "#7878B4" }}></span>);
      }
    });

    return container;
  };

  const checkEvolvePriority = (skillPriority) => {
    if (skillPriority.length === 0) {
      return (
        <span style={{ flex: "1", fontStyle: "italic", margin: "1rem" }}>
          This champ has no evolution
        </span>
      );
    }

    return (
      <>
        <div className="single-skill-priority-container">
          {getSkillPriorityContainer(1, evolvePriority)}
        </div>
        <div className="skill-priority-separator">
          <span>{">"}</span>
        </div>
        <div className="single-skill-priority-container">
          {getSkillPriorityContainer(2, evolvePriority)}
        </div>
        <div className="skill-priority-separator">
          <span>{">"}</span>
        </div>
        <div className="single-skill-priority-container">
          {getSkillPriorityContainer(3, evolvePriority)}
        </div>
      </>
    );
  };

  return (
    <>
      <div id="skills-frame">
        <div id="champ-skills-path-frame">
          <div className="skill-container">
            <img src={qImg} alt="slt" />
            <div className="skill-path">{getSkillsOrderContainer("1")}</div>
          </div>
          <div className="skill-container">
            <img src={wImg} alt="slt" />
            <div className="skill-path">{getSkillsOrderContainer("2")}</div>
          </div>
          <div className="skill-container">
            <img src={eImg} alt="slt" />
            <div className="skill-path">{getSkillsOrderContainer("3")}</div>
          </div>
          <div className="skill-container">
            <img src={rImg} alt="slt" />
            <div className="skill-path">{getSkillsOrderContainer("4")}</div>
          </div>
        </div>

        <div id="skills-and-evolutions-priority-frame">
          <div id="skills-priority-frame">
            <span>Skills priority</span>
            <div className="skills-priority-container">
              <div className="single-skill-priority-container">
                {getSkillPriorityContainer(1, skillPriority)}
              </div>
              <div className="skill-priority-separator">
                <span>{">"}</span>
              </div>
              <div className="single-skill-priority-container">
                {getSkillPriorityContainer(2, skillPriority)}
              </div>
              <div className="skill-priority-separator">
                <span>{">"}</span>
              </div>
              <div className="single-skill-priority-container">
                {getSkillPriorityContainer(3, skillPriority)}
              </div>
            </div>
          </div>
          <div id="skills-speciality-frame">
            <span>Evolution Priority</span>

            <div className="skills-priority-container">
              {checkEvolvePriority(evolvePriority)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function getSkillsPriority(skillsPath) {
  return [
    {
      Q: skillsPath.match(/1/g).length < 5 ? 17 : skillsPath.lastIndexOf("1"),
    },
    {
      W: skillsPath.match(/2/g).length < 5 ? 17 : skillsPath.lastIndexOf("2"),
    },
    {
      E: skillsPath.match(/3/g).length < 5 ? 17 : skillsPath.lastIndexOf("3"),
    },
  ].sort((a, b) => Object.values(a)[0] > Object.values(b)[0]);
}

function getEvolvesPriority(evolvesPath) {
  if (!evolvesPath) return null;

  let qIndex = evolvesPath.indexOf("1");
  let wIndex = evolvesPath.indexOf("2");
  let eIndex = evolvesPath.indexOf("3");
  let rIndex = evolvesPath.indexOf("4");

  if (qIndex === -1) qIndex = 5;
  if (wIndex === -1) wIndex = 5;
  if (eIndex === -1) eIndex = 5;
  if (rIndex === -1) rIndex = 5;

  if ((qIndex === 5) & (wIndex === 5) & (eIndex === 5) & (rIndex === 5)) {
    return [];
  }

  return [
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
  ].sort((a, b) => Object.values(a)[0] > Object.values(b)[0]);
}

export default ChampSkills;
