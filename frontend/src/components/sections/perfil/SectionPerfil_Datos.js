import React from "react";

// index sections
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


  function SectionPerfil() {
    return (
      <>
                            <div className="col-sm-12">
                                
                                <h3 className=" text-center font-weight-bold text-light">MIS DATOS</h3>
                            
                            </div>
                           
                            <div className="col-sm-12 col-md-6 col-lg-4" >
                               
                                <img className="img-thumbnail" src={require("assets/img/images/bg_2.jpg")}></img>
                            
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-8">

                                <InputGroup className="form-group-no-border mb-3">
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-pencil"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input value="Facundo García" readOnly/>
                                </InputGroup>

                                <InputGroup className="form-group-no-border mb-3">
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="far fa-envelope"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input value="facundonicolasgarcia@outlook.com" readOnly/>
                                </InputGroup>

                                <Form method="post" >

                                    <InputGroup className="form-group-no-border mb-3">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                        <i className="fas fa-key"></i>
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input className="mr-2" name="password" placeholder="Nueva Contraseña"  type="password" />
                                        <Input className="ml-2" name="repassword" placeholder="Confirmar Contraseña" type="password" />
                                    </InputGroup>

                                    <Button className="btn btn-dark w-100" type="submit">Cambiar Contraseña</Button>

                                </Form>
                            </div>
  </>
    );
}

export default SectionPerfil;