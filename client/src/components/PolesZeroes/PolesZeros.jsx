import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext, useRef } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "./poleszeroes.css";
import axios from "../../globals/api/axios";
import { AppContext } from "../../context/context.jsx";

// Constants
const marginX = 7;
const marginY = 14;
const orginX = 228;
const orginY = 268;
const redius = 128;
const startBorderX = 378;
const endBorderX = 78;
const startBorderY = 418;
const endBorderY = 118;

const PolesZeroes = () => {
  const {
    polesZeroesList,
    setPolesZeroesList,
    setMagPoints,
    setphasePoints,
    setWPoints,
  } = useContext(AppContext);

  // const [polesZeroesList, setPolesZeroesList] = useState([])
  const [point, setPoint] = useState({});
  const [type, setType] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);

  // onClick add a zero or pole
  const addPoint = (e) => {
    if (
      e.clientX < startBorderX - marginX &&
      e.clientX > endBorderX + marginX &&
      e.clientY < startBorderY - marginX &&
      e.clientY > endBorderY + marginX
    ) {
      setPoint({
        type,
        x: e.clientX - marginX,
        y: e.clientY - marginY,
      });
    }
  };

  // for every point added append it in polesZeroesList
  useEffect(() => {
    if (
      Object.keys(point).length !== 0 &&
      polesZeroesList.indexOf(point) === -1
    ) {
      // save the point in suitable range

      setPolesZeroesList((list) => [...list, point]);
    }
  }, [point]);

  // send the points to the Backend
  useEffect(() => {
    const zeros = [];
    const poles = [];
    polesZeroesList.map((point, index) => {
      const x = mapCoordinate(point.x, marginX, orginX);
      const y = mapCoordinate(point.y, marginY, orginY, -1);
      if (point.type === false) {
        zeros.push([x, y]);
      } else {
        poles.push([x, y]);
      }
    });
    axios
      .post("filter-data", { zeros, poles })
      .then((res) => {
        console.log(res);
        setMagPoints(res.data.mag);
        setphasePoints(res.data.phase);
        setWPoints(res.data.w);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(zeros);
    console.log(poles);
    // console.log(polesZeroesList);
  }, [polesZeroesList, isDraggable]);

  // ******************************** Move or Delete a point functions ********************************

  // onClick
  const selectPoint = (e) => {
    e.stopPropagation();
    setIsDraggable(!isDraggable);
    const myPoint = polesZeroesList[e.currentTarget.id];
    if (
      e.clientX < startBorderX - marginX &&
      e.clientX > endBorderX + marginX
    ) {
      myPoint.x = e.clientX - marginX;
    }
    if (
      e.clientY < startBorderY - marginX &&
      e.clientY > endBorderY + marginX
    ) {
      myPoint.y = e.clientY - marginY;
    }
    // console.log(e.clientX)
    // console.log(e.clientY)
  };

  // onMouseMove
  const dragPoint = (e) => {
    e.stopPropagation();
    if (isDraggable) {
      e.currentTarget.style.cursor = "grabbing";
      if (
        e.clientX < startBorderX - marginX &&
        e.clientX > endBorderX + marginX
      ) {
        e.currentTarget.style.left = e.clientX - marginX + "px";
      }
      if (
        e.clientY < startBorderY - marginX &&
        e.clientY > endBorderY + marginX
      ) {
        e.currentTarget.style.top = e.clientY - marginY + "px";
      }
    } else {
      e.currentTarget.style.cursor = "grab";
    }
  };

  // onContextMenu (double click)
  const deletePoint = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let list = [...polesZeroesList];
    let pointIndex = e.currentTarget.id;
    list.splice(pointIndex, 1);
    setPolesZeroesList(list);
    console.log(e.currentTarget.id);
  };

  // ******************************** End of Move or Delete a point functions ********************************

  const clearAllZeros = () => {
    setPolesZeroesList(polesZeroesList.filter((point) => point.type === true));
  };

  const clearAllPoles = () => {
    setPolesZeroesList(polesZeroesList.filter((point) => point.type === false));
  };

  return (
    <>
      <div className="graph" onClick={addPoint}>
        <div className="unit_circle"></div>
        <div className="x-axis"></div>
        <div className="y-axis"></div>

        {polesZeroesList.map((point, index) => (
          <div
            key={index}
            id={index}
            className={point.type ? "pole" : "zero"}
            style={{ top: point.y, left: point.x }}
            onClick={selectPoint}
            onContextMenu={deletePoint}
            onMouseMove={dragPoint}
          >
            <FontAwesomeIcon
              icon={point.type ? faXmark : faCircle}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </div>
      <BootstrapSwitchButton
        className="custom-btn"
        checked={type}
        onlabel="Pole"
        onstyle="secondary"
        offlabel="Zero"
        offstyle="dark"
        width="100"
        // style='mx-5'
        onChange={() => {
          setType(!type);
        }}
      />
      <div className="btns">
        <button
          className="btn btn-outline-danger btn-sm m-2"
          onClick={clearAllZeros}
        >
          Clear all zeros
        </button>
        <button
          className="btn btn-outline-danger btn-sm m-2"
          onClick={clearAllPoles}
        >
          Clear all poles
        </button>
      </div>
    </>
  );
};

const mapCoordinate = (coordinate, margin, orgin, sign = 1) => {
  coordinate = (sign * (coordinate + margin - orgin)) / redius;
  return coordinate;
};

export default PolesZeroes;
