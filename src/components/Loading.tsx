import { useAppContext } from "../context/AppContext";
import styles from "./Loading.module.css";

const Loading = () => {
  const { isLoading, progress } = useAppContext();
  return (
    <>
      {isLoading && (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner}></div>
          <div>Loading Building...</div>
          {progress && (
            <div className={styles.loadingProgressBar}>
              <div
                className={styles.loadingProgressBarFill}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Loading;
