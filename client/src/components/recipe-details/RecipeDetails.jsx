import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import recipeService from "../../services/recipeService.js";
import CommentsShow from "../comments-show/CommentsShow.jsx";
import CommentsCreate from "../comments-create/CommentsCreate.jsx";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    recipeService.getOne(recipeId).then(setRecipe);
  }, [recipeId]);

  const recipeDeleteClickHandler = async () => {
    const hasConfirm = confirm(
      `Are you sure you want to delete this ${recipe.title} recipe?`
    );

    if (!hasConfirm) {
      return;
    }

    await recipeService.delete(recipeId);
    navigate("/recipes");
  };

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

            {/* Buttons for edit and delete  */}
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
          </div>

          
         <CommentsShow/>
        </div>
      </div>

      <CommentsCreate/>
    </section>
  );
}
