import React from "react";
import { useComments } from "../../api/commentsApi.js";
import { useNavigate } from "react-router";
import styles from "./CommentCount.module.css";

const CommentCount = ({ recipeId }) => {
  const { comments } = useComments(recipeId);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${recipeId}/details`); // Navigate to recipe details page
  };

  return (
    <span className={styles.commentCount} onClick={handleClick}>
      {comments.length} Comments
    </span>
  );
};

export default CommentCount;
