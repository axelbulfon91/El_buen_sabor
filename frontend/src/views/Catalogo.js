
import React from "react";

// reactstrap components

// core components
import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import SectionAbout from "views/sections/SectionAbout.js";

// index sections

import SectionCatalogo from "views/sections/SectionCatalogo.js";


function Catalogo() {

  return (
    <>
        <IndexNavbar />
      <div className="main">
        <SectionCatalogo/>
        <SectionAbout />
        <Footer />
      </div>
    </>
  );
}

export default Catalogo;
