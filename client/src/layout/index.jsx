import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import style from "./style.module.css";
import Home from "../pages/home/index";
import { Container, Col, Row } from "react-bootstrap";
function Layout() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Container fluid>
        <FaIcons.FaBars onClick={showSidebar} className={style.navToggleBtn} />

        <Row>
          <Home />
        </Row>
      </Container>
      <nav className={`${style.navMenu} ${sidebar ? style.active : ""}`}>
        <div className={style.closeBar}>
          <AiIcons.AiOutlineClose
            onClick={showSidebar}
            className={`${style.navToggleBtn} ${style.closeBtn}`}
          />
        </div>
      </nav>
    </>
  );
}

export default Layout;
