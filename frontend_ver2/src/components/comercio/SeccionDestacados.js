import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import estilos from '../../assets/css/SeccionDestacados.module.css'
import { Container } from 'react-bootstrap'
import TarjetaOfertas from './TarjetaOfertas'



const SeccionDestacados = ({ ofertas }) => {
    const [elaborados, setElaborados] = useState([])
    const [bebidas, setBebidas] = useState([])
    useEffect(() => {
        if (ofertas) {
            let bebEnOferta = []
            let elEnOferta = []
            for (const ofer of ofertas) {
                if (ofer.bebida) {
                    bebEnOferta.push(ofer)
                } else {
                    elEnOferta.push(ofer)
                }
            }
            setBebidas(bebEnOferta);
            setElaborados(elEnOferta);
        }
    }, [ofertas])

    return (
        <div className={estilos.fondo}>
            <div style={{marginLeft:"15%", marginRight:"15%"}}>
                <h1 className={classnames("display-5",estilos.titulo)}>Ahora en Oferta!</h1>
                <div className="d-flex justify-content-around mt-5 flex-wrap ">
                    {bebidas.map(b => <TarjetaOfertas key={b.id} bebida={b}></TarjetaOfertas>)}
                    {elaborados.map(el => <TarjetaOfertas key={el.id} elaborado={el}></TarjetaOfertas>)}
                </div>
            </div>
        </div>
    )
}

export default SeccionDestacados