import { Routes, Route } from "react-router-dom";

import SearchBar from "./SearchBar";
import SummonerStats from "./SummonerStats";
import ChampStats from "./ChampStats";

import "../styles/Main.css";

function Main(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="search-container">
              <SearchBar
                hideCount={true}
                data={props.data}
                setData={props.setData}
              />
            </div>
          </>
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
