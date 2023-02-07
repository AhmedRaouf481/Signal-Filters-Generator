import React, { useContext, useState } from "react";
import { AppContext } from "../../context/context";
import style from "./style.module.css";

const AddSignal = () => {
  const { signalY, setSignalY, signalX, setSignalX } = useContext(AppContext);
  const [signalLength, setSignalLength] = useState(0);

  const mouseMove = (event) => {
    setSignalY([...signalY, event.clientY]);
    setSignalX([...signalX, signalLength]);
    setSignalLength(signalLength + 1);
    if (signalY.length > 50) {
      setSignalY(signalY.slice(1, signalY.length));
      setSignalX(signalX.slice(1, signalX.length));
    }
  };

  const mouseLeave = () => {
    console.log("mouseLeave");
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
