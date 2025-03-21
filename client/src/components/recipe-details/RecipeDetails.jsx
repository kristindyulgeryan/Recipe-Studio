import { Link, useNavigate, useParams } from "react-router";
import CommentsShow from "../comments-show/CommentsShow.jsx";
import CommentsCreate from "../comments-create/CommentsCreate.jsx";
import { useDeleteRecipe, useRecipe } from "../../api/recipeApi.js";
import useAuth from "../../hooks/useAuth.js";

import { useComments, useCreateComment } from "../../api/commentsApi.js";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { email, _id: userId } = useAuth();
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);
  const { deleteRecipe } = useDeleteRecipe();
  const { comments, setComments } = useComments(recipeId);
  const { create } = useCreateComment();

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
    const newComment = await create(recipeId, comment);

    setComments((state) => [...state, newComment]);
  };

  const isOwner = userId === recipe._ownerId;

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
          <CommentsShow comments={comments} />
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
