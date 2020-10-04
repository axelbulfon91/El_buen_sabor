import React from 'react'
import classnames from 'classnames';
import estilos from '../../assets/css/SeccionHero.module.css';


const SeccionHero = () => {
    return (
        <>
            <div className={classnames("text-white", estilos.jumbo)} data-aos="fade">
                <div className={estilos.contenedorTitulo} >
                    <h1 className={classnames("font-italic w-100 text-left mb-0", estilos.h1)} > Goood<br />Taste!</h1>
                </div>
            </div>


        </>
    )
}

export default SeccionHero
