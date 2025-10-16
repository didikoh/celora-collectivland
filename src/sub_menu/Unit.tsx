import { useEffect } from "react";
import styles from "./Unit.module.css";
import { useAppContext } from "../context/AppContext";

const Unit = ({ setUnitLevel, unitLevel }: any) => {
  const { setType, type, orientation, setOrientation } = useAppContext();
  useEffect(() => {
    setUnitLevel(30);
  }, []);
  const types = [
    { label: "Type A - 600 sf", value: "Type_A" },
    { label: "Type B - 600 sf", value: "Type_B" },
    { label: "Type C - 880 sf", value: "Type_C" },
    { label: "Type D - 1,150 sf", value: "Type_D" },
    { label: "Type E - 1,500 sf", value: "Type_E" },
  ];

  const orientations = [
    { label: "North", value: "North" },
    { label: "South", value: "South" },
    { label: "East", value: "East" },
    { label: "West", value: "West" },
  ];

  const handleSetType = (value: any) => {
    if (type === value) {
      setType("");
    } else {
      setType(value);
    }
  };

  const handleSetOrientation = (value: any) => {
    if (orientation === value) {
      setOrientation("");
    } else {
      setOrientation(value);
    }
  };

  return (
    <>
      <div className={styles.filterUnit}>
        <div className={styles.filterUnitTitle}>Floor Level</div>
        <div className={styles.sliderTextContainer}>
          <span className={styles.sliderLabel}>9</span>
          <span className={styles.sliderLabel}>30</span>
        </div>

        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="9"
            max="30"
            value={unitLevel}
            onChange={(e) => setUnitLevel(parseInt(e.target.value))}
            className={styles.slider}
            style={{
              background: `linear-gradient(to right, #bf9367 0%, #bf9367 ${
                ((unitLevel - 9) / (30 - 9)) * 100
              }%, #ddd ${((unitLevel - 9) / (30 - 9)) * 100}%, #ddd 100%)`,
            }}
          />
          <div className={styles.sliderValueContainer}>
            <div
              className={styles.sliderValue}
              style={{ left: `${((unitLevel - 9) / (30 - 9)) * 100}%` }}
            >
              {unitLevel}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.filterUnit}>
        <div className={styles.filterUnitTitle}>Type</div>
        <div className={`${styles.filterUnitBtns} ${styles.typeBtns}`}>
          {types.map((t) => (
            <button
              key={t.value}
              className={`${styles.filterUnitBtn} ${
                type === t.value ? styles.active : ""
              }`}
              onClick={() => handleSetType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterUnit}>
        <div className={styles.filterUnitTitle}>Orientation</div>
        <div className={`${styles.filterUnitBtns} ${styles.orientationBtns}`}>
          {orientations.map((o) => (
            <button
              key={o.value}
              className={`${styles.filterUnitBtn} ${
                orientation === o.value ? styles.active : ""
              }`}
              onClick={() => handleSetOrientation(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Unit;
