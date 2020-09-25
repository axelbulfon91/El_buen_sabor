import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import estilos from '../../../assets/css/BarraNavegacion.module.css'
import jwtDecode from 'jwt-decode';


const BarraNavegacion = () => {
    const [navbarColor, setNavbarColor] = useState("");
    const [navbarShadow, setNavbarShadow] = useState("");
    const [textColor, setTextColor] = useState("text-white");
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
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
        if (sessionStorage.getItem('token')) {
            const userData = jwtDecode(sessionStorage.getItem('token'));
            console.log(userData);
            switch (userData.rol) {
                case "ADMINISTRADOR":
                    window.location.href = "/admin"
                    break;
                case "CAJERO":
                    window.location.href = "/admin/cajero"
                    break;
                case "COCINERO":
                    window.location.href = "/admin/cocinero"
                    break;
                default:
                    break;
            }
            setUser(userData)
            setisLoggedIn(true)
        }
        //CleanUp de evento Sroll
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    }, []);


    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/"
    }
    //Modificacion de Links en base a logeo
    let linkUsuario = null;
    if (isLoggedIn) {
        linkUsuario = <NavDropdown title={<span className={classnames("h6", textColor)}><i className="fa fa-user-circle mr-2"></i>{user.nombre}</span>} className="navbar-dark">
            <NavDropdown.Item><NavLink exact to="/perfil"><i className="fa fa-user-edit mr-2"></i>Mi Perfil</NavLink></NavDropdown.Item>
            <NavDropdown.Item><NavLink exact to="/historialPedidos"><i className="fa fa-clock mr-2"></i>Historial</NavLink></NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleLogout()}><i className="fa fa-sign-out-alt mr-2"></i>Salir</NavDropdown.Item>
        </NavDropdown>

    } else {
        linkUsuario = <NavLink exact className={classnames("h6 my-0 mx-2", textColor)} to="/login"><i className="fa fa-user mr-2"></i>Ingresar</NavLink>;
    }



    return (
        <Navbar className={classnames("fixed-top px-5 ", navbarShadow, navbarColor)} expand="lg">
            <Navbar.Brand href="/" className={classnames("font-weight-bolder font-italic", textColor)}><span style={{ fontSize: "25px" }}><i className="fa fa-hamburger mr-2"></i>GT</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-auto d-flex align-items-center justify-content-between"  >
                    <NavLink exact className={classnames("h6 my-0 mx-2", textColor)} to="/catalogo"><i className="fa fa-pizza-slice mr-2"></i>Catálogo</NavLink>
                    <NavLink exact className={classnames("h6 my-0 mx-2", textColor)} to="/carrito"><i className="fa fa-shopping-cart mr-2"></i>Carrito</NavLink>
                    {linkUsuario}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default BarraNavegacion
