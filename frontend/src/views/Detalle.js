
import React from "react";

// reactstrap components

// core components
import SectionAbout from "components/sections/generales/SectionAbout.js";

// index sections

import SectionDetalle from "components/sections/catalogo/SectionDetalle.js";


function Detalle() {

  return (
    <>
      <div className="main">
        <SectionDetalle/>
        <SectionAbout />
      </div>
    </>
  );
}

export default Detalle;
