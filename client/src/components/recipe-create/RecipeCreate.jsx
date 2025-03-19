import { useNavigate } from "react-router";
import recipeService from "../../services/recipeService.js";

export default function RecipeCreate() {
  const navigate = useNavigate();
  const submitAction = async (formData) => {
    const recipeData = Object.fromEntries(formData);
    const result = await recipeService.create(recipeData);
    console.log(result);
    navigate("/recipes");
  };

  return (
    <section id="recipe-form">
      <form id="recipe-form-container" action={submitAction}>
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
