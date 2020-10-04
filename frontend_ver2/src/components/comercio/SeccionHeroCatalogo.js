import React from 'react'
import estilos from '../../assets/css/SeccionHeroCatalogo.module.css'


const SeccionHeroCatalogo = () => {
    return (
        <div className={estilos.jumbo} data-aos="fade">
            <div className={estilos.contenedorTitulo}>
                <h1 className={estilos.h1}>Catálogo</h1>
            </div>
        </div>
    )
}

export default SeccionHeroCatalogo
