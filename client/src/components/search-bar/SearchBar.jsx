import { startTransition, useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

// export default function SearchBar() {
//   const [isActive, setIsActive] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleToggle = () => {
//     setIsActive((prev) => !prev);
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     console.log(value);
//   };

//   return (
//     <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
//       <i
//         className={`fa-solid fa-magnifying-glass ${styles.magnifier}`}
//         onClick={handleToggle}
//       ></i>
//       <input
//         type="text"
//         className={styles.input}
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleChange}
//       />
//     </div>
//   );
// }

import { useSearchRecipes } from "../../api/recipeApi";

export default function SearchBar({ onSearchResults }) {
  const [isActive, setIsActive] = useState(false);
  const { query, setQuery, results } = useSearchRecipes();

  const handleToggle = () => {
    startTransition(() => {
      setIsActive((prev) => !prev);
      if (!isActive) {
        setQuery("");
        onSearchResults?.(null);
      }
    });
  };

  const handleChange = (e) => {
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  useEffect(() => {
    if (onSearchResults) {
      onSearchResults(results);
    }
  }, [results, onSearchResults]);

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <i
        className={`fa-solid fa-magnifying-glass ${styles.magnifier}`}
        onClick={handleToggle}
        aria-label={isActive ? "Close search" : "Open search"}
      ></i>
      {isActive && (
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search recipes..."
            value={query}
            onChange={handleChange}
            aria-label="Search recipes"
          />
        </div>
      )}
    </div>
  );
}
