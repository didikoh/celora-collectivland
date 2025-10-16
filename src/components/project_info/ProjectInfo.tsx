import { IoCloseOutline } from "react-icons/io5";
import styles from "./ProjectInfo.module.css";
import { useAppContext } from "../../context/AppContext";
import { useRef, useEffect } from "react";

const ProjectInfo = () => {
  const { setPage } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) {
      console.error("Container or title ref is not set");
      return;
    }

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      offsetX = e.clientX - container.offsetLeft;
      offsetY = e.clientY - container.offsetTop;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      container.style.left = `${e.clientX - offsetX}px`;
      container.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    title.addEventListener("mousedown", onMouseDown);
    return () => title.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleClose = () => setPage("Home");

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.title} ref={titleRef}>
        <h1>Project Info</h1>
        <button className={styles.closeBtn} onClick={handleClose}>
          <IoCloseOutline />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <p>Developer </p>
          <p>Collectiv Land </p>
        </div>
        <div className={styles.contentItem}>
          <p>Project Type </p>
          <p>Mixed Development </p>
        </div>
        <div className={styles.contentItem}>
          <p>Built-Up </p>
          <p>From 600 - 1,500 sqft </p>
        </div>
        <div className={styles.contentItem}>
          <p>Nos. of Storeys </p>
          <p>32 Storey </p>
        </div>
        <div className={styles.contentItem}>
          <p>Total Units </p>
          <p>242 Units </p>
        </div>
        <div className={`${styles.contentItem} ${styles.last}`}>
          <p>Completion Year </p>
          <p>XXXX </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
