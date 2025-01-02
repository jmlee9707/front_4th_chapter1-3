// 커스텀 훅: useAppContext
import { createContext, useContext } from "react";
import { AppContextType } from "../../types/appContext";

const AppContext = createContext<AppContextType | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppContext, useAppContext };
