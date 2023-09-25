import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGamesData } from "./fetchData";

import SearchOption from "./SearchOption";

import "../styles/SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  const [regionSelected, setRegionSelected] = useState(undefined);
  const countInputRef = useRef();
  const summonerInputRef = useRef();

  const [isRegionSelectHidden, setRegionSelectHidden] = useState(true);
  const [regionBackground, setRegionBackground] = useState("center");

  const [isSummonerInputHidden, setSummonerInputHidden] = useState(true);
  const [summonerBackground, setSummonerBackground] = useState("center");

  const [isCountInputHidden, setCountInputHidden] = useState(true);
  const [countBackground, setCountBackground] = useState("center");

  const [searchIcon, setSearchIcon] = useState(faMagnifyingGlass);

  const navigate = useNavigate();

  async function requestData(summonerName, count) {
    const data = await fetchGamesData(summonerName, regionSelected, count);

    setSearchIcon(faMagnifyingGlass);

    props.setData(data);

    navigate(`/games/${regionSelected}/${data.account.name}`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const summonerName = summonerInputRef.current.value;
    const count = parseInt(countInputRef.current.value);

    if (regionSelected === undefined) {
      alert("You have to select a region first");
    } else if (summonerName === "") {
      alert("You have to enter a summoner name to search");
    } else if (isNaN(count) || count < 1 || count > 49) {
      alert("You have to enter a number of history game between 1 - 49");
    } else {
      setSearchIcon(faSpinner);
      requestData(summonerName, count);
    }
  };

  const handleOnClickRegion = () => {
    setRegionSelectHidden(!isRegionSelectHidden);
    if (regionBackground === "center") {
      setRegionBackground("bottom");
    } else {
      setRegionBackground("center");
    }
  };

  const handleOnClickSummoner = () => {
    setSummonerInputHidden(!isSummonerInputHidden);
    if (summonerBackground === "center") {
      setSummonerBackground("bottom");
    } else {
      setSummonerBackground("center");
    }
  };

  const handleOnClickCount = () => {
    setCountInputHidden(!isCountInputHidden);
    if (countBackground === "center") {
      setCountBackground("bottom");
    } else {
      setCountBackground("center");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          id="region-select-block"
          style={{ backgroundPosition: `${regionBackground}` }}
        >
          <label onClick={handleOnClickRegion} htmlFor="region-select">
            Region
          </label>
          <select
            hidden={isRegionSelectHidden}
            id="region-select"
            onChange={(e) => setRegionSelected(e.target.value)}
          >
            <SearchOption
              regions={[
                "EUW",
                "EUNE",
                "NA",
                "BR",
                "LAN",
                "LAS",
                "OCE",
                "KR",
                "RU",
                "TR",
                "JP",
              ]}
            />
          </select>
        </div>
        <div
          id="summoner-search-block"
          style={{ backgroundPosition: `${summonerBackground}` }}
        >
          <label htmlFor="summoner-search" onClick={handleOnClickSummoner}>
            Summoner Search
          </label>
          <input
            hidden={isSummonerInputHidden}
            id="summoner-search"
            ref={summonerInputRef}
          />
        </div>
        <div
          hidden={props.hideCount}
          id="count-search-block"
          style={{ backgroundPosition: `${countBackground}` }}
        >
          <label htmlFor="count-search" onClick={handleOnClickCount}>
            Number of games
          </label>
          <input
            hidden={isCountInputHidden}
            id="count-search"
            defaultValue="10"
            ref={countInputRef}
          />
        </div>
        <button type="submit" id="search-button">
          <FontAwesomeIcon
            icon={searchIcon}
            fontSize="1.8rem"
            spin={searchIcon === faSpinner ? true : false}
          />
        </button>
      </form>
    </>
  );
}

export default SearchBar;
