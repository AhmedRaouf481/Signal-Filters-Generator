import { AppContext } from "../../context/context.jsx";
import React, { useContext } from "react";
import style from "./style.module.css";
import Graph from "../graph/index.jsx";
import axios from "../../globals/api/axios";
const FilterPlot = () => {
  const {
    magPoints,
    phasePoints,
    wPoints,
  } = useContext(AppContext);


  return (
    <>
      <Graph
        x={wPoints}
        y={magPoints}
        color="grey"
        className={style.graph}
        height="30%"
      />
      <Graph
        x={wPoints}
        y={phasePoints}
        color="grey"
        className={style.graph}
        height="30%"
      />

    </>
  );
};

export default FilterPlot;
