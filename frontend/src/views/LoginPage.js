
import React from "react";

// reactstrap components

// core components
import Footer from "components/Footers/Footer.js";

// reactstrap components
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

function Login() {

  return (
    <>
      <div className="main">
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/images/insta-1.jpg") + ")",
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className=" mx-auto text-dark">LOGIN</h3>
                <div className="social-line text-center">
                
                  <Button
                    className="btn-neutral  btn-danger text-light mt-0 ml-1 d-block text-center"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                  <i className="fa fa-google-plus" />
                  </Button>
             
                </div>
                <Form className="register-form mt-5 ">
                  <InputGroup className="form-group-no-border mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" />
                  </InputGroup>

                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" />
                  </InputGroup>
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    type="button"
                  >
                    INICIAR
                  </Button>
                </Form>
                <div className="register">
                  
                  <Button
                    className="btn-link"
                    color="dark"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Recordar contraseña
                  </Button>
                </div>
              </Card>
              <div className="col text-center">
                <Button
                  className="btn-round"
                  outline
                  color="info"
                  href="/RegisterPage"
                  size="lg"
                  target=""
                >
                  Registrarme
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>{" "}
      </div>
    </>
  );
}

export default Login;
