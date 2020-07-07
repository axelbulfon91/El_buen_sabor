
import React from "react";

// reactstrap components

// core components
import SectionAbout from "components/sections/generales/SectionAbout.js";

// index sections

import SectionCatalogo from "components/sections/catalogo/SectionCatalogo.js";


function Catalogo() {

  return (
    <>

      <div className="main">
        <SectionCatalogo/>
        <SectionAbout />
   
      </div>
    </>
  );
}

export default Catalogo;
