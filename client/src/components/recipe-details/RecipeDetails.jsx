export default function RecipeDetails() {
  return (
    <section id="recipe-details">
      <div className="container">
        <h2>Recipe Details</h2>

        <div className="recipe-info">
          <div className="recipe-image">
            <img src="imgs/s-1.png" alt="Recipe Image" />
          </div>

          <div className="recipe-description">
            <div className="recipe-title">
              <h3 id="recipe-title-display">Combo Pack</h3>
            </div>

            <h4>Ingredients</h4>
            <p id="recipe-description-display">
              
            </p>

            {/* Buttons for edit and delete  */}
            <div className="buttons">
              <Link to="#" className="button edit-button">
                Edit Recipe
              </Link>
              <button className="button delete-button" onclick="deleteRecipe()">
                Delete Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
