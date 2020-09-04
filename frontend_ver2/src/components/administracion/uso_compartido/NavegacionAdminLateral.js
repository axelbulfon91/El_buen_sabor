import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import estilos from '../../../assets/css/NavegacionAdminLateral.module.css';
import classnames from 'classnames'


const NavegacionAdmin = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        //Revisa si hay token (usuario logueado) y si hay muestra la data del mismo para ver su rol    
        if (localStorage.getItem('token')) {
            const userData = jwtDecode(localStorage.getItem('token'));
            console.log(userData);
            setUser(userData)
        }
    }, [])
    const desloguearse = () => {
        sessionStorage.clear();
        window.location.href = "/login"
    }
    return (
        <div id="columna-1" className={classnames("d-flex flex-column justify-content-start text-white sidebar", estilos.fondo)} >
            <div>
                <h5 className="text-center mt-4 pb-0  font-weight-light" style={{ borderBottom: "0px solid white" }}> <span className="border-top border-bottom"> {user && user.rol}</span></h5>
                <div className={estilos.botonLogout}>
                    <div><small>User: {user && user.nombre}</small></div>
                    <button onClick={() => desloguearse()}>Salir</button>
                </div>
                <div className="flex-column justify-content-center mt-5">
                    <NavLink exact className="text-white nav-link" to="/admin">Dashboard</NavLink>
                    <NavLink exact className="text-white nav-link" to="/admin">Stock</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/catalogo">Catálogo</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/pedidos">Pedidos</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/categorias">Categorías</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/existencias">Existencias</NavLink>
                </div>
            </div>

        </div>
    )
}

export default NavegacionAdmin
