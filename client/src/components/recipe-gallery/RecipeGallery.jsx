
import { Link } from "react-router";

import { useRecipes } from "../../api/recipeApi.js";

export default function RecipeGallery() {
 const {recipes} = useRecipes()

  return (
    <section className="py-5 service-sec">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <p className="title-p">
              <img src="imgs/p-img.png" alt="" />
              Our Creations
            </p>
            <h2 className="title-h">Recipe Studio Specials</h2>
            <p>
              Explore our carefully crafted recipes, made with love and the
              freshest ingredients. Perfect meals for every occasion.
            </p>
          </div>
        </div>

        <div className="row mt-5">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="col-lg-4 col-md-6">
                <div className="service-box">
                  <div className="ser-img">
                    <img src={recipe.image} alt={recipe.title} />
                  </div>
                  <div className="ser-text">
                    <h4>{recipe.title}</h4>
                    <p>
                      {recipe.description && recipe.description.length > 100
                        ? `${recipe.description.slice(0, 100)}...`
                        : recipe.description || "No description available."}
                    </p>
                    <div className="ser-arr">
                      <Link to={`/recipes/${recipe._id}/details`}>
                        Discover Recipe
                      </Link>
                      <span className="comment-count">0 Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>No recipes available.</h3>
          )}
        </div>
      </div>
    </section>
  );
}
