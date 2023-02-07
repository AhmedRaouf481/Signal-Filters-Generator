import { AppContext } from "../../context/context.jsx";
import React, { useContext } from "react";
// import style from "./style.module.css";
import Graph from "../graph/index.jsx";
import AddSignal from "../addSignal/addSignal.jsx";

const SignalsPanel = () => {
  const { signalX, signalY, filteredSignalY } = useContext(AppContext);

  return (
    <>
      <AddSignal />

      <Graph
        x={signalX}
        y={signalY}
        color="#4586ff"
        height="30%"
        title={"Input Signal"}
      />
      <Graph
        x={signalX}
        y={filteredSignalY}
        color="#4586ff"
        height="30%"
        title={"Output Signal"}
      />
    </>
  );
};

export default SignalsPanel;
