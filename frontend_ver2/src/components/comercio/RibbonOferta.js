import React from 'react'
import estilos from '../../assets/css/RibbonOferta.module.css'


export const RibbonOferta = ({ porcentajeDescuento }) => {
    return (
        <div className={estilos.ribbon}>
            <span>-%{porcentajeDescuento}</span>
        </div>
    )
}
