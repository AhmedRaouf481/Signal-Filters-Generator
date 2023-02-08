import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  // Test
  const [value, setValue] = useState(0);

  const [zeros, setZeros] = useState([
    [0, 1],
    [1, 0],
  ]);
  const [poles, setPoles] = useState([[0, 0]]);
  const [magPoints, setMagPoints] = useState([]);
  const [phasePoints, setphasePoints] = useState([]);
  const [wPoints, setWPoints] = useState([]);
  const [timeInterval, setTimeInterval] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ]);
  const [inputSignal, setInputSignal] = useState([
    12, 9, 15, 4, 17, 11, 2, 4, 9, 3, 4, 5, 15, 14, 19, 2, 17, 18, 14, 1, 12, 9,
    15, 4, 17, 11, 2, 4, 9, 3, 4,
  ]);
  const [outputSignal, setOutputSignal] = useState([
    12, 9, 15, 4, 17, 11, 2, 4, 9, 3, 4, 5, 15, 14, 19, 2, 17, 18, 14, 1, 12, 9,
    15, 4, 17, 11, 2, 4, 9, 3, 4,
  ]);

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
        inputSignal,
        setInputSignal,
        outputSignal,
        setOutputSignal,
        timeInterval,
        setTimeInterval,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
