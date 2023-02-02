import React from "react";
import Plot from "react-plotly.js";

const Graph = ({ x, y, width, height, color }) => {
  var trace = {
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
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4,
    },
  };

  return <Plot data={[trace]} layout={layout} />;
};

export default Graph;
