import React from 'react'
import BarraNavegacion from '../uso_compartido/BarraNavegacion'
import estilos from '../../../assets/css/VistaPerfil.module.css'


const Perfil = () => {
    return (
        <div className={estilos.fondo}>
            <BarraNavegacion></BarraNavegacion>
            <h1>Perfil del Usuario</h1>
        </div>
    )
}

export default Perfil
