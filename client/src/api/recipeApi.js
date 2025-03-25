import {
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import useAuth from "../hooks/useAuth.js";
import request from "../utils/request.js";

const baseUrl = "http://localhost:3030/data/recipe";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams({
      sortBy: "_createdOn desc",
    });

    request.get(`${baseUrl}?${searchParams.toString()}`).then(setRecipes);
  }, []);

  return {
    recipes,
  };
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
  const create = (recipeData) => request.post(baseUrl, recipeData);
  return {
    create,
  };
};

export const useEditRecipe = () => {
  const { request } = useAuth();

  const edit = (recipeId, recipeData) =>
    request.put(`${baseUrl}/${recipeId}`, {
      ...recipeData,
      _id: recipeId,
    });

  return {
    edit,
  };
};

export const useDeleteRecipe = () => {
  const { request } = useAuth();

  const deleteRecipe = (recipeId) => request.delete(`${baseUrl}/${recipeId}`);

  return {
    deleteRecipe,
  };
};

export const useSearchRecipes = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const [optimisticResults] = useOptimistic(
    results,
    (currentResults, newQuery) => {
      return loading
        ? currentResults.filter((r) =>
            r.title.toLowerCase().includes(newQuery.toLowerCase())
          )
        : currentResults;
    }
  );

  const addNewRecipe = useCallback((newRecipe) => {
    setResults((prevResults) => {
      const updatedResults = [newRecipe, ...prevResults];
      return updatedResults.sort(
        (a, b) => new Date(b._createdOn) - new Date(a._createdOn)
      );
    });
  }, []);

  const performSearch = useCallback(async (searchQuery) => {
    startTransition(async () => {
      try {
        setLoading(true);
        let url = `${baseUrl}?sortBy=_createdOn%20desc`;

        if (searchQuery.trim()) {
          url += `&where=${encodeURIComponent(`title LIKE "${searchQuery}"`)}`;
        }

        const data = await request.get(url);
        setResults(data);
      } catch (err) {
        setError(err.message || "Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  //  reset to all recipes
  const showAllRecipes = useCallback(() => {
    setQuery(""); // Clear the query
    performSearch(""); // Force fetch all recipes
  }, [performSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  return {
    query,
    setQuery: (newQuery) => startTransition(() => setQuery(newQuery)),
    results: optimisticResults,
    loading: loading || isPending,
    error,
    addNewRecipe,
    refresh: () => performSearch(query),
    showAllRecipes,
  };
};
