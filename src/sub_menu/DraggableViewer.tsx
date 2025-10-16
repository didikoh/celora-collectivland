import { useEffect, useRef } from "react";
import styles from "./DraggableViewer.module.css";
import { IoCloseOutline } from "react-icons/io5";

const DraggableViewer = ({
  image,
  name,
  onClose,
}: {
  image: string;
  name: string;
  onClose: () => void;
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 100, y: -584 });
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = viewerRef.current;
    const dragHandle = headerRef.current;
    if (!el || !dragHandle) return;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault(); // avoid text selection
      offset.current = {
        x: e.clientX - pos.current.x,
        y: e.clientY - pos.current.y,
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      pos.current = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      };
      el.style.left = `${pos.current.x}px`;
      el.style.top = `${pos.current.y}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    dragHandle.addEventListener("mousedown", onMouseDown);
    return () => {
      dragHandle.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <div
      ref={viewerRef}
      className={styles.imageViewerContainer}
      style={{ position: "absolute", top: -584, left: 100 }}
    >
      <div className={styles.title} ref={headerRef}>
        <h1>Project Info</h1>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoCloseOutline />
        </button>
      </div>
      <img src={image} alt={name} />
    </div>
  );
};

export default DraggableViewer;
