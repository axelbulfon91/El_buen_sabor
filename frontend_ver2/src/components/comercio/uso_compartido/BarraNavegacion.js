import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import estilos from '../../../assets/css/BarraNavegacion.module.css'


const BarraNavegacion = () => {
    const [rolUsuario, setRolUsuario] = useState(null);
    const [navbarColor, setNavbarColor] = useState("");
    const [navbarShadow, setNavbarShadow] = useState("");
    const [textColor, setTextColor] = useState("text-white");
    /* ==========================
    EFECTO SCROLL DEL NAVBAR
=============================*/
    useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 299 ||
                document.body.scrollTop > 299
            ) {
                setTextColor("text-dark")
                setNavbarShadow(estilos.fondo)
            } else if (
                document.documentElement.scrollTop < 300 ||
                document.body.scrollTop < 300
            ) {
                setNavbarColor("");
                setTextColor("text-white")
                setNavbarShadow("")
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
        while (true) {

        }

    });
    return (
        <Navbar className={classnames("fixed-top px-5 pb-0", navbarShadow, navbarColor)} expand="lg">
            <Navbar.Brand href="/" className={classnames("font-weight-bolder font-italic", textColor)}><span style={{ fontSize: "25px" }}><i className="fa fa-hamburger mr-2"></i>GT</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-auto" >
                    <NavLink exact className={classnames("h6 mx-1 nav-link", textColor)} to="/catalogo"><i className="fa fa-pizza-slice mr-2"></i>Catálogo</NavLink>
                    <NavLink exact className={classnames("h6 mx-1 nav-link", textColor)} to="/perfil"><i className="fa fa-user mr-2"></i>Perfil</NavLink>
                    <NavLink exact className={classnames("h6 mx-1 nav-link", textColor)} to="/carrito"><i className="fa fa-shopping-cart mr-2"></i>Carrito</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default BarraNavegacion
