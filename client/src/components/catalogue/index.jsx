import style from "./style.module.css";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import Graph from "../../components/graph/index";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const Catalogue = () => {
  const [checked, setChecked] = useState([1]);

  const signalX = [0, 1, 2, 3, 4, 5, 6, 7];
  const filteredSignalY = [0, 1, 2, 3, 4, 5, 6, 7];

  const handleToggle = (a_value) => () => {
    const currentIndex = checked.indexOf(a_value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(a_value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      dense
      sx={{
        width: "100%",
        maxHeight: "36",
        overflow: "auto",
        bgcolor: "#2b2b28",
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
          InputLabelProps={{
            shrink: true,
            sx: { color: "white" },
          }}
          variant="standard"
        />
        <p className={style.symbol}>+</p>
        <TextField
          sx={{ marginLeft: "5%", marginRight: "5%", width: "20%" }}
          id="filled-number"
          type="number"
          defaultValue="0"
          InputLabelProps={{
            shrink: true,
            sx: { color: "white" },
          }}
          variant="standard"
        />
        <p className={style.symbol}>j</p>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ height: "10%", marginLeft: "5%", marginRight: "5%" }}
        >
          Add
        </Button>
      </div>
      {[
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
        "1+0.9j",
      ].map((a_value) => {
        const labelId = `checkbox-list-secondary-label-${a_value}`;
        return (
          <Card sx={{ Width: "90%", margin: "5%", height: "15rem" }}>
            <CardActionArea>
              <div style={{ height: "15rem" }}>
                <Graph
                  x={signalX}
                  y={filteredSignalY}
                  color="#2b2b28"
                  className={style.graph}
                  height="100%"
                  title={a_value}
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
