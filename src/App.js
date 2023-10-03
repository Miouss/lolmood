import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState(null);

  const [lang, setLang] = useState("fr");

  const [frFlagWidth, setFrFlag] = useState("100%");
  const [enFlagWidth, setEnFlag] = useState("50%");

  return (
    <>
      {" "}
      <BrowserRouter>
        <header>
          <Header
            data={data}
            setData={setData}
            lang={lang}
            setLang={setLang}
            frFlagWidth={frFlagWidth}
            enFlagWidth={enFlagWidth}
            setFrFlag={setFrFlag}
            setEnFlag={setEnFlag}
          />
        </header>
        <main>
          <Main data={data} setData={setData} lang={lang} setLang={setLang} />
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
