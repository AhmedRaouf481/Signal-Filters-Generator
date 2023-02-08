import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  // Test
  const [value, setValue] = useState(0);

  const [zeros, setZeros] = useState([
    [0, 1],
    [1, 0]
  ]);
  const [poles, setPoles] = useState([[0, 0]]);
  const [magPoints, setMagPoints] = useState([]);
  const [phasePoints, setphasePoints] = useState([]);
  const [wPoints, setWPoints] = useState([]);
  const [signalX, setSignalX] = useState([]);
  const [signalY, setSignalY] = useState([]);
  const [filteredSignalY, setFilteredSignalY] = useState([]);
  //,
  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
        zeros,
        setZeros,
        poles,
        setPoles,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
