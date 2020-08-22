import React from 'react'
import classnames from 'classnames';
import { RibbonOferta } from './RibbonOferta';
import estilos from '../../assets/css/TarjetaOfertas.module.css';



const TarjetaOfertas = (props) => {
    const { bebida, elaborado } = props
    const nombre = bebida
        ? <span>{bebida.bebida.Articulo.nombre}</span>
        : <span>{elaborado.elaborado.nombre}</span>
    const rutaImg = bebida ? bebida.bebida.Articulo.nombreImg : elaborado.elaborado.nombreImg
    const precio = bebida ? Number(bebida.bebida.precio) : Number(elaborado.elaborado.precio)
    const descuento = bebida ? Number(bebida.porcentajeDescuento) : Number(elaborado.porcentajeDescuento)
    const precioConDescuento = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(precio - ((precio * descuento) / 100))

    return (
        <div className={estilos.tarjeta}>
            <RibbonOferta porcentajeDescuento={descuento}></RibbonOferta>
            <div className="row no-gutters"
                style={{ height: "100%", overflow: "hidden", borderRadius: "15px" }}>
                <div className="col-md-7 p-3 pt-0 d-flex flex-column justify-content-around">
                    <h4 className="">{nombre}</h4>
                    <div>
                        <p className="mb-0">-Precio: <span style={{ textDecoration: "line-through", color: "FireBrick" }}>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(precio)}</span>
                        </p>
                        <p className=" pl-1"
                            style={{ color: "MediumTurquoise", fontSize: "1.5em" }}>
                            {precioConDescuento}
                        </p>
                    </div>
                </div>
                <div style={{
                    backgroundImage: "url(http://localhost:4000/imgs/" + rutaImg + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "",
                    overflow: "hidden"
                }} className={classnames("col-md-5 border-left")} >
                </div>
            </div>
        </div>
    )
}

export default TarjetaOfertas