
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function SectionDestacado() {
  return (
    <>
      <Container className="tim-container">
        <div id="images">
        <Container>
            <div className="title ">
              <h3 className="text-uppercase m-3 font-weight-bold">Productos Recomendados</h3>
            </div>
            <Row>
              <Col className="mr-auto ml-auto" md="3" sm="6">
                <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-2.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
              <Col className="mr-auto ml-auto" md="3" sm="6">
              <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-4.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
              <Col className="mr-auto ml-auto" md="3" sm="6">
              <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-5.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <div className="title">
              <h3 className="text-uppercase m-3 font-weight-bold">Productos Más vendidos</h3>
            </div>
            <Row>
              <Col className="mr-auto ml-auto" md="3" sm="6">
                <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-7.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
              <Col className="mr-auto ml-auto" md="3" sm="6">
              <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-1.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
              <Col className="mr-auto ml-auto" md="3" sm="6">
              <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-5.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <div className="title">
              <h3 className="text-uppercase m-3 font-weight-bold">Productos Más Vistos</h3>
            </div>
            <Row>
              <Col className="mr-auto ml-auto" md="3" sm="6">
                <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-4.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
              <Col className="mr-auto ml-auto" md="3" sm="6">
              <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-1.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
              <Col className="mr-auto ml-auto" md="3" sm="6">
              <h4 className="images-title">Nombre del Producto </h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/images/breakfast-5.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default SectionDestacado;
