import { useEffect, useRef } from "react";
import styles from "./BottomBar.module.css";
import SubMenu from "./SubMenu";
import { useAppContext } from "../context/AppContext";

const navItems = ["Home", "Project Info", "Location", "Facilities", "Units"];

const BottomBar = ({ setUnitLevel, unitLevel}: any) => {
  const { page, setPage } = useAppContext();
  const selector = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const moveSelector = (target: HTMLButtonElement | null) => {
    if (!target || !selector.current) return;
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement!.getBoundingClientRect();

    selector.current.style.left = `${rect.left - parentRect.left}px`;
    selector.current.style.width = `${rect.width}px`;
  };

  useEffect(() => {
    moveSelector(buttonRefs.current[page]);
  }, [page]);

  useEffect(() => {
    // Initial position
    moveSelector(buttonRefs.current["Home"]);
  }, []);

  return (
    <div className={styles.bottomBarContainer}>
      <div className={styles.bottomNav}>
        <div className={styles.selector} ref={selector}></div>
        {navItems.map((item) => {
          return (
            <button
              key={item}
              ref={(el) => {
                buttonRefs.current[item] = el;
              }}
              className={`${styles.bottomNavBtn} ${
                item === page ? styles.active : ""
              }`}
              onClick={() => {
                setPage(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      {(page === "Units"|| page === "Facilities") && <SubMenu setUnitLevel={setUnitLevel} unitLevel={unitLevel} />}
    </div>
  );
};

export default BottomBar;
