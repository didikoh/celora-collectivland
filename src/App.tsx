import { useState } from "react";
import "./App.css";
import BottomBar from "./components/BottomBar";
import MyScene from "./components/MyScene";
import Loading from "./components/Loading";
import Logo from "./components/Logo";
import Compass from "./components/Compass";
import ProjectInfo from "./components/project_info/ProjectInfo";
import Location from "./components/location/Location";
import { useAppContext } from "./context/AppContext";
import Detail from "./components/Detail";
import Disclaimer from "./components/Disclaimer";

function App() {
  const { page, setIsLoading, setProgress, selectedUnit, toggleDisclaimer } =
    useAppContext();
  const [unitLevel, setUnitLevel] = useState(9);

  const handleSceneLoaded = () => {
    setIsLoading(false);
  };
  
  return (
    <>
      <Loading />
      <Logo />
      <Compass />
      {toggleDisclaimer && <Disclaimer />}
      {page === "Project Info" && <ProjectInfo />}
      {page == "Location" && <Location />}
      {selectedUnit && <Detail />}
      <MyScene
        onLoaded={handleSceneLoaded}
        onProgress={setProgress}
        unitLevel={unitLevel}
      />
      <BottomBar setUnitLevel={setUnitLevel} unitLevel={unitLevel} />
    </>
  );
}

export default App;
