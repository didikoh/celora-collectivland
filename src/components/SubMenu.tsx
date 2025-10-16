import { useState } from "react";
import styles from "./SubMenu.module.css";
import Unit from "../sub_menu/Unit";
import { useAppContext } from "../context/AppContext";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Facilities from "../sub_menu/Facilities";

const SubMenu = ({ setUnitLevel, unitLevel }: any) => {
  const { page } = useAppContext();
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className={styles.subMenuContainer}>
      <button
        className={styles.visibilityBtn}
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? <FaChevronDown /> : <FaChevronUp />}
      </button>
      {page == "Facilities" && isVisible && <Facilities />}
      {page == "Units" && isVisible && (
        <Unit setUnitLevel={setUnitLevel} unitLevel={unitLevel} />
      )}
    </div>
  );
};

export default SubMenu;
