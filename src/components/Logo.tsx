import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img src="./assets/Celora Logo.webp" alt="logo" className={styles.logo} />
    </div>
  );
};

export default Logo;
