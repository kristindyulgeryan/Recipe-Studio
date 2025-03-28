import { Navigate, useNavigate, useParams } from "react-router";
import { useEditRecipe, useRecipe } from "../../api/recipeApi.js";
import useAuth from "../../hooks/useAuth.js";

export default function RecipeEdit() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);
  const { edit } = useEditRecipe();

  const formAction = async (formData) => {
    const recipeData = Object.fromEntries(formData);
    await edit(recipeId, recipeData);

    navigate(`/recipes/${recipeId}/details`);
  };

  const isOwner = userId === recipe._ownerId;
  if (!isOwner) {
    return <Navigate to="/recipes" />;
  }

  return (
    <section id="edit-form">
      <form id="edit-form-container" action={formAction}>
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
