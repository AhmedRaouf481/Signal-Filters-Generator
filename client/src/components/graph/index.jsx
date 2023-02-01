// import { AppContext } from "../../context/context.jsx";
import React from "react";
import Plot from "react-plotly.js";

// import style from "./style.module.css";

const Graph = ({ x, y, width, height, color }) => {
  var trace = {
    // x: Array.from({ length: 1000 }, (v, k) => k + 1),
    // y: Array.from({ length: 1000 }, (v, k) => k ** 2),

    x: x,
    y: y,
    type: "scatter",
    line: {
      color: color,
      width: 2,
    },
  };

  var layout = {
    width: width,
    height: height,
  };

  return <Plot data={[trace]} layout={layout} />;
};

export default Graph;
