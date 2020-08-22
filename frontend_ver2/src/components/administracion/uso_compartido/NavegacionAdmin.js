import React from 'react'
import { NavLink } from 'react-router-dom';


const NavegacionAdmin = () => {
    return (
        <div id="columna-1" className="flex-column text-white sidebar" style={{ backgroundColor: "DarkRed", boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }}>
            <h3 className="text-center my-4 pb-4  font-weight-light" style={{ borderBottom: "0px solid white" }}> <span className="border-top border-bottom"> DashBoard</span></h3>
            <div className="flex-column justify-content-center">
                <NavLink exact className="text-white nav-link" to="/admin">Stock</NavLink>
                <NavLink className="text-white nav-link" to="/admin/catalogo">Catálogo</NavLink>
                <NavLink className="text-white nav-link" to="/admin/pedidos">Pedidos</NavLink>
                <NavLink className="text-white nav-link" to="/admin/categorias">Categorías</NavLink>
                <NavLink className="text-white nav-link" to="/admin/existencias">Existencias</NavLink>
            </div>
        </div>
    )
}

export default NavegacionAdmin
