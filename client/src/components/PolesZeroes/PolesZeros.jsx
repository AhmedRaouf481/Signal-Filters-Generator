import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import "./poleszeroes.css";


// Constants
const marginX = 7
const marginY = 14
const orgin = 182
const redius = 128

const PolesZeroes = () => {
    const [polesZeroesList, setPolesZeroesList] = useState([])
    const [point, setPoint] = useState({})
    const [type, setType] = useState(false)
    const [isDraggable, setIsDraggable] = useState(false)

    // onClick add a zero or pole
    const addPoint = (e) => {
        if (
            e.clientX < 332 - marginX
            && e.clientX > 32 + marginX
            && e.clientY < 332 - marginX
            && e.clientY > 32 + marginX
        ) {
            setPoint({
                type,
                x: e.clientX - marginX,
                y: e.clientY - marginY
            })
        }
    }
    
    // for every point added append it in polesZeroesList
    useEffect(() => {
        if (Object.keys(point).length !== 0 && polesZeroesList.indexOf(point) === -1) {
            setPolesZeroesList((list) => ([...list, point]))
        }
    }, [point])

    // send the points to the backend
    useEffect(() => {
        const zeroes = []
        const poles = []
        polesZeroesList.map((point, index) => {
            const x = mapCoordinate(point.x, marginX)
            const y = mapCoordinate(point.y, marginY, -1)
            if (point.type === false) {
                zeroes.push({ x, y })
            } else {
                poles.push({ x, y })
            }
        })
        console.log(zeroes);
        // console.log(poles);
        console.log(polesZeroesList);
    }, [polesZeroesList, isDraggable])


    // ******************************** Move or Delete a point functions ********************************
    
    // onClick
    const selectPoint = (e) => {
        e.stopPropagation();
        setIsDraggable(!isDraggable)
        const myPoint = polesZeroesList[e.currentTarget.id]
        if (e.clientX < 330 - marginX && e.clientX > 32 + marginX) {
            myPoint.x = e.clientX - marginX
        }
        if (e.clientY < 332 - marginX && e.clientY > 32 + marginX) {
            myPoint.y = e.clientY - marginY
        }
        console.log(e.clientX)
        console.log(e.clientY)
    }

    // onMouseMove
    const dragPoint = (e) => {
        e.stopPropagation();
        if (isDraggable) {
            e.currentTarget.style.cursor = "grabbing"
            if (e.clientX < 330 - marginX && e.clientX > 32 + marginX) {

                e.currentTarget.style.left = e.clientX - marginX + "px"
            }
            if (e.clientY < 332 - marginX && e.clientY > 32 + marginX) {
                e.currentTarget.style.top = e.clientY - marginY + "px"
            }
        }
        else {

            e.currentTarget.style.cursor = "grab"
        }
    }

    // onContextMenu (double click)
    const deletePoint = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let list = [...polesZeroesList]
        let pointIndex = e.currentTarget.id
        list.splice(pointIndex, 1)
        setPolesZeroesList(list)
        console.log(e.currentTarget.id);

    }

    // ******************************** End of Move or Delete a point functions ********************************


    return (
        <>
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
                            <div className="point">


                                <div className="menu">
                                    <p>To delete click on the right click</p>
                                </div>
                                <FontAwesomeIcon
                                    icon={point.type ? faXmark : faCircle}
                                    style={{ width: "100%", height: "100%" }}

                                />
                            </div>
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
        </>
    );

};

const mapCoordinate = (coordinate, margin, sign = 1) => {
    coordinate = (coordinate + margin - orgin) / redius * sign
    return coordinate
}

export default PolesZeroes;
