import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import estilos from '../../../assets/css/BarraNavegacionAdmin.module.css';


const BarraNavegacionAdmin = () => {
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
        <nav className="navbar flex-md-nowrap p-0 shadow" style={user && user.rol === "ADMINISTRADOR" ? { background: "#fff" } : { background: "DarkRed", color: "white" }}>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <span>GT-Backoffice</span>
                </li>
            </ul>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <span className="border-top border-bottom"> {user && user.rol}</span>
                </li>
            </ul>
            <div className={estilos.botonLogout}>
                <div style={{ marginBottom: "0", }}><small>User: {user && user.nombre}</small></div>
                <button onClick={() => desloguearse()} style={user && user.rol === "ADMINISTRADOR" ? { color: "DarkRed" } : { color: "white" }}>Salir</button>
            </div>
        </nav>

    )
}

export default BarraNavegacionAdmin
