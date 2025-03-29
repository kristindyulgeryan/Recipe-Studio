import { Link } from "react-router";
import CommentCount from "./CommentCount.jsx";
import { useRecipes } from "../../api/recipeApi.js";

export default function RecipeGallery({ searchResults }) {
  const { recipes } = useRecipes();

  const displayedRecipes = searchResults || recipes;
  const isSearchActive = searchResults !== null;

  return (
    <section className="py-5 service-sec">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <p className="title-p">
              <img src="imgs/p-img.png" alt="" />
            </p>
            <h2 className="title-h">Recipe Studio Specials</h2>
            <p>
              Explore our carefully crafted recipes, made with love and the
              freshest ingredients. Perfect meals for every occasion.
            </p>
          </div>
        </div>

        <div className="row mt-5">
          {displayedRecipes.length > 0 ? (
            displayedRecipes.map((recipe) => (
              <div key={recipe._id} className="col-lg-4 col-md-6">
                <div className="service-box">
                  <div className="ser-img">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      onError={(e) => {
                        e.target.src = "imgs/placeholder-recipe.jpg";
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="ser-text">
                    <h4>{recipe.title}</h4>
                    <p>
                      {recipe.description && recipe.description.length > 100
                        ? `${recipe.description.substring(0, 100)}...`
                        : recipe.description || "No description available."}
                    </p>
                    <div className="ser-arr recipe-ser-arr">
                      <Link to={`/recipes/${recipe._id}/details`}>
                        View Full Recipe
                      </Link>
                      <CommentCount recipeId={recipe._id} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <h3 className="text-center">
                {isSearchActive
                  ? "No recipes match your search"
                  : "No recipes available"}
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
