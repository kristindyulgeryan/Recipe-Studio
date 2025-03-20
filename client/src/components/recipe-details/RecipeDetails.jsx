import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import recipeService from "../../services/recipeService.js";
import CommentsShow from "../comments-show/CommentsShow.jsx";
import CommentsCreate from "../comments-create/CommentsCreate.jsx";
import commentService from "../../services/commentService.js";
import { useRecipe } from "../../api/recipeApi.js";
import { UserContext } from "../../contexts/userContext.js";



export default function RecipeDetails() {
  const navigate = useNavigate();
  const {email} = useContext(UserContext)
  const[comments, setComments] =useState([])
  const { recipeId } = useParams();
  const {recipe} = useRecipe(recipeId)

  useEffect(() => {
      commentService.getAll( recipeId).then(setComments);
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

  const commentCreatHandler = (newComment)=>{
    setComments(...state =>[...state, newComment])
  }

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

          
         <CommentsShow comments={comments}/>
        </div>
      </div>

      <CommentsCreate 
      email={email} 
      recipeId={recipeId}
      onCreate={commentCreatHandler}
      />
    </section>
  );
}
