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
