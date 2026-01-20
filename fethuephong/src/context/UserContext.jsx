import { createContext, useContext, useEffect, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  user: null,
  isLoading: true, // 👈 QUAN TRỌNG
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false,
      };

    case "FINISH_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      dispatch({
        type: "SET_USER",
        payload: JSON.parse(storedUser),
      });
    } else {
      dispatch({ type: "FINISH_LOADING" });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
