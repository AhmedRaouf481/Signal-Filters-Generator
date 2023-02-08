import PolesZeroes from "../../components/PolesZeroes/PolesZeros";
import FilterPlot from "../../components/filterPlot";
import SignalsPanel from "../../components/signalsPanel/index";
import { Container, Row, Col } from "react-bootstrap";
import style from "./style.module.css";

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={4} sm={4} md={4} lg={4}>
          <div className={style.left}>
            <PolesZeroes />
          </div>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4}>
          <div className={style.center}>
            <FilterPlot />
          </div>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4}>
          <div className={style.right}>
            <SignalsPanel />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
