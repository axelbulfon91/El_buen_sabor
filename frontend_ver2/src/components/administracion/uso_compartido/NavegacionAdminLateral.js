import React from 'react'
import { NavLink } from 'react-router-dom';

import estilos from '../../../assets/css/NavegacionAdminLateral.module.css';
import classnames from 'classnames'


const NavegacionAdmin = () => {


    return (
        <nav id="columna-1" className={classnames("d-flex flex-column justify-content-start", estilos.fondo)} >
            <div className="flex-column justify-content-center mt-5 nav-lateral">
                <NavLink exact className="text-white nav-link" to="/admin/dashboard">Dashboard</NavLink>
                <NavLink exact className="text-white nav-link" to="/admin/stock">Stock</NavLink>
                <NavLink className="text-white nav-link" to="/admin/catalogo">Catálogo</NavLink>
                <NavLink className="text-white nav-link" to="/admin/pedidos">Pedidos</NavLink>
                <NavLink className="text-white nav-link" to="/admin/categorias">Categorías</NavLink>
                <NavLink className="text-white nav-link" to="/admin/existencias">Existencias</NavLink>
                <NavLink className="text-white nav-link" to="/admin/usuarios">Usuarios</NavLink>
                <NavLink className="text-white nav-link" to="/admin/negocio">Datos Negocio</NavLink>
            </div>
        </nav>
    )
}

export default NavegacionAdmin
