import React, { useContext } from "react";
import classnames from "classnames";
import estilos from "../../assets/css/SeccionContacto.module.css";
import datosContext from '../../datosLocalContext';


function SeccionContacto() {

    var datos = useContext(datosContext || null)
    function conocerDia(cod) {
        switch (cod) {
            case 1: return "Lunes";
            case 2: return "Martes";
            case 3: return "Miercoles";
            case 4: return "Jueves";
            case 5: return "Viernes";
            case 6: return "Sabado";
            case 0: return "Domingo";
        }
    }
    if (datos === null) {
        return <p>Cargando...</p>;
    }
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
                                                {datos.horarios !== undefined ?
                                                    datos.horarios.map((d, i) => (
                                                        <li key={i}><span>{conocerDia(d.dia)}</span></li>
                                                    )) :
                                                    <li>Sin datos</li>
                                                }
                                            </ul>   
                                        </div>
                                        <div className="col">
                                            <ul className="list-unstyled">
                                                {datos.horarios !== undefined ?
                                                    datos.horarios.map((d, i) => (
                                                        <li key={i}><span>{d.horarioApertura}</span> - <span>{d.horarioCierre}</span></li>
                                                    ))
                                                    : <li>Sin datos</li>
                                                }
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
                            <p>{ datos.Domicilio !== undefined ?
                                "Teléfonos de Contacto: " + datos.telefono +
                                " - Direccion: " + datos.Domicilio.calle + " " +
                                datos.Domicilio.numeracion + ", " +
                                datos.Domicilio.Localidad.nombre + ", " +
                                datos.Domicilio.Localidad.Provincium.nombre
                                :
                                <p>Sin datos</p>
                            }</p>
                        </div>
                    </div>
                </footer>
            </div>

        </>
    );

}

export default SeccionContacto;