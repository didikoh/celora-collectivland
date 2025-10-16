import { useState } from "react";
import styles from "./Location.module.css";
import { useAppContext } from "../../context/AppContext";

const Location = () => {
  const { setPage } = useAppContext();
  const [view, setView] = useState("360");

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles.back}`}
        onClick={() => setPage("Home")}
      >
        Back
      </button>

      <div className={styles.btnContainer}>
        <button
          className={`${styles.btn} ${view === "360" ? styles.active : ""}`}
          onClick={() => setView("360")}
        >
          360 Aerial View
        </button>
        <button
          className={`${styles.btn} ${view === "Map" ? styles.active : ""}`}
          onClick={() => setView("Map")}
        >
          Location Map
        </button>
      </div>

      {view === "360" && (
        <>
          <div className={styles.logo360}>
            <img
              src="./location/360.webp"
              alt="Logo 360"
              className={styles.logo}
            />
          </div>
          <iframe
            src="./location/pano/index.html"
            className={styles.iframe}
          ></iframe>
        </>
      )}

      {view === "Map" && (
        <div className={styles.mapContainer}>
          <img src="./location/map.webp" alt="Map" className={styles.mapImg} />
          <div className={styles.mapText}>
            <h1 className={styles.mapTitle}>Location Map</h1>
            <p className={styles.mapDescription}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
