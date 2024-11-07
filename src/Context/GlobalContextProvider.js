import { createContext, useState } from "react";

export const BabaJiMisthanContext = createContext();

export const BabaJiMisthanProvider = ({ children }) => {
  //create your state variable here...
  const [loading, setLoading] = useState(false);
  return (
    <BabaJiMisthanContext.Provider
      value={{
        //add your state variable here...
        loading,
        setLoading,
      }}
    >
      {children}
    </BabaJiMisthanContext.Provider>
  );
};
