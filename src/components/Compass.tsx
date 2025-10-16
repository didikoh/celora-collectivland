import { useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import styles from "./Compass.module.css";

const Compass = () => {
  const { direction } = useAppContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const value = 320 + (-(direction % (2 * Math.PI)) / Math.PI) * 100;
      wrapperRef.current.style.transform = `translateX(${-value}%)`; 
    }
  }, [direction]);
  return (
    <div className={styles.compassContainer}>
      <div className={`${styles.compassArrow}`}>▼</div>
      <div className={styles.compassWrapper} ref={wrapperRef}>
        {/* simulate repeat */}
        <img src="./assets/compass.png" className={styles.compassImg} />
        <img src="./assets/compass.png" className={styles.compassImg} />
        <img src="./assets/compass.png" className={styles.compassImg} />
        <img src="./assets/compass.png" className={styles.compassImg} />
      </div>
      <div className={`${styles.compassArrow}`}>▲</div>
    </div>
  );
};

export default Compass;
