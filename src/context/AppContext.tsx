import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(undefined);

export const AppProvider = ({ children }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0);
  const [page, setPage] = useState("Home");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [toggleDisclaimer, setToggleDisclaimer] = useState(true);
  const [type,setType] = useState('')
  const [orientation, setOrientation] = useState("");
  const [level,setLevel] = useState("Level 8")

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化检查窗口大小
  }, []);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        direction,
        setDirection,
        page,
        setPage,
        isLoading,
        setIsLoading,
        progress,
        setProgress,
        selectedUnit,
        setSelectedUnit,
        toggleDisclaimer,
        setToggleDisclaimer,
        type,
        setType,
        orientation,
        setOrientation,
        level,
        setLevel
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
