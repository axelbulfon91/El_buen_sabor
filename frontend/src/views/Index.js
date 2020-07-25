
import React from "react";

// reactstrap components

// core components

import IndexHeader from "components/Headers/IndexHeader.js";

// index sections

import SectionDestacados from "components/sections/principal/SectionDestacados.js";

import SectionAbout from "components/sections/generales/SectionAbout.js";



function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexHeader />
      <div className="main">
        <SectionDestacados/>
        <SectionAbout />
      </div>
    </>
  );
}

export default Index;

