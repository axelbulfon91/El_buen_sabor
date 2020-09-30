import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import estilos from '../../../assets/css/NavegacionAdminLateral.module.css';
import classnames from 'classnames'


const NavegacionAdmin = () => {

    const [user, setUser] = useState(null)
    useEffect(() => {
        //Revisa si hay token (usuario logueado) y si hay muestra la data del mismo para ver su rol    
        if (sessionStorage.getItem('token')) {
            const userData = jwtDecode(sessionStorage.getItem('token'));
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
                <div className="flex-column justify-content-center mt-5">
                    <NavLink exact className="text-white nav-link" to="/admin">Dashboard</NavLink>
                    <NavLink exact className="text-white nav-link" to="/admin/stock">Stock</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/catalogo">Catálogo</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/pedidos">Pedidos</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/categorias">Categorías</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/existencias">Existencias</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/usuarios">Usuarios</NavLink>
                    <NavLink className="text-white nav-link" to="/admin/negocio">Datos Negocio</NavLink>
                </div>
            </div>

        </div>
    )
}

export default NavegacionAdmin
