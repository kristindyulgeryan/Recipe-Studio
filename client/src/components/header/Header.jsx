import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/userContext";
import SearchBar from "../search-bar/SearchBar";
import { useSearchRecipes } from "../../api/recipeApi.js";

export default function Header({ onSearchResults }) {
  const { email } = useContext(UserContext);
  const  showAllRecipes  = useSearchRecipes();
  const navigate = useNavigate()

  const handleGalleryClick = async (e) => {
    e.preventDefault();

    try {
      if (showAllRecipes && typeof showAllRecipes === 'function') {
        await showAllRecipes(); 
      }
      onSearchResults?.(null);
      navigate("/recipes");
    } catch (error) {
      console.error("Error loading recipes:", error);
      navigate("/recipes"); 
    }


  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand logo" to="/">
            <img src="/imgs/logo.jpg" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/recipes"
                  onClick={handleGalleryClick}
                >
                  Recipe Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              {email ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/recipes/create">
                      Recipe Factory
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      Sign Out
                    </Link>
                  </li>
                  <span
                    style={{
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {email}
                  </span>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              <SearchBar onSearchResults={onSearchResults} />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
