import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import style from "./style.module.css";
import Home from "../home/index";
import { AppContext } from "../../context/context.jsx";

import Catalouge from "../../components/catalogue/index";
function Layout() {
  const { polesZeroesList, setPolesZeroesList } = useContext(AppContext);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const saveFile = async () => {
    const options = {
      types: [
        {
          description: "JSON",
          accept: {
            "application/json": ".json",
          },
        },
      ],
    };

    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify({ polesZeroesList: polesZeroesList }));
    await writable.close();
  };

  const getFile = async () => {
    const options = {
      types: [
        {
          description: "JSON",
          accept: {
            "application/json": ".json",
          },
        },
      ],
      excludeAcceptAllOption: true,
    };
    const [handle] = await window.showOpenFilePicker(options);
    const file = await handle.getFile();
    const content = await file.text();
    const contentJson = JSON.parse(content);
    const uploadedPoints = [];
    contentJson.polesZeroesList.map((uploadedPoint) => {
      let found = false;
      polesZeroesList.forEach((point) => {
        if (JSON.stringify(point) === JSON.stringify(uploadedPoint)) {
          found = true;
          return;
        }
      });
      if (!found) {
        uploadedPoints.push(uploadedPoint);
      }
    });
    setPolesZeroesList([...polesZeroesList, ...uploadedPoints]);
  };

  return (
    <div>
      <div className={style.navBar}>
        <FaIcons.FaBars onClick={showSidebar} className={style.navToggleBtn} />
        <button className="btn btn-dark btn-sm" onClick={getFile}>
          Import filter
        </button>
        <button className="btn btn-secondary btn-sm p-1 m-1" onClick={saveFile}>
          Export filter
        </button>
      </div>

      <Home />

      <nav className={`${style.navMenu} ${sidebar ? style.active : ""}`}>
        <div className={style.closeBar}>
          Catalogue
          <AiIcons.AiOutlineClose
            onClick={showSidebar}
            className={`${style.navToggleBtn} ${style.closeBtn}`}
          />
        </div>
        <Catalouge />
      </nav>
    </div>
  );
}

export default Layout;
