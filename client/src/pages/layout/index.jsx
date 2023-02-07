import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import style from "./style.module.css";
import Home from "../home/index";

function Layout() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div className={style.navBar}>
        <FaIcons.FaBars onClick={showSidebar} className={style.navToggleBtn} />
      </div>

      <Home />

      <nav className={`${style.navMenu} ${sidebar ? style.active : ""}`}>
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
