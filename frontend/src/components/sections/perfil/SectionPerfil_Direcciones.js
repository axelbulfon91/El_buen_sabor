import React from "react";


import TarjetaDireccion from "components/sections/perfil/TarjetaDireccion";
import { Button } from "reactstrap";

  function SectionDirecciones() {


    return (
      <>      

            <div className="col-12">
                
                <h5 className=" text-left font-weight-bold text-light">DIRECCIONES</h5>
            
            </div>
            
            <TarjetaDireccion/>
            <TarjetaDireccion/>

            <div className="col-12 text-left">
                <Button className="btn btn-dark btn-lg"> AGREGAR DIRECCIÓN</Button>
            </div>
        
      </>
      );
    }
    export default SectionDirecciones;