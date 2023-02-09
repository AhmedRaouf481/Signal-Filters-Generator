import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  // Test
  const [value, setValue] = useState(0);

  const [polesZeroesList, setPolesZeroesList] = useState([]);

  const [magPoints, setMagPoints] = useState([]);
  const [phasePoints, setphasePoints] = useState([]);
  const [wPoints, setWPoints] = useState([]);
  const [signalX, setSignalX] = useState([]);
  const [signalY, setSignalY] = useState([]);
  const [filteredSignalY, setFilteredSignalY] = useState([]);
  const [catalogue, setCatalogue] = useState([]);

  return (
    <AppContext.Provider
      value={{
        polesZeroesList,
        setPolesZeroesList,
        value,
        setValue,

        magPoints,
        setMagPoints,
        phasePoints,
        setphasePoints,
        wPoints,
        setWPoints,
        signalX,
        setSignalX,
        signalY,
        setSignalY,
        filteredSignalY,
        setFilteredSignalY,
        catalogue,
        setCatalogue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
