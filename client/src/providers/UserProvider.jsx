import { UserContext } from "../contexts/userContext.jsx";
import usePersistedState from "../hooks/usePersistedState.js";

export default function UserProvider({ children }) {
  const [authData, setAuthData] = usePersistedState("auth", {});
  const userLoginHandler = (resultdata) => {
    setAuthData(resultdata);
  };

  const userLogoutHandler = () => {
    setAuthData({});
  };
  return (
    <UserContext.Provider
      value={{ ...authData, userLoginHandler, userLogoutHandler }}
    >
      {children}
    </UserContext.Provider>
  );
}
