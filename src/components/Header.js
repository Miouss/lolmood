import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logoSVG from "../assets/logo.svg";
import englishFlag from "../assets/english-flag.svg";
import frenchFlag from "../assets/french-flag.svg";

import SearchBar from "./SearchBar";

import "../styles/Header.css";

function Header(props) {
  let location = useLocation();
  const navigate = useNavigate();

  if (location["pathname"] === "/") {
    return null;
  }
  return (
    <>
      <div id="header-logo" onClick={() => navigate("/")}>
        <img src={logoSVG} alt="Logo" />
        <span>LOL Mood</span>
      </div>

      <div id="search-bar">
        <SearchBar hideCount={false} setData={props.setData} />
      </div>

      <div id="language-select">
        <div
          onClick={() => {
            props.setFrFlag("100%");
            props.setEnFlag("50%");
            props.setLang("fr");
          }}
        >
          <img style={{ width: props.frFlagWidth }} src={frenchFlag} />
        </div>

        <div
          onClick={() => {
            props.setEnFlag("100%");
            props.setFrFlag("50%");
            props.setLang("en");
          }}
        >
          <img style={{ width: props.enFlagWidth }} src={englishFlag} />
        </div>
      </div>
    </>
  );
}

export default Header;
