import {  useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import recipeService from "../../services/recipeService.js";

export default function RecipeDetails() {
 const {recipeId}=useParams();
 const[recipe, setRecipe]=useState({});


 useEffect(()=>{
  recipeService.getOne(recipeId).then(setRecipe)
 },[recipeId]);


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

            <h4>Ingredients</h4>
            <p id="recipe-description-display">
            {recipe.description}
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
 {/* Comments Section (Before Edit and Delete Buttons) */}
 <div className="comments-section">
          <h4>Comments</h4>
          <div className="comment">
            <p><strong>John Doe:</strong> This recipe is amazing! I tried it last night, and it was so delicious.</p>
           
          </div>        
        </div>
        </div>    
      </div>

      <div className="add-comment-section">
  <h4>Add a Comment</h4>
  <form className="add-comment-form">
    <textarea
      placeholder="Write your comment here..."
      rows="4"
    ></textarea>
    <button type="submit" className="button add-comment-button">
      Submit Comment
    </button>
  </form>
</div>
    </section>

    
  );
}
