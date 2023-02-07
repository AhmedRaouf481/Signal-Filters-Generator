import { AppContext } from "../../context/context.jsx";
import React, { useContext } from "react";
import style from "./style.module.css";
import Graph from "../graph/index.jsx";
const FilterPlot = () => {
  const { magPoints, phasePoints, wPoints } = useContext(AppContext);

  return (
    <>
      <Graph
        x={wPoints}
        y={magPoints}
        color="#2b2b28"
        className={style.graph}
        height="40%"
        title={"Magnitude"}
      />
      <Graph
        x={wPoints}
        y={phasePoints}
        color="#2b2b28"
        className={style.graph}
        height="40%"
        title={"Phase"}
      />
    </>
  );
};

export default FilterPlot;
