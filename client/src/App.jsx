import { Routes, Route } from "react-router";
import { useState } from "react";

import { UserContext } from "./contexts/userContext.js";

import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import RecipeGallery from "./components/recipe-gallery/RecipeGallery.jsx";
import RecipeCreate from "./components/recipe-create/RecipeCreate.jsx";
import Footer from "./components/footer/Footer.jsx";
import About from "./components/about/About.jsx";
import RecipeDetails from "./components/recipe-details/RecipeDetails.jsx";
import RecipeEdit from "./components/recipe-edit/RecipeEdit.jsx";
import "./style/style.css";
import Logout from "./components/logout/Logout.jsx";

function App() {
  const[authData, setAuthData] = useState({})
  const userLoginHandler = (resultdata)=>{
    setAuthData(resultdata)
  }

  const userLogoutHandler = ()=>{
    setAuthData({})
  }
  return (
    <UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/recipes" element={<RecipeGallery />} />
        <Route path="/recipes/create" element={<RecipeCreate />} />
        <Route path="/recipes/:recipeId/details" element={<RecipeDetails />} />
        <Route path="/recipes/:recipeId/edit" element={<RecipeEdit />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
    </UserContext.Provider>
  );
}

export default App;
