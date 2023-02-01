// import style from "./style.module.css";
import FilterPlot from "../../components/filterPlot";
import Graph from "../../components/graph/index";

const Home = () => {
  return (
    <div>
      {" "}
      <Graph
        x={[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ]}
        y={[
          12, 9, 15, 4, 17, 11, 2, 4, 9, 3, 4, 5, 15, 14, 19, 2, 17, 18, 14, 1,
          12, 9, 15, 4, 17, 11, 2, 4, 9, 3, 4,
        ]}
        width={400}
        height={300}
        color="grey"
      />
      <FilterPlot />
    </div>
  );
};

export default Home;
