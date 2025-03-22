import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";

const baseUrl = "http://localhost:3030/data/comments";

export const useComments = (recipeId) => {
  const { request } = useAuth();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams({
      where: `recipeId="${recipeId}"`,
    });

    request.get(`${baseUrl}?${searchParams.toString()}`).then(setComments);
  }, [request, recipeId]);

  return {
    comments,
  };
};

export const useCreateComment = () => {
  const { request } = useAuth();
  const create = (recipeId, comment) => {
    const commentData = {
      recipeId,
      comment,
    };
    return request.post(baseUrl, commentData);
  };
  return { create };
};
