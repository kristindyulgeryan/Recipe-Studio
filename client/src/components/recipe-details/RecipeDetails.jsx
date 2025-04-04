import { Link, useNavigate, useParams } from "react-router";
import CommentsShow from "../comments-show/CommentsShow.jsx";
import CommentsCreate from "../comments-create/CommentsCreate.jsx";
import { useDeleteRecipe, useRecipe } from "../../api/recipeApi.js";
import useAuth from "../../hooks/useAuth.js";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from "../../api/commentsApi.js";
import { startTransition, useOptimistic } from "react";
import { v4 as uuid } from "uuid";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { email, userId, username } = useAuth();
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);
  const { deleteRecipe } = useDeleteRecipe();
  const { create } = useCreateComment();
  const { remove } = useDeleteComment();
  const { comments, addComment, deleteComment } = useComments(recipeId);

  const [optimisticComments, setOptimisticComments] = useOptimistic(
    comments,
    (state, action) => {
      if (action.type === "ADD_COMMENT") {
        return [...state, action.payload];
      }
      if (action.type === "DELETE_COMMENT") {
        return state.filter((comment) => comment._id !== action.payload);
      }
      return state;
    }
  );

  const recipeDeleteClickHandler = async () => {
    const hasConfirm = confirm(
      `Are you sure you want to delete this ${recipe.title} recipe?`
    );

    if (!hasConfirm) {
      return;
    }

    await deleteRecipe(recipeId);
    navigate("/recipes");
  };

  const commentCreatHandler = async (comment) => {
    const newOptimisticComment = {
      _id: uuid(),
      _ownerId: userId,
      recipeId,
      comment,
      pending: true,
      author: { username },
    };

    startTransition(() => {
      setOptimisticComments({
        type: "ADD_COMMENT",
        payload: newOptimisticComment,
      });
    });

    try {
      const commentResult = await create(recipeId, comment);
      addComment({ ...commentResult, author: { username } });
    } catch (error) {
      console.error("Failed to create comment:", error);

      // Rollback optimistic update on error
      startTransition(() => {
        setOptimisticComments({
          type: "DELETE_COMMENT",
          payload: newOptimisticComment._id,
        });
      });
    }
  };

  const deleteCommentHandler = async (commentId) => {
    startTransition(() => {
      setOptimisticComments({
        type: "DELETE_COMMENT",
        payload: commentId,
      });
    });

    try {
      await remove(commentId);
      deleteComment(commentId);
    } catch (error) {
      console.error("Failed to delete comment:", error);

      startTransition(() => {
        setOptimisticComments({
          type: "ADD_COMMENT",
          payload: comments.find((c) => c._id === commentId),
        });
      });
    }
  };

  const isOwner =
    userId &&
    recipe?._ownerId &&
    userId.toString() === recipe._ownerId.toString();

  return (
    <section id="recipe-details">
      <div className="container">
        <h2>Recipe Details</h2>

        <div className="recipe-info">
          <div className="recipe-image">
            <img src={recipe.image} alt={recipe.title} />
          </div>

          <div className="recipe-description">
            <div className="recipe-title">
              <h3 id="recipe-title-display">{recipe.title}</h3>
            </div>

            <h4>Ingredients & Preparation:</h4>
            <p id="recipe-description-display">{recipe.description}</p>

            {isOwner && (
              <div className="buttons">
                <Link
                  to={`/recipes/${recipeId}/edit`}
                  className="button edit-button"
                  state={{ fromDetails: true }}
                >
                  Edit Recipe
                </Link>
                <button
                  className="button delete-button"
                  onClick={recipeDeleteClickHandler}
                >
                  Delete Recipe
                </button>
              </div>
            )}
          </div>
          <CommentsShow
            comments={optimisticComments}
            onDelete={deleteCommentHandler}
          />
        </div>
      </div>

      <CommentsCreate
        email={email}
        recipeId={recipeId}
        onCreate={commentCreatHandler}
      />
    </section>
  );
}
