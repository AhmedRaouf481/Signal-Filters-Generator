import { AppContext } from "../../context/context.jsx";
import React, { useContext } from "react";
// import style from "./style.module.css";
import Graph from "../graph/index.jsx";
import AddSignal from "../addSignal/addSignal.jsx";

const SignalsPanel = () => {
  const {
    inputSignal,

    outputSignal,

    timeInterval,
  } = useContext(AppContext);

  return (
    <>
      <AddSignal />
      <Graph x={timeInterval} y={inputSignal} color="grey" height="30%" />
      <Graph x={timeInterval} y={outputSignal} color="grey" height="30%" />
    </>
  );
};

export default SignalsPanel;
