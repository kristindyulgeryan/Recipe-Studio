import { useCallback, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import request from "../utils/request.js";

const baseUrl = "http://localhost:3030/data/recipe";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    request
      .get(`${baseUrl}?sortBy=_createdOn desc`)
      .then(setRecipes)
      .catch(console.error);
  }, []);

  return { recipes };
};
export const useRecipe = (recipeId) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    request.get(`${baseUrl}/${recipeId}`).then(setRecipe);
  }, [recipeId]);

  return {
    recipe,
  };
};

export const useCreateRecipe = () => {
  const { request } = useAuth();

  const create = async (recipeData) => {
    const response = await request.post(baseUrl, recipeData);
    console.log("Create response:", response);
    return response;
  };

  return {
    create,
  };
};

export const useEditRecipe = () => {
  const { request } = useAuth();

  const edit = async (recipeId, recipeData) => {
    try {
      const response = await request.put(`${baseUrl}/${recipeId}`, recipeData);
      return response;
    } catch (error) {
      console.error("Edit failed:", {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    }
  };

  return { edit };
};

export const useDeleteRecipe = () => {
  const { request } = useAuth();

  const deleteRecipe = (recipeId) => request.delete(`${baseUrl}/${recipeId}`);

  return {
    deleteRecipe,
  };
};

// export const useSearchRecipes = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isPending, startTransition] = useTransition();

//   const [optimisticResults] = useOptimistic(
//     results,
//     (currentResults, newQuery) => {
//       return loading
//         ? currentResults.filter((r) =>
//             r.title.toLowerCase().includes(newQuery.toLowerCase())
//           )
//         : currentResults;
//     }
//   );

//   const addNewRecipe = useCallback((newRecipe) => {
//     setResults((prevResults) => {
//       const safePrevResults = Array.isArray(prevResults) ? prevResults : [];
//       return [newRecipe, ...safePrevResults].sort(
//         (a, b) => new Date(b._createdOn) - new Date(a._createdOn)
//       );
//     });
//   }, []);

//   const performSearch = useCallback(async (searchQuery) => {
//     startTransition(async () => {
//       try {
//         setLoading(true);
//         let url = `${baseUrl}?sortBy=_createdOn%20desc&pageSize=13`;

//         if (searchQuery.trim()) {
//           url += `&where=${encodeURIComponent(`title LIKE "${searchQuery}"`)}`;
//         }

//         const data = await request.get(url);
//         setResults(data);
//       } catch (err) {
//         setError(err.message || "Failed to fetch recipes");
//       } finally {
//         setLoading(false);
//       }
//     });
//   }, []);

//   //  reset to all recipes
//   const showAllRecipes = useCallback(() => {
//     setQuery("");
//     performSearch(""); // Force fetch all recipes
//   }, [performSearch]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       performSearch(query);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query, performSearch]);

//   return {
//     query,
//     setQuery: (newQuery) => startTransition(() => setQuery(newQuery)),
//     results: optimisticResults,
//     loading: loading || isPending,
//     error,
//     addNewRecipe,
//     refresh: () => performSearch(query),
//     showAllRecipes,
//   };
// };

export const useSearchRecipes = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (searchQuery) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        sortBy: "_createdOn desc",
        pageSize: 100,
        ...(searchQuery.trim() && {
          where: `title LIKE "${searchQuery.trim()}"`,
        }),
      });

      const data = await request.get(`${baseUrl}?${params}`);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch recipes");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSearchResults(null);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim() === "") {
        clearSearch();
      } else {
        const results = await performSearch(query);
        setSearchResults(results);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch, clearSearch]);

  return {
    query,
    setQuery,
    searchResults,
    isLoading: loading,
    error,
    clearSearch,
  };
};
