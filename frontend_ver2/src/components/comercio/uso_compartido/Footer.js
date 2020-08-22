import React from 'react'
import estilos from '../../../assets/css/Footer.module.css'


const Footer = () => {
    return (
        <div className={estilos.fondo}>
            <div className="d-flex justify-content-end mx-5">
                <p><i className="fa fa-registered"></i> 2020 - QUATRO Software</p>
            </div>
        </div>
    )
}

export default Footer
