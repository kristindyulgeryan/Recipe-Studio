import { useEffect, useState } from "react";
import { Link } from "react-router";
import recipeService from "../../services/recipeService.js";

export default function RecipeGallery() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    recipeService
      .getAll()
      .then(setRecipes)

      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

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
                    <img src={recipe.image} alt={recipe.title}/>
                  </div>
                  <div className="ser-text">
                    <h4>{recipe.title}</h4>
                    <p>{recipe.description.length > 100 ? `${recipe.description.slice(0, 100)}...` : recipe.description}</p>
                    <div className="ser-arr">
                      <Link to={`/recipes/${recipe._id}/details`}>
                        View full item
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
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
