import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import style from "./style.module.css";
import Home from "../home/index";
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Graph from "../../components/graph/index";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';



function Layout() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [checked, setChecked] = React.useState([1]);

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
    <div>
      <div className={style.navBar}>
        <FaIcons.FaBars onClick={showSidebar} className={style.navToggleBtn} />
      </div>

      <Home />

      <nav className={`${style.navMenu} ${sidebar ? style.active : ""}`}>


        <List dense sx={{width: '100%', maxHeight: '36', overflow: 'auto', bgcolor: '#2b2b28', scrollbarWidth: 'none' }}>

          <div className={style.all_passs_input}>
          <TextField
            sx={{margin: '5%', width: '20%'}}
            id="filled-number"
            label="Number"
            type="number"
            defaultValue= '0'
            InputLabelProps={{
              shrink: true,
              sx : {color: 'white'}
            }}
            variant="standard"
            />
          <p className={style.symbol}>+</p>
          <TextField
            sx={{margin: '5%', width: '20%'}}
            id="filled-number"
            label="Number"
            type="number"
            defaultValue="0"
            InputLabelProps={{
              shrink: true,
              sx : {color: 'white'}
            }}
            variant="standard"
          />
          <p className={style.symbol}>j</p>
          <Button variant="contained" endIcon={<SendIcon />} sx={{height: '10%', margin: '7%'}}>
            Add
          </Button>
          </div>
          {['1+0.9j', '1+0.9j', '1+0.9j', '1+0.9j', '1+0.9j', '1+0.9j', '1+0.9j', '1+0.9j','1+0.9j', '1+0.9j', '1+0.9j'].map((a_value) => {
            const labelId = `checkbox-list-secondary-label-${a_value}`;
            return (
              <Card sx={{ Width: '90%', margin: '5%', height: '15rem'}} >
              <CardActionArea>
                <div style={{height: '15rem'}}>

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

        <div className={style.closeBar}>
          <AiIcons.AiOutlineClose
            onClick={showSidebar}
            className={`${style.navToggleBtn} ${style.closeBtn}`}
          />
        </div>
      </nav>
    </div>
  );
}

export default Layout;
