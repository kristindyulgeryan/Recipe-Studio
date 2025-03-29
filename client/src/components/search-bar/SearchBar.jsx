import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

import { useSearchRecipes } from "../../api/recipeApi";

// export default function SearchBar({ onSearchResults }) {
//   const [isActive, setIsActive] = useState(false);
//   const { query, setQuery, searchResults, clearSearch } = useSearchRecipes();

//   const handleToggle = () => {
//     setIsActive((prev) => {
//       if (!prev) {
//         // When activating search
//         return true;
//       } else {
//         // When deactivating search
//         clearSearch();
//         onSearchResults?.(null);
//         return false;
//       }
//     });
//   };

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//   };

//   useEffect(() => {
//     if (onSearchResults) {
//       onSearchResults(searchResults); // Changed from 'results' to 'searchResults'
//     }
//   }, [searchResults, onSearchResults]); // Changed from 'results' to 'searchResults'

//   return (
//     <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
//       <i
//         className={`fa-solid fa-magnifying-glass ${styles.magnifier}`}
//         onClick={handleToggle}
//         aria-label={isActive ? "Close search" : "Open search"}
//       ></i>
//       {isActive && (
//         <div className={styles.searchWrapper}>
//           <input
//             type="text"
//             className={styles.input}
//             placeholder="Search recipes..."
//             value={query}
//             onChange={handleChange}
//             aria-label="Search recipes"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

export default function SearchBar({ onSearchResults }) {
  const [isActive, setIsActive] = useState(false);
  const { query, setQuery, searchResults, clearSearch } = useSearchRecipes();

  const handleToggle = () => {
    setIsActive((prev) => {
      if (!prev) {
        // Activating search
        return true;
      } else {
        // Deactivating search
        clearSearch();
        return false;
      }
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Only notify parent when search is active
  useEffect(() => {
    if (isActive) {
      onSearchResults?.(searchResults);
    } else {
      onSearchResults?.(null);
    }
  }, [searchResults, isActive, onSearchResults]);

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
