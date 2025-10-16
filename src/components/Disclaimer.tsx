import styles from "./Disclaimer.module.css";
import { useAppContext } from "../context/AppContext";
import {
  PiMouseLeftClickFill,
  PiMouseMiddleClickFill,
  PiMouseRightClickFill,
} from "react-icons/pi";

const Disclaimer = () => {
  const { setToggleDisclaimer } = useAppContext();
  // const [showIntroduction, setShowIntroduction] = useState(false);

  return (
    <section className={styles.disclaimer}>
      <div className={styles.disclaimerContainer}>
        <div className={styles.disclaimerLogo}>
          <img src={"./assets/Celora Logo.webp"} alt="Logo" />
        </div>
        {/* <div
          className={`${styles.disclaimerTextWrapper} ${
            showIntroduction ? styles.active : ""
          }`}
        >
          <div className={styles.disclaimerTitle}>
            <h1>DISCLAIMER</h1>
          </div>
          <div className={styles.disclaimerText}>
            <p>
              All plan layouts, design, specification and information contained
              herein are subject to change as required by the relevant
              authorities and/or the developers architect and cannot be form
              part of an offer or contract. Whilst every care has been taken in
              preparation and providing this information at the time Vendor,
              Proprietor, Developer & its authorized employees/agents cannot be
              held liable for any variation(s). <br />
              <br />
              All illustration, drawings, designs, sketches, models, images,
              visuals and picture are artist impression only. The items are
              subject to variations, modification, changes and substitutions as
              may be recommended by the Company’s consultant and architect
              and/or relevant Approving Authorities.
            </p>
          </div>
          <button
            className={styles.disclaimerBtn}
            onClick={() => setShowIntroduction(true)}
          >
            Agree
          </button>
        </div> */}
        <div className={`${styles.introduction} ${styles.active}`}>
          <div className={styles.introductionTitle}>
            <h1>
              WELCOME TO <br />
              Celora RESIDENCE
            </h1>
          </div>
          <div className={styles.introductionGuide}>
            <div className={styles.introductionGuideCard}>
              <PiMouseLeftClickFill />
              <p>LMB Click and Drag to Rotate</p>
            </div>
            <hr />
            <div className={styles.introductionGuideCard}>
              <PiMouseRightClickFill />
              <p>RMB Click and Drag to Move</p>
            </div>
            <hr />
            <div className={styles.introductionGuideCard}>
              <PiMouseMiddleClickFill />
              <p>Mouse Wheel to Zoom</p>
            </div>
          </div>
          <button
            className={styles.introductionBtn}
            onClick={() => setToggleDisclaimer(false)}
          >
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;
