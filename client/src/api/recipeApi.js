import { useContext } from "react";
import request from "../utils/request.js";
import { UserContext } from "../contexts/userContext.js";

const baseUrl = "http://localhost:3030/data/recipes";




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