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
    margin: {
      l: 30,
      r: 25,
      b: 25,
      t: 20,
      pad: 4,
    },
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
      responsive={true}
      style={{ width: "100%", height: height }}
    />
  );
};

export default Graph;
