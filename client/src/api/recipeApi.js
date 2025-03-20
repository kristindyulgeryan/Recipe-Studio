import { useContext, useEffect, useState } from "react";
import request from "../utils/request.js";
import { UserContext } from "../contexts/userContext.js";

const baseUrl = "http://localhost:3030/data/recipes";


export const useRecipes=()=>{
    const [recipes, setRecipes] = useState([]);
  useEffect(()=>{
    request.get(baseUrl)
    .then(setRecipes)

  },[])
  return{
    recipes,
  }
}

export const useCreateRecipe =()=>{
    const {accessToken} = useContext(UserContext)

    const options = {
        headers:{
            "X-Authorization": accessToken
        }
    }
   const create =async (recipeData) =>
         request.post(baseUrl, recipeData, options);
     return{
        create,
     }
}

export const useRecipe = (recipeId) => {
    const [recipe, setRecipe] = useState({});
  
    useEffect(()=>{
        request.get(`${baseUrl}/${recipeId}`)
        .then(setRecipe)
    },[recipeId])
    return{
        recipe,
    }
    
}