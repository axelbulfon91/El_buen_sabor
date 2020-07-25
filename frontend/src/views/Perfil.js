
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

// components
import SectionPerfilDatos from "components/sections/perfil/SectionPerfil_Datos";
import SectionPerfilDireccion from "components/sections/perfil/SectionPerfil_Direccion";
import SectionPerfilDirecciones from "components/sections/perfil/SectionPerfil_Direcciones";


function Perfil() {

 

  return (
    <>
      <div className="main">
        
            <div className="section section-image" style={{backgroundImage: "url(" + require("assets/img/images/insta-1.jpg") + ")"}}>

                <Container>
                    
                    <Row className="mx-auto bg-light-gray rounded p-3 m-5" style={{backgroundColor: "#B1AFAE"}}>

                        <SectionPerfilDatos/>
                        <SectionPerfilDireccion/>

                    </Row>

                </Container>

            </div>    
      </div>
    </>
  );
}

export default Perfil;
