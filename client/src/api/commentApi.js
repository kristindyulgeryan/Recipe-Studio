import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/comments';



export const useComments = (recipeId) => {
    const { request } = useAuth();
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `recipeId="${recipeId}"`
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setComments)
    }, [recipeId]); 

    return {
        comments,
    }
}
