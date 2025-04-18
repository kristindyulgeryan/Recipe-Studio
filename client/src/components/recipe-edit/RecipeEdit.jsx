import { useNavigate, useParams } from "react-router";
import { useEditRecipe, useRecipe } from "../../api/recipeApi.js";

export default function RecipeEdit() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);
  const { edit } = useEditRecipe();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recipeData = Object.fromEntries(formData);

    try {
      const updateData = {
        title: recipeData.title,
        description: recipeData.description,
        image: recipeData.image,
      };

      await edit(recipeId, updateData);
      navigate(`/recipes/${recipeId}/details`);
    } catch (error) {
      console.error("Update failed:", error);
      alert(`Update failed: ${error.message}`);
    }
  };

  return (
    <section id="edit-form">
      <form id="edit-form-container" onSubmit={handleSubmit}>
        <div className="container">
          <h2>Edit Your Recipe</h2>
          <label htmlFor="recipe-title">Recipe Name:</label>
          <input
            type="text"
            id="recipe-title"
            name="title"
            placeholder="Enter recipe title"
            defaultValue={recipe.title}
            required
          />

          <label htmlFor="recipe-description">Ingredients & Preparation:</label>
          <textarea
            id="recipe-description"
            name="description"
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
