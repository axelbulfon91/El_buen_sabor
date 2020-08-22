import React, { Fragment } from 'react'
import BarraNavegacion from '../uso_compartido/BarraNavegacion';
import SeccionHeroCatalogo from '../SeccionHeroCatalogo';
import SeccionProductos from '../SeccionProductos';
import SeccionContacto from '../SeccionContacto';
import Footer from '../uso_compartido/Footer';
import estilos from '../../../assets/css/Catalogo.module.css';



const Catalogo = () => {

    return (
        <Fragment>
            <div className={estilos.fondo}></div>
            <BarraNavegacion></BarraNavegacion>
            <SeccionHeroCatalogo></SeccionHeroCatalogo>
            <SeccionProductos></SeccionProductos>
            <SeccionContacto></SeccionContacto>
            <Footer></Footer>
        </Fragment>

    )
}

export default Catalogo
