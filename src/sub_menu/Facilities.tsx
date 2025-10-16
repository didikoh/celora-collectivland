import { useEffect, useState } from "react";
import styles from "./Facilities.module.css";
import axios from "axios";
import DraggableViewer from "./DraggableViewer";
import { useAppContext } from "../context/AppContext";

const Facilities = () => {
  const { level, setLevel } = useAppContext();
  const [facilities, setFacilities] = useState<any[]>([]);
  const [openViewers, setOpenViewers] = useState<Set<number>>(new Set());

  useEffect(() => {
    axios
      .get("json/Facilities.json")
      .then((res) => {
        setFacilities(res.data);
      })
      .catch((err) => {
        console.error("Failed to load facilities:", err);
      });
  }, []);

  const toggleViewer = (index: number) => {
    setOpenViewers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className={styles.levelContainer}>
        <label className={styles.levelLabel}>Level</label>
        <button
          className={`${styles.levelButton} ${level === "Level 8" ? styles.active : ""
            }`}
          onClick={() => setLevel("Level 8")}
        >
          Level 8
        </button>
        <button
          className={`${styles.levelButton} ${level === "Rooftop" ? styles.active : ""
            }`}
          onClick={() => setLevel("Rooftop")}
        >
          Rooftop
        </button>
      </div>

      <div className={styles.facilitiesContainer}>
        {facilities.map((facility, index) => (
          <div key={index} className={styles.facilityItem}>
            <div className={styles.facilityName}>
              {index + 1}. {facility.name}
            </div>
            {facility.image != "" && (
              <>
                <button
                  className={styles.facilityBtn}
                  onClick={() => toggleViewer(index)}
                >
                  <img src="./assets/FacImg.webp" alt="" />
                </button>

                {openViewers.has(index) && (
                  <DraggableViewer
                    image={`./sample/${index + 1}.png`}
                    name={facility.name}
                    onClose={() => {
                      setOpenViewers((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(index);
                        return newSet;
                      });
                    }}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Facilities;
