
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


  function TarjetaDireccion() {


    return (
      <>      

        <div className="col-sm-9">

        <div className="form-row">

            <div className="form-group col-lg-6 col-md-6 col-sm-12">
            
                <Input defaultValue="Santa Rosa" className="form-control mr-3" placeholder="Calle" type="text" name="calle" />
            
            </div>

            <div className="form-group col-lg-6 col-md-6 col-sm-12">    

                <Input defaultValue="2240" placeholder="Numeración" type="number" name="numeracion" />

            </div>  


        </div>

        </div>

        <div className="col-sm-3">

        <Button className="btn btn-default btn-lg mr-3"><i className="fas fa-eye"></i></Button>
        <Button className="btn btn-default btn-lg"><i className="fas fa-trash-alt"></i></Button>

        </div>

</>
      );
    }
    export default TarjetaDireccion;