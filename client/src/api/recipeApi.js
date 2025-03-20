import {  useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import request from "../utils/request.js";

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
    const { request }= useAuth()
   const create =async (recipeData) =>
         request.post(baseUrl, recipeData);
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

export const useEditRecipe =()=>{
    const{request}=useAuth()

     const edit = async (recipeId, recipeData)=>{
         request.put(`${baseUrl}/${recipeId}`, {
          ...recipeData,
          _id: recipeId,
        })
        
      }
      return{
        edit,   
    }
        
}

export const useDeleteRecipe=()=>{
    const {request}= useAuth()
     const deleteRecipe = (recipeId) => {
        request.delete(`${baseUrl}/${recipeId}`);
      }
      return{
        deleteRecipe
      } 
}
