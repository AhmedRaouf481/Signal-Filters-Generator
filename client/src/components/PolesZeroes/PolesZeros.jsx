import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import "./poleszeroes.css";

const PolesZeroes = () => {
    const [polesZeroesList, setPolesZeroesList] = useState([])
    const [point, setPoint] = useState({})
    const [type, setType] = useState(false)
    const [isDraggable, setIsDraggable] = useState(false)

    // Constants
    const marginX = 7
    const marginY = 14
    const orgin = 182
    const redius = 128

    // Methods

    const mapCoordinate = (coordinate, margin, sign = 1) => {
        coordinate = (coordinate + margin - orgin) / redius * sign
        return coordinate
    }

    const addPoint = (e) => {
        e.stopPropagation()
        setPoint({
            type,
            x: e.clientX - marginX,
            y: e.clientY - marginY
        })
        // console.log(e.clientX)
        // console.log(e.clientY)
    }

    useEffect(() => {
        if (Object.keys(point).length !== 0 && polesZeroesList.indexOf(point) === -1) {
            setPolesZeroesList((list) => ([...list, point]))
            // console.log(polesZeroesList);

        }
    }, [point])
    
    useEffect(() => {
        const zeroes = []
        const poles = []
        polesZeroesList.map((point,index) => {
            const x = mapCoordinate(point.x,marginX)
            const y = mapCoordinate(point.y,marginY,-1)
            if(point.type === false){
                zeroes.push({x,y})
            }else{
                poles.push({x,y})
            }
        })
        console.log(zeroes);
        console.log(poles);
        console.log(polesZeroesList);
    }, [polesZeroesList])

    const selectPoint = (e) => {
        e.stopPropagation();
        setIsDraggable(!isDraggable)
        const myPoint = polesZeroesList[e.currentTarget.id]
        myPoint.x = e.clientX - marginX
        myPoint.y = e.clientY - marginY
    }

    const dragPoint = (e) => {
        e.stopPropagation();
        if (isDraggable) {
            e.currentTarget.style.left = e.clientX - marginX + "px"
            e.currentTarget.style.top = e.clientY - marginY + "px"
            // console.log(e.currentTarget.style.top);
            // console.log("x", e.clientX)
            // console.log("y", e.clientY)
        }
    }

    const deletePoint = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let list = [...polesZeroesList]
        let pointIndex = e.currentTarget.id
        list.splice(pointIndex, 1)
        setPolesZeroesList(list)
        console.log(e.currentTarget.id);

    }


    return (
        <div>

            <div
                className="graph"
                onClick={addPoint}
            >
                <div className="unit_circle"></div>
                <div className="x-axis"></div>
                <div className="y-axis"></div>

                {
                    polesZeroesList.map((point, index) => (
                        <div
                            key={index}
                            id={index}
                            className={point.type ? 'pole' : 'zero'}
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

                    ))
                }
            </div>
            <BootstrapSwitchButton
                className="custom-btn"
                checked={type}
                onlabel='Pole'
                onstyle='primary'
                offlabel='Zero'
                offstyle='danger'
                width='100'
                style='mx-5'
                onChange={() => {
                    setType(!type)
                }}
            />
        </div>
    );
};

export default PolesZeroes;
