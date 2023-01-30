import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  // Test
  const [value, setValue] = useState(0);

  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
