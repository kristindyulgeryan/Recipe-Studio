import { useNavigate } from "react-router";

import { useCreateRecipe, useRecipes } from "../../api/recipeApi.js";

export default function RecipeCreate() {
  const navigate = useNavigate();
  const { create } = useCreateRecipe();

  const { refreshRecipes } = useRecipes();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recipeData = Object.fromEntries(formData);

    try {
      await create(recipeData);
      await refreshRecipes(); // This will trigger a reload of all recipes
      navigate(`/recipes`);
    } catch (error) {
      console.error("Creation failed:", error);
      // You can add state to show error messages to users
    }
  };

  return (
    <section id="recipe-form">
      <form id="recipe-form-container" onSubmit={handleSubmit}>
        <div className="container">
          <h2>Add Your Recipe</h2>

          <label htmlFor="recipe-title">Recipe Name:</label>
          <input
            type="text"
            id="recipe-title"
            placeholder="Enter recipe title"
            name="title"
            required
          />

          <label htmlFor="recipe-description">Ingredients & Preparation:</label>
          <textarea
            id="recipe-description"
            placeholder="Flour, cheese, tomatoes..."
            rows="5"
            name="description"
            required
          ></textarea>

          <label htmlFor="image">Upload Image:</label>
          <input type="text" id="image" name="image" />

          <input type="submit" value="Submit Recipe" />
        </div>
      </form>
    </section>
  );
}
