
import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import Axios from 'axios';


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

  const { setLoggedIn } = useContext(UserContext);

  const [datosLogin, setdatosLogin] = useState({
    email: "",
    password: ""
  })

  const handleChange = e => {
    setdatosLogin({
      ...datosLogin,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await Axios.post('http://localhost:4000/api/usuarios/login', datosLogin);       
    
    if(resp.data.message === "Login correcto"){
      setLoggedIn(true);
      localStorage.setItem("token", resp.data.token)
      alert('Usuario Logueado correctamente')

    }else if(resp.data.message === "Contraseña incorrecta"){
      alert('Contraseña incorrecta')

    }else if(resp.data.message === "Usuario no registrado"){
      alert('Usuario no registrado')
      
    }

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
                  <Form className="register-form mt-5 " onSubmit={handleSubmit}>
                    <InputGroup className="form-group-no-border mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="email" placeholder="Email" type="email" onChange={handleChange} />
                    </InputGroup>

                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="password" placeholder="Password" type="password" onChange={handleChange} />
                    </InputGroup>
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
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
