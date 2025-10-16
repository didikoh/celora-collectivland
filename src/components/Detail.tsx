import styles from "./Detail.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";

const Detail = () => {
  const { setSelectedUnit } = useAppContext();
  const handleClose = () => {
    setSelectedUnit(null);
  };
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <div className={styles.titleContainer}>
          <div className={styles.titleText1}>Unit</div>
          <div className={styles.titleText2}>C-36-05</div>
          <div className={styles.titleText3}>queuing: 0</div>
        </div>
        <div className={styles.sideContainer}>
          <div className={styles.sideText1}>Type</div>
          <div className={styles.sideText2}>2B - 917 sq.ft</div>
          <div className={styles.line}></div>
          <div className={styles.sideBox}>
            <img src="./assets/FacImg.webp" alt="" className={styles.sideImg} />
            <div className={styles.sideBoxText}>2</div>
          </div>
          <div className={styles.sideBox}>
            <img src="./assets/FacImg.webp" alt="" className={styles.sideImg} />
            <div className={styles.sideBoxText}>2</div>
          </div>
          <div className={styles.sideBox}>
            <img src="./assets/FacImg.webp" alt="" className={styles.sideImg} />
            <div className={styles.sideBoxText}>2</div>
          </div>
          <img className={styles.sideFloor} src="./sample/1.png" alt="" />
        </div>
      </div>
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={handleClose}>
          <IoCloseOutline />
        </button>
        <button className={styles.Btn}> 360 Virtual Tour</button>
        <button className={styles.Btn}> Level View</button>
        <img src="./sample/1.png" alt="" className={styles.contentImg} />
      </div>
    </div>
  );
};

export default Detail;
