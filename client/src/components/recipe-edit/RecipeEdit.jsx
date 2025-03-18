import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import recipeService from "../../services/recipeService.js";

export default function RecipeEdit() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    recipeService.getOne(recipeId).then(setRecipe);
  }, [recipeId]);

  const formAction = async (formData) => {
    const recipeData = Object.fromEntries(formData);
    await recipeService.edit(recipeId, recipeData);
    navigate(`/recipes/${recipeId}/details`);
  };

  return (
    <section id="edit-form">
      <form id="edit-form-container" action={formAction}>
        <div className="container">
          <h2>Edit Your Recipe</h2>
          <label htmlFor="recipe-title">Recipe Name:</label>
          <input
            type="text"
            id="recipe-title"
            placeholder="Enter recipe title"
            defaultValue={recipe.title}
            required
          />

          <label htmlFor="recipe-description">Ingredients:</label>
          <textarea
            id="recipe-description"
            placeholder="Flour, cheese, tomatoes..."
            rows="5"
            defaultValue={recipe.description}
            required
          ></textarea>

          <label htmlFor="image">Recipe Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={recipe.image}
          />

          <input type="submit" value="Edit Recipe" />
        </div>
      </form>
    </section>
  );
}
