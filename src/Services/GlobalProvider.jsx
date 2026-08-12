import { createContext, useReducer } from "react";
import { inicialState, globalReducer } from "../store.js";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [store, dispatch] = useReducer(globalReducer, inicialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
