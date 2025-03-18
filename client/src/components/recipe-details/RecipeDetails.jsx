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
        </div>
      </div>
    </section>
  );
}
