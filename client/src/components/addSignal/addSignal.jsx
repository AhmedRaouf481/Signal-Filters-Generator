import React, { useContext, useState } from "react";
import { AppContext } from "../../context/context";
import style from "./style.module.css";
import axios from "../../globals/api/axios";
const AddSignal = () => {
  const {
    signalY,
    setSignalY,
    signalX,
    setSignalX,
    polesZeroesList,
    setFilteredSignalY,
  } = useContext(AppContext);
  const [signalLength, setSignalLength] = useState(0);

  const mouseMove = (event) => {
    setSignalY([...signalY, event.clientY]);
    setSignalX([...signalX, signalLength]);
    setSignalLength(signalLength + 1);
    if (signalY.length > 50) {
      setSignalY(signalY.slice(1, signalY.length));
      setSignalX(signalX.slice(1, signalX.length));
    }
    addPoint(signalX, signalY);
  };

  const mouseLeave = () => {
    console.log("mouseLeave");
  };

  const addPoint = (sigX, sigY) => {
    // const zeros = [];
    // const poles = [];

    // for (let i = 0; i < polesZeroesList.length; i++) {
    //   if (polesZeroesList[i].type === false) {
    //     zeros.push([polesZeroesList[i].x, polesZeroesList[i].y]);
    //   } else {
    //     poles.push([polesZeroesList[i].x, polesZeroesList[i].y]);
    //   }
    // }
    axios
      .post("apply-filter", { 
        // zeros, poles, 
        sigX, sigY })
      .then((res) => {
        console.log(res.data["filteredSignalY"]);
        setFilteredSignalY(res.data["filteredSignalY"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={style.container}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
    >
      <div class={style.plane}></div>
    </div>
  );
};

export default AddSignal;
