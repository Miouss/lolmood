import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Switch from "bootstrap-switch-button-react";

import Champ from "./ChampPresentation";
import Runes from "./ChampRunes";
import Items from "./ChampItems";
import Sums from "./ChampSums";
import Skills from "./ChampSkills";

import backButtonSVG from "../assets/back_button.svg";

import { API_HOST } from "../config";

import "../styles/ChampStats.css";

function ChampStats() {
  const [champStats, setChampStats] = useState(undefined);
  const [displayPickRate, setDisplayPickRate] = useState(true);

  const nav = useNavigate();
  const location = useLocation();

  let champName = location["pathname"].replace("/champ/", "");
  champName = champName.charAt(0).toUpperCase() + champName.slice(1);

  async function fetchChampStats() {
    const url = `${API_HOST}/champ/${champName}`;

    const res = await fetch(url);

    const data = await res.json();

    if (typeof data === "string") {
      alert(data);
      nav("/");
    }

    setChampStats(data);
  }

  useEffect(() => {
    fetchChampStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!champStats) return null;

  return (
    <>
      <div id="champ-stats-component">
        <div id="switch-component">
          <Switch
            onlabel="Win Rate"
            onstyle="info"
            offlabel="Pick Rate"
            offstyle="info"
            width={130}
            onChange={() => setDisplayPickRate(!displayPickRate)}
          />
        </div>

        <button id="back-button-component">
          <img
            src={backButtonSVG}
            onClick={() => (location.state === null ? nav("/") : nav(-1))}
            alt="slt"
          />
        </button>

        <div id="champ-component">
          <Champ champName={champName} />
        </div>

        <div id="runes-component">
          <Runes
            runes={champStats.runes}
            mods={champStats.mostPlayedStatsMods.mods}
            displayPickRate={displayPickRate}
          />
        </div>

        <div id="sums-component">
          <Sums
            summonersData={champStats.summoners}
            displayPickRate={displayPickRate}
          />
        </div>

        <div id="items-component">
          <Items
            starting={champStats.items.starting}
            completed={champStats.items.completed}
            displayPickRate={displayPickRate}
          />
        </div>

        <div id="skills-component">
          <Skills
            skills={champStats.skillsOrder}
            evolves={champStats.evolvesOrder}
            champName={champName}
            displayPickRate={displayPickRate}
          />
        </div>
      </div>
    </>
  );
}

export default ChampStats;
