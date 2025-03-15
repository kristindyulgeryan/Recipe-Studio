export default function RecipeEdit() {
  return (
    <section id="edit-form">
      <form id="edit-form-container">
        <div className="container">
          <h2>Edit Your Recipe</h2>
          <label htmlFor="recipe-title">Recipe Name:</label>
          <input
            type="text"
            id="recipe-title"
            placeholder="Enter recipe title"
            required
          />

          <label htmlFor="recipe-description">Ingredients:</label>
          <textarea
            id="recipe-description"
            placeholder="Flour, cheese, tomatoes..."
            rows="5"
            required
          ></textarea>

          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" name="image" accept="image/*" />
          {/* <label htmlFor="recipe-image">Recipe Image URL:</label>
          <input
            type="url"
            id="recipe-image"
            placeholder="Enter image URL"
            required
          /> */}
          <input type="submit" value="Edit Recipe" />
        </div>
      </form>
    </section>
  );
}
