import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import request from "../utils/request";
import { validateLogin, validateRegister } from "../utils/authValidations.js";

const baseUrl = "http://localhost:3030/users";

// export const useLogin = () => {
//   const login = async (email, password) =>
//     request.post(
//       `
//         ${baseUrl}/login`,
//       { email, password }
//     );

//   return {
//     login,
//   };
// };

export const useLogin = () => {
  const login = async (email, password) => {
    try {
      const validationErrors = validateLogin(email, password);
      if (validationErrors.length > 0) {
        // Show all validation errors at once
        alert(validationErrors.join("\n\n"));
        throw new Error("Validation failed");
      }

      const response = await request.post(`${baseUrl}/login`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error.message !== "Validation failed") {
        let errorMessage = "Login failed. Please try again.";

        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = "Invalid email or password";
          } else {
            errorMessage = error.response.data?.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = "Network error - please check your connection";
        }

        alert(`⚠️ ${errorMessage}`);
      }
      throw error;
    }
  };

  return { login };
};

// export const useRegister = () => {
//   const register = (username, email, password) =>
//     request.post(`${baseUrl}/register`, { username, email, password });

//   return {
//     register,
//   };
// };

export const useRegister = () => {
  const register = async (username, email, password, confirmPassword) => {
    try {
      const validationErrors = validateRegister(
        email,
        password,
        confirmPassword,
        username
      );
      if (validationErrors.length > 0) {
        alert(validationErrors.join("\n"));
        throw new Error("Validation failed");
      }

      const response = await request.post(`${baseUrl}/register`, {
        username,
        email,
        password,
      });

      return response;
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "Network error - server not responding";
      } else {
        errorMessage = error.message || errorMessage;
      }

      alert(errorMessage);
      throw error;
    }
  };

  return {
    register,
  };
};
export const useLogout = () => {
  const { accessToken, userLogoutHandler } = useContext(UserContext);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const options = {
      headers: {
        "X-Authorization": accessToken,
      },
    };

    request.get(`${baseUrl}/logout`, null, options).then(userLogoutHandler);
  }, [accessToken, userLogoutHandler]);

  return {
    isLoggedOut: !!accessToken,
  };
};
