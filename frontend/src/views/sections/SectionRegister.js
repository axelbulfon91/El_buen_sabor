
import React from "react";

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

// core components

function SectionRegister() {
  return (
    <>
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/images/insta-1.jpg") + ")",
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register ">
                <h3 className=" mx-auto text-dark">REGISTRO</h3>
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
                      <i class="fa fa-pencil"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Nombre Completo" type="text" />
                  </InputGroup>

                  <InputGroup className="form-group-no-border mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i class="fa fa-phone"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Telefono" type="tel" />
                  </InputGroup>

                  <InputGroup className="form-group-no-border mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="fa fa-map"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Direccion" type="text" />
                  </InputGroup>

                  <InputGroup className="form-group-no-border mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" />
                  </InputGroup>

                  <InputGroup className="form-group-no-border mb-3">
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
                    Registrar
                  </Button>
                </Form>
              </Card>
              <div className="col text-center">
                <Button
                  className="btn-round"
                  outline
                  color="info"
                  href="/LoginPage"
                  size="lg"
                  target=""
                >
                  Logearme
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionRegister;
