import style from "./style.module.css";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import Graph from "../../components/graph/index";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { AppContext } from "../../context/context";
import axios from "../../globals/api/axios";
const Catalogue = () => {
  const [r, setR] = useState("0");
  const [img, setImg] = useState("0");
  const [allPassZeros, setallPassZeros] = useState([]);
  const [allPassPoles, setallPassPoles] = useState([]);

  const {
    catalogue,
    setCatalogue,
    polesZeroesList,
    // setPolesZeroesList,
    // phasePoints,
    setphasePoints,
    // wPoints,
    setWPoints,
  } = useContext(AppContext);

  const addFilter = (r, img) => {
    // TODO: set zeros and poles
    const a = `${r}+${img}j`;
    axios
      .post("allpassfilter", { a })
      .then((res) => {
        const zeros = res.data["zeros"];
        const poles = res.data["poles"];
        axios
          .post("filter-data", { zeros, poles })
          .then((res) => {
            console.log(res.data["w"]);

            setCatalogue([
              {
                id: Date.now().toString(),
                filter: `a=${a}`,
                r: r,
                img: img,
                checked: false,
                zeros: zeros,
                poles: poles,
                x: res.data["w"],
                y: res.data["phase"],
              },
              ...catalogue,
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const applyAllPassFilter = () => {
    const zeros = allPassZeros;
    const poles = allPassPoles;

    for (let i = 0; i < polesZeroesList.length; i++) {
      if (polesZeroesList[i].type === false) {
        zeros.push([polesZeroesList[i].x, polesZeroesList[i].y]);
      } else {
        poles.push([polesZeroesList[i].x, polesZeroesList[i].y]);
      }
    }

    axios
      .post("filter-data", { zeros, poles })
      .then((res) => {
        setWPoints(res.data["w"]);
        setphasePoints(res.data["phase"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <List
      dense
      sx={{
        width: "100%",
        maxHeight: "36",
        overflow: "auto",
        bgcolor: "#464643",
        scrollbarWidth: "none",
      }}
    >
      <div className={style.allPasssInput}>
        <p className={style.symbol}>a=</p>
        <TextField
          sx={{ marginLeft: "5%", marginRight: "5%", width: "20%" }}
          id="filled-number"
          type="number"
          defaultValue="0"
          step="0.1"
          onChange={(e) => {
            setR(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
            sx: { color: "white" },
          }}
          inputProps={{
            style: { color: "white", textAlign: "center", padding: "0.5rem" },
            step: 0.1,
          }}
          variant="outlined"
        />
        <p className={style.symbol}>+</p>
        <TextField
          sx={{ marginLeft: "5%", marginRight: "5%", width: "20%" }}
          id="filled-number"
          type="number"
          defaultValue="0"
          step="0.1"
          onChange={(e) => {
            setImg(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
            sx: { color: "white" },
          }}
          inputProps={{
            style: { color: "white", textAlign: "center", padding: "0.5rem" },
            step: 0.1,
          }}
          variant="outlined"
        />
        <p className={style.symbol}>j</p>
        <Button
          variant="contained"
          sx={{ height: "10%", marginLeft: "3%", marginRight: "3%" }}
          onClick={() => {
            let flag = false;
            for (let i = 0; i < catalogue.length; i++) {
              if (catalogue[i].r === r && catalogue[i].img === img) {
                flag = true;
                break;
              }
            }
            if (flag === false) {
              addFilter(r, img);
            }
          }}
        >
          Add
        </Button>
      </div>
      {catalogue.map((value) => {
        return (
          <Card
            sx={{
              Width: "100%",
              margin: "5%",
              height: "12rem",
              borderRadius: "15px",
              border: value["checked"] === true ? "5px solid #4586ff" : "",
              backgroundColor: value["checked"] === true ? "#2b2b28" : "",
              opacity: value["checked"] === true ? "0.5" : "1",
            }}
            onClick={() => {
              setallPassPoles([]);
              setallPassZeros([]);
              setCatalogue(
                catalogue.map((item) => {
                  if (item["checked"] === true) {
                    console.log(item["filter"]);
                  }
                  if (item["id"] === value["id"]) {
                    return {
                      ...item,
                      checked: !item["checked"],
                    };
                  }
                  return item;
                })
              );
              applyAllPassFilter();
            }}
          >
            <CardActionArea>
              <div style={{ height: "12rem" }}>
                <Graph
                  x={value["x"]}
                  y={value["y"]}
                  color="#2b2b28"
                  className={style.graph}
                  height="100%"
                  title={value["filter"]}
                />
              </div>
            </CardActionArea>
          </Card>
        );
      })}
    </List>
  );
};

export default Catalogue;
