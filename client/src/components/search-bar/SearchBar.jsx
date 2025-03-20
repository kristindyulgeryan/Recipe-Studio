import { useState } from "react";
import styles from "./SearchBar.module.css"; // Import CSS Module

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <i className={`fa-solid fa-magnifying-glass ${styles.magnifier}`} onClick={handleToggle}></i>
      <input type="text" className={styles.input} placeholder="Search..." />
      
    </div>
  );
}