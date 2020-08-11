
import React from "react";

import PaymentIcon from 'react-payment-icons-inline';

// reactstrap components
import { Container } from "reactstrap";

// core components

function IndexHeader() {
    
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/images/bg_3.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Delivery</h1>
           
            </div>
            <h2 className="presentation-subtitle text-center">
              Pedir desde tu casa nunca fue tan cómodo!
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
          }}
        />
        <h6 className="category category-absolute">
         Recibimos estas tarjetas{" "}
          <PaymentIcon icon="visa"  className="d-inline" style={{ margin: 5, width: 50, borderRadius:3 }} />
          <PaymentIcon icon="maestro" className="d-inline" style={{ margin: 5, width: 50, borderRadius:3 }} />
          <PaymentIcon icon="mastercard" className="d-inline" style={{ margin: 5, width: 50, borderRadius:3 }} />
         
        </h6>
      </div>
    </>
  );
}

export default IndexHeader;
