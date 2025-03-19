import { useContext } from "react";
import request from "../utils/request"
import { UserContext } from "../contexts/userContext";

const baseUrl = "http://localhost:3030/users";

export const useLogin=()=>{

    const login = async (email, password)=>
    request.post(`
        ${baseUrl}/login`, 
        {email, password})
      
    

    return {
        login
    }
}

export const useRegister=()=>{
    const register = (username, email, password)=>
           request.post(
            `${baseUrl}/register`, 
            {username, email, password}
        )
    
    return {
        register
    }
}


export const useLogout=()=>{
  const {accessToken} = useContext(UserContext)
    const options = {
        headers: {'X-Authorization': accessToken}
    }
    const logout = request.get(`${baseUrl}/logout`, null, options)

    return {
        logout
    }
}