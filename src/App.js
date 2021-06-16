import React, { useState } from "react";
import Header from "./components/Header";
import Sections from "./components/Sections";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>
      <Header> </Header>
      <Sections>
        <div class="sections"></div>
      </Sections>
      <Footer />
    </React.Fragment>
  );
}

export default App;
