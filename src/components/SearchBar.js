import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGamesData } from "./fetchData";

import SearchOption from "./SearchOption";

import "../styles/SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MIN_COUNT = 5;
const MAX_COUNT = 50;

function SearchBar({ hideCount, setData }) {
  const navigate = useNavigate();

  const regionSelectedRef = useRef();
  const countInputRef = useRef();
  const summonerInputRef = useRef();

  const [isRegionSelectClicked, setIsRegionSelectClicked] = useState(false);
  const [isSummonerInputClicked, setIsSummonerInputClicked] = useState(false);
  const [isCountInputClicked, setIsCountInputClicked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const requestData = async (summonerName, regionSelected, count) => {
    const data = await fetchGamesData(summonerName, regionSelected, count);

    setIsSearching(false);

    setData(data);

    navigate(`/games/${regionSelected}/${data.account.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const summonerName = summonerInputRef.current.value;
    const count = parseInt(countInputRef.current.value);
    const regionSelected = regionSelectedRef.current.value;

    const isRegionSelected = regionSelected !== undefined;
    const isSummonerNameEntered = summonerName !== "";
    const isCountInRange = count >= MIN_COUNT && count <= MAX_COUNT;

    if (!isRegionSelected) return alert("You have to select a region first");
    if (!isSummonerNameEntered)
      return alert("You have to enter a summoner name to search");
    if (!isCountInRange)
      return alert(
        `You have to enter a number of history game between ${MIN_COUNT} - ${MAX_COUNT}`
      );

    setIsSearching(true);
    requestData(summonerName, regionSelected, count);
  };

  const handleOnClickRegion = () => {
    setIsRegionSelectClicked(!isRegionSelectClicked);
  };

  const handleOnClickSummoner = () => {
    setIsSummonerInputClicked(!isSummonerInputClicked);
  };

  const handleOnClickCount = () => {
    setIsCountInputClicked(!isCountInputClicked);
  };

  const [regionBgPos, isRegionSelectHidden] = isRegionSelectClicked
    ? ["bottom", false]
    : ["center", true];

  const [summonerBackground, isSummonerInputHidden] = isSummonerInputClicked
    ? ["bottom", false]
    : ["center", true];

  const [countBackground, isCountInputHidden] = isCountInputClicked
    ? ["bottom", false]
    : ["center", true];

  const searchIcon = isSearching ? faSpinner : faMagnifyingGlass;

  return (
    <form onSubmit={handleSubmit}>
      <div
        id="region-select-block"
        style={{ backgroundPosition: `${regionBgPos}` }}
      >
        <label onClick={handleOnClickRegion} htmlFor="region-select">
          Region
        </label>

        <select
          ref={regionSelectedRef}
          hidden={isRegionSelectHidden}
          id="region-select"
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
        hidden={hideCount}
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
          spin={searchIcon === faSpinner}
        />
      </button>
    </form>
  );
}

export default SearchBar;
