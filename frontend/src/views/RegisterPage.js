
import React from "react";

// reactstrap components

// core components
import Footer from "components/Footers/Footer.js";

// index sections

import SectionRegister from "views/sections/SectionRegister.js";


function Register() {

  return (
    <>
      <div className="main">
        <SectionRegister/>
        <Footer />
      </div>
    </>
  );
}

export default Register;
