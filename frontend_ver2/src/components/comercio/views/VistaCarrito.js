import React from 'react'
import BarraNavegacion from '../uso_compartido/BarraNavegacion'
import estilos from '../../../assets/css/VistaCarrito.module.css'


const VistaCarrito = props => {
    return (
        <div className={estilos.fondo}>
            <BarraNavegacion></BarraNavegacion>
            <h1>Vista del Carrito</h1>
        </div>
    )
}

VistaCarrito.propTypes = {

}

export default VistaCarrito
