import { Routes, Route } from "react-router";

import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
