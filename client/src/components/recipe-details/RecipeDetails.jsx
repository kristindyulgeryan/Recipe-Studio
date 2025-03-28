import { Link, useNavigate, useParams } from "react-router";
import CommentsShow from "../comments-show/CommentsShow.jsx";
import CommentsCreate from "../comments-create/CommentsCreate.jsx";
import { useDeleteRecipe, useRecipe } from "../../api/recipeApi.js";
import useAuth from "../../hooks/useAuth.js";

import { useComments, useCreateComment } from "../../api/commentsApi.js";
import { useOptimistic } from "react";
import { v4 as uuid } from "uuid";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { email, userId, username } = useAuth();
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);
  const { deleteRecipe } = useDeleteRecipe();
  const { create } = useCreateComment();
  const { comments, addComment } = useComments(recipeId);
  const [optimisticComments, setOptimisticComments] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  console.log(optimisticComments);

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
    // Optimistic update
    const newOptimisticComment = {
      _id: uuid(),
      _ownerId: userId,
      recipeId,
      comment,
      pending: true,
      author: {
        username,
      },
    };

    // Server update
    setOptimisticComments(newOptimisticComment);

    const commentResult = await create(recipeId, comment);

    // Locale state update
    addComment({ ...commentResult, author: { username } });
  };

  const isOwner =
    userId &&
    recipe?._ownerId &&
    userId.toString() === recipe._ownerId.toString();
  console.log("Ownership check:", {
    userId,
    ownerId: recipe?._ownerId,
    types: {
      userIdType: typeof userId,
      ownerIdType: typeof recipe?._ownerId,
    },
    isOwner,
  });

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
          <CommentsShow comments={optimisticComments} />
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
