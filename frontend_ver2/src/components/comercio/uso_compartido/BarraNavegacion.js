import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import estilos from '../../../assets/css/BarraNavegacion.module.css'
import jwtDecode from 'jwt-decode';


const BarraNavegacion = () => {
    const [navbarColor, setNavbarColor] = useState("");
    const [navbarShadow, setNavbarShadow] = useState("");
    const [textColor, setTextColor] = useState("text-white");
    const [isLoggedIn, setisLoggedIn] = useState(false)
    // const [linkUsuario, setLinkUsuario] = useState(null)
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
        // EFECTO SCROLL DEL NAVBAR
        window.addEventListener("scroll", updateNavbarColor);
        //Revisa si hay token (usuario logueado) y si hay muestra la data del mismo para ver su rol    
        if (localStorage.getItem('token')) {
            const userData = jwtDecode(localStorage.getItem('token'));
            console.log({ "Usuario logueado ": userData })
            setisLoggedIn(true)
        }
        //CleanUp de evento Sroll
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    }, []);
    //Modificacion de Links en base a logeo
    let linkUsuario = null;
    if (isLoggedIn) {
        linkUsuario = <NavLink exact className={classnames("h6 mx-1 nav-link", textColor)} to="/perfil"><i className="fa fa-user mr-2"></i>Perfil</NavLink>;
    } else {
        linkUsuario = <NavLink exact className={classnames("h6 mx-1 nav-link", textColor)} to="/login"><i className="fa fa-user mr-2"></i>Log In</NavLink>;
    }


    return (
        <Navbar className={classnames("fixed-top px-5 pb-0", navbarShadow, navbarColor)} expand="lg">
            <Navbar.Brand href="/" className={classnames("font-weight-bolder font-italic", textColor)}><span style={{ fontSize: "25px" }}><i className="fa fa-hamburger mr-2"></i>GT</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-auto" >
                    <NavLink exact className={classnames("h6 mx-1 nav-link", textColor)} to="/catalogo"><i className="fa fa-pizza-slice mr-2"></i>Catálogo</NavLink>
                    <NavLink exact className={classnames("h6 mx-1 nav-link", textColor)} to="/carrito"><i className="fa fa-shopping-cart mr-2"></i>Carrito</NavLink>
                    {linkUsuario}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default BarraNavegacion
