import { Routes, Route } from "react-router-dom";

import SearchBar from "./SearchBar";
import SummonerStats from "./SummonerStats";
import ChampStats from "./ChampStats";

import Logo from "../assets/logo.svg";
import "../styles/Main.css";

function Main(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ alignSelf: "center", paddingBottom: "70px" }}>
              <img style={{ width: "200px" }} src={Logo} alt="logo" />
            </div>
            <div className="search-container">
              <SearchBar
                hideCount={true}
                data={props.data}
                setData={props.setData}
              />
            </div>
          </div>
        }
      />
      <Route
        path="/games/:region/:summonerName"
        element={<SummonerStats {...props} />}
      />
      <Route path="/champ/:champName" element={<ChampStats />} />
    </Routes>
  );
}

export default Main;
