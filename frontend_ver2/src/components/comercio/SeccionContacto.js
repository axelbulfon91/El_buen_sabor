import React from "react";
import classnames from "classnames";
import estilos from "../../assets/css/SeccionContacto.module.css";

function SeccionContacto() {
    return (
        <>
            <div className={classnames(estilos.fondo)}>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <h2 className={estilos.titulos}>Goood Taste!</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                            <div className="col-lg-4" style={{ paddingLeft: "5%" }}>
                                <div className="ftco-footer-widget mb-4">
                                    <h2 className={estilos.titulos}>Nuestros Horarios</h2>
                                    <div className="row" style={{ paddingRight: "10%" }}>
                                        <div className="col">
                                            <ul className="list-unstyled">
                                                <li><span>Martes</span></li>
                                                <li><span>Miércoles</span></li>
                                                <li><span>Lunes</span></li>
                                                <li><span>Jueves</span></li>
                                                <li><span>Viernes</span></li>
                                                <li><span>Sábado</span></li>
                                                <li><span>Domingo</span></li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <ul className="list-unstyled">
                                                <li><span>9:00 - 23:00</span></li>
                                                <li><span>9:00 - 23:00</span></li>
                                                <li><span>9:00 - 23:00</span></li>
                                                <li><span>9:00 - 23:00</span></li>
                                                <li><span>9:00 - 23:00</span></li>
                                                <li><span>17:00 - 23:00</span></li>
                                                <li><span>17:00 - 23:00</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">
                                <h2 className={estilos.titulos}>Seguinos en Nuestras Redes!</h2>
                                <ul className="list-unstyled text-center">
                                    <li><a href="#" className={classnames("text-white", estilos.instagramLook)}><span className="fa fa-instagram mr-2"></span>#goood.taste</a></li>
                                    <li><a href="#" className={classnames("text-white", estilos.facebookLook)}><span className="fa fa-facebook mr-2"></span>#goood.taste</a></li>
                                    <li><a href="#" className={classnames("text-white", estilos.twitterLook)}><span className="fa fa-twitter mr-2"></span>#goood.taste</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <p>{"Teléfonos de Contacto: +54-2616665532 / 2616665533 / 2616665534"}</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default SeccionContacto;