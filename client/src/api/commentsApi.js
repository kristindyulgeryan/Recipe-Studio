import { useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth.js";
import request from "../utils/request.js";

const baseUrl = "http://localhost:3030/data/comments";

function commentsReducer(state, action) {
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.payload];
    case "GET_ALL":
      return Array.isArray(action.payload) ? action.payload : [];
    case "DELETE_COMMENT":
      return state.filter((comment) => comment._id !== action.payload);
    default:
      return state;
  }
}

export const useComments = (recipeId) => {
  const { accessToken } = useAuth();
  const [comments, dispatch] = useReducer(commentsReducer, []);

  useEffect(() => {
    const searchParams = new URLSearchParams({
      where: `recipeId="${recipeId}"`,
      load: `author=_ownerId:users`,
    });

    const options = accessToken
      ? { headers: { "X-Authorization": accessToken } }
      : {};

    request
      .get(`${baseUrl}?${searchParams.toString()}`, null, options)
      .then((result) => dispatch({ type: "GET_ALL", payload: result }))
      .catch((err) => {
        console.error("Error fetching comments:", err);
        dispatch({ type: "GET_ALL", payload: [] });
      });
  }, [recipeId, accessToken]);

  return {
    comments,
    addComment: (commentData) =>
      dispatch({ type: "ADD_COMMENT", payload: commentData }),
    deleteComment: (commentId) =>
      dispatch({ type: "DELETE_COMMENT", payload: commentId }),
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

export const useDeleteComment = () => {
  const { request } = useAuth();
  const remove = (commentId) => {
    return request.delete(`${baseUrl}/${commentId}`);
  };
  return { remove };
};
