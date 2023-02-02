import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import "./poleszeroes.css";

const PolesZeroes = () => {
    const [polesZeroesList, setPolesZeroesList] = useState([])
    const [point, setPoint] = useState({})
    const [type, setType] = useState(false)


    // Methods
    const addPoint = (e) => {
        e.stopPropagation()
        setPoint({
            type,
            x: e.clientX - 7,
            y: e.clientY - 14
        })
        console.log(e.clientX)
        console.log(e.clientY)
    }

    useEffect(() => {
        if (Object.keys(point).length !== 0 && polesZeroesList.indexOf(point) === -1) {
            setPolesZeroesList((list) => ([...list, point]))
            console.log(polesZeroesList);

        }
    }, [point])

    const handlePoint = (e) => {
        e.stopPropagation();
        console.log(e.currentTarget);
    }
    function rightClick(e) {
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
                <div className="x-axis" ></div>
                <div className="y-axis"></div>

                {
                    polesZeroesList.map((point, index) => (
                        <div
                            key={index}
                            id={index}
                            className={point.type ? 'pole' : 'zero'}
                            style={{ top: point.y, left: point.x }}
                            onClick={handlePoint}
                            onContextMenu={rightClick}
                            draggable="true"
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
                onstyle='danger'
                offlabel='Zero'
                offstyle='primary'
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
