import { AppContext } from "../../context/context.jsx";
import React, { useContext } from "react";
import style from "./style.module.css";
import Graph from "../graph/index.jsx";
import axios from "../../globals/api/axios";
const FilterPlot = () => {
  const {
    zeros,
    poles,
    magPoints,
    setMagPoints,
    phasePoints,
    setphasePoints,
    wPoints,
    setWPoints,
  } = useContext(AppContext);

  // Methods
  const filter = () => {
    console.log(zeros, poles);
    axios
      .post("/filter-data", {
        zeros: zeros,
        poles: poles,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data);
        console.log(res.data.mag);
        console.log(res.data.phase);
        console.log(res.data.w);

        setMagPoints(res.data.mag);
        setphasePoints(res.data.phase);
        setWPoints(res.data.w);

        console.log(magPoints);
        console.log(phasePoints);
        console.log(wPoints);
      });
  };

  return (
    <div className={style.container}>
      <Graph x={wPoints} y={magPoints} width={500} height={300} color="grey" />
      <Graph
        x={wPoints}
        y={phasePoints}
        width={500}
        height={300}
        color="grey"
      />

      <button onClick={filter}>Filter</button>
    </div>
  );
};

export default FilterPlot;
