
import React from "react";

// reactstrap components

// core components
import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import SectionAbout from "views/sections/SectionAbout.js";

// index sections

import SectionDetalle from "views/sections/SectionDetalle.js";


function Detalle() {

  return (
    <>
        <IndexNavbar />
      <div className="main">
        <SectionDetalle/>
        <SectionAbout />
        <Footer />
      </div>
    </>
  );
}

export default Detalle;
