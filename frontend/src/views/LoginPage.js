
import React from "react";

// reactstrap components

// core components
import Footer from "components/Footers/Footer.js";

// index sections

import SectionLogin from "views/sections/SectionLogin.js";


function Login() {

  return (
    <>
      <div className="main">
        <SectionLogin/>
        <Footer />
      </div>
    </>
  );
}

export default Login;
