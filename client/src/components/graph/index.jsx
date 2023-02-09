import React from "react";
import Plot from "react-plotly.js";

const Graph = ({ x, y, width, height, color, title }) => {
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
    title: title,
    margin: {
      l: 40,
      r: 25,
      b: 30,
      t: 40,
      pad: 4,
    },

    xaxis: {},
    yaxis: {},
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
      responsive={true}
      useResizeHandler={true}
      style={{ width: "100%", height: height }}
    />
  );
};

export default Graph;
