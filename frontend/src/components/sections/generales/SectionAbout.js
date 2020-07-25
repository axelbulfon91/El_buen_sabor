
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import Style from "../../../assets/css/style.css";

// core components

function SectionDark() {
  return (
    <>
      <div className="section section-dark">
            <footer className="ftco-footer ftco-bg-dark ftco-section">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-3">
                    <div className="ftco-footer-widget mb-4">
                      <h2 className="ftco-heading-2">El Buen Sabor</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                        <li className="ftco-animate"><a href="#"><span className="fa fa-instagram"></span></a></li>
                        <li className="ftco-animate"><a href="#"><span className="fa fa-facebook"></span></a></li>
                        <li className="ftco-animate"><a href="#"><span className="fa fa-twitter"></span></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="ftco-footer-widget mb-4">
                      <h2 className="ftco-heading-2">Nuestros Horarios</h2>
                      <ul className="list-unstyled open-hours">
                        <li className="d-flex"><span>Lunes</span><span>9:00 - 24:00</span></li>
                        <li className="d-flex"><span>Martes</span><span>9:00 - 24:00</span></li>
                        <li className="d-flex"><span>Miércoles</span><span>9:00 - 24:00</span></li>
                        <li className="d-flex"><span>Jueves</span><span>9:00 - 24:00</span></li>
                        <li className="d-flex"><span>Viernes</span><span>9:00 - 02:00</span></li>
                        <li className="d-flex"><span>Sábado</span><span>9:00 - 02:00</span></li>
                        <li className="d-flex"><span>Domingo</span><span> 9:00 - 02:00</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="ftco-footer-widget mb-4">
                      <h2 className="ftco-heading-2">Instagram</h2>
                      <div className="thumb d-sm-flex">

                        <a href="#" className="thumb-menu img" style={{ backgroundImage: `url(${require("../../../assets/img/images/breakfast-1.jpg")})` }}>
                        </a>
                        <a href="#" className="thumb-menu img" style={{ backgroundImage: `url(${require("../../../assets/img/images/breakfast-2.jpg")})` }}>
                        </a>
                        <a href="#" className="thumb-menu img" style={{ backgroundImage: `url(${require("../../../assets/img/images/breakfast-3.jpg")})` }}>
                        </a>
                      </div>
                      <div className="thumb d-flex">
                        <a href="#" className="thumb-menu img" style={{ backgroundImage: `url(${require("../../../assets/img/images/breakfast-4.jpg")})` }}>
                        </a>
                        <a href="#" className="thumb-menu img" style={{ backgroundImage: `url(${require("../../../assets/img/images/breakfast-5.jpg")})` }}>
                        </a>
                        <a href="#" className="thumb-menu img" style={{ backgroundImage: `url(${require("../../../assets/img/images/breakfast-6.jpg")})` }}>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="ftco-footer-widget mb-4">
                      <h2 className="ftco-heading-2">Novedades</h2>
                      <p>Si quieres recibir promociones y descuentos. SUSCRIBITE!</p>
                      <form action="#" className="subscribe-form">
                        <div className="form-group">
                          <input type="text" className="form-control mb-2 text-center" placeholder="Ingrese Email"/>
                          <input type="submit" value="Suscribirse" className="form-control submit px-3"/>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
      </div>
    </>
  );
}

export default SectionDark;
