
import React from "react";
import Axios from 'axios';
import GoogleLogin from 'react-google-login';

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

function Register() {


  const registroCorrecto = async (r) => {

    const user = {
      googleId: r.googleId,
      email: r.profileObj.email,
      nombre: r.profileObj.name
    }
    const resp = await Axios.post("http://localhost:4000/api/usuarios/login/google", user)

    if (resp.data.message === 'Usuario creado correctamente') {
      alert(resp.data.message)
      window.sessionStorage.setItem('token', resp.data.token)
      window.location.href = "/"
    }else {
      alert(resp.data.message)
    }

  }

  const registroIncorrecto = () => {
    alert('Error al registrarse con Google')
  }


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
                <Card className="card-register ">
                  <h3 className=" mx-auto text-dark">REGISTRO</h3>
                  <div className="social-line text-center">

                    <GoogleLogin
                      clientId="505222477717-sitpp1mna4vtrih544ugpmorbo669qj9.apps.googleusercontent.com"
                      buttonText="Ingresar con Google"
                      onSuccess={registroCorrecto}
                      onFailure={registroIncorrecto}
                      cookiePolicy={'single_host_origin'}
                    />

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
      </div>
    </>
  );
}

export default Register;
