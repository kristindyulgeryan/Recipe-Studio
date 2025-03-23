import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    console.log(value);
  };

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <i
        className={`fa-solid fa-magnifying-glass ${styles.magnifier}`}
        onClick={handleToggle}
      ></i>
      <input
        type="text"
        className={styles.input}
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}
