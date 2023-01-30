import { AppContext } from "../../context/context.jsx";
import React, { useContext } from "react";
import style from "./style.module.css";

const Test = () => {
  // fetch files from the context
  const { value, setValue } = useContext(AppContext);

  // Methods

  // increment value by 1
  function counter() {
    setValue(value + 1);
  }

  return (
    <div className={style.container}>
      <h2>{value}</h2>
      <button onClick={counter} className={style.IncButton}>
        Increment
      </button>
    </div>
  );
};

export default Test;
