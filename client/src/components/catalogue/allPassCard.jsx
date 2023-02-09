import style from "./style.module.css";
import Graph from "../../components/graph/index";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/context";
import axios from "../../globals/api/axios";


const AllPassCard = ({ id, x, y, filter, zero, pole }) => {

    const {
        setphasePoints,
        setWPoints,
        allPassZeros,
        allPassPoles,
    } = useContext(AppContext);

    const [isSelected, setIsSelected] = useState(false)


    useEffect(() => {
        if (isSelected) {
            allPassZeros.current = allPassZeros.current.concat(zero)
            allPassPoles.current = allPassPoles.current.concat(pole)
        } else {
            allPassZeros.current.splice(allPassZeros.current.indexOf(...zero), 1)
            allPassPoles.current.splice(allPassPoles.current.indexOf(...pole), 1)
        }
        const zeros = allPassZeros.current;
        const poles = allPassPoles.current;
        axios
            .post("add-allpassfilter", { zeros, poles })
            .then((res) => {
                setWPoints(res.data["w"]);
                setphasePoints(res.data["phase"]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isSelected])

    return (
        <Card
            key={id}
            sx={{
                Width: "100%",
                margin: "5%",
                height: "12rem",
                borderRadius: "15px",
                border: isSelected ? "5px solid #4586ff" : "",
                backgroundColor: isSelected ? "#2b2b28" : "",
                opacity: isSelected ? "0.5" : "1",
            }}
            onClick={() => {
                setIsSelected(!isSelected)
            }}
        >
            <CardActionArea>
                <div style={{ height: "12rem" }}>
                    <Graph
                        x={x}
                        y={y}
                        color="#2b2b28"
                        className={style.graph}
                        height="100%"
                        title={filter}
                    />
                </div>
            </CardActionArea>
        </Card>
    )
}
export default AllPassCard