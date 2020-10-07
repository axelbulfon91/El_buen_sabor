import React from 'react'
import estilos from '../../../assets/css/NavegacionCocineroLateral.module.css';
import classnames from 'classnames'


const NavegacionCocineroLateral = ({ setVistaRenderizada }) => {


    return (
        <nav id="columna-1" className={classnames("d-flex flex-column justify-content-start", estilos.fondo)} >
            <div className="flex flex-column justify-content-center mt-5 nav-lateral">
                <button className={estilos.botonNavegacion} onClick={() => setVistaRenderizada("catalogo")}>Catálogo</button>
                <button className={estilos.botonNavegacion} onClick={() => setVistaRenderizada("pedidos")}>Pedidos</button>
            </div>
        </nav>
    )
}

export default NavegacionCocineroLateral
