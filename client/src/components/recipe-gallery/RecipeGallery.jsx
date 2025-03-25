import { Link } from "react-router";
import { useRecipes } from "../../api/recipeApi.js";
import CommentCount from "./CommentCount.jsx";

// export default function RecipeGallery() {
//   const { recipes } = useRecipes();

//   return (
//     <section className="py-5 service-sec">
//       <div className="container">
//         <div className="row align-items-center">
//           <div className="col-lg-8">
//             <p className="title-p">
//               <img src="imgs/p-img.png" alt="" />
//               Our Creations
//             </p>
//             <h2 className="title-h">Recipe Studio Specials</h2>
//             <p>
//               Explore our carefully crafted recipes, made with love and the
//               freshest ingredients. Perfect meals for every occasion.
//             </p>
//           </div>
//         </div>

//         <div className="row mt-5">
//           {recipes.length > 0 ? (
//             recipes.map((recipe) => (
//               <div key={recipe._id} className="col-lg-4 col-md-6">
//                 <div className="service-box">
//                   <div className="ser-img">
//                     <img src={recipe.image} alt={recipe.title} />
//                   </div>
//                   <div className="ser-text">
//                     <h4>{recipe.title}</h4>
//                     <p>
//                       {recipe.description && recipe.description.length > 100
//                         ? `${recipe.description.slice(0, 100)}...`
//                         : recipe.description || "No description available."}
//                     </p>
//                     <div className="ser-arr recipe-ser-arr">
//                       <Link to={`/recipes/${recipe._id}/details`}>
//                         View Full Recipe
//                       </Link>
//                       <CommentCount recipeId={recipe._id} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <h3>No recipes available.</h3>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function RecipeGallery({ searchResults }) {
  const { recipes } = useRecipes();

  const displayedRecipes = searchResults || recipes;

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
                {searchResults && searchResults.length === 0
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
