import React from 'react'
import classnames from 'classnames';
import estilos from '../../assets/css/TarjetaCatalogo.module.css';
import { RibbonOferta } from './RibbonOferta';



const TarjetaCatalogo = (props) => {
    const { bebida, elaborado, oferta, handleShowModalDetalle } = props
    const tipoProducto = bebida ? "bebida" : "elaborado";
    const producto = bebida ? bebida : elaborado;
    const nombre = bebida
        ? <span>{bebida.Articulo.nombre}</span>
        : <span>{elaborado.nombre}</span>
    const rutaImg = bebida ? bebida.Articulo.nombreImg : elaborado.nombreImg
    const precio = bebida ? Number(bebida.precio) : Number(elaborado.precio)
    const descuento = oferta ? Number(oferta.porcentajeDescuento) : 0;
    const precioConDescuento = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(precio - ((precio * descuento) / 100))
    const descripcion = elaborado ? elaborado.detalle : ""



    return (
        <div className={classnames("", estilos.tarjeta)} onClick={() => handleShowModalDetalle(tipoProducto, producto, oferta)} >
            {oferta && <RibbonOferta porcentajeDescuento={descuento}></RibbonOferta>}
            <div className={classnames("row no-gutters")} style={{ height: "100%", overflow: "hidden" }}>
                <div className="col-md-7 p-2 pl-3 d-flex flex-column justify-content-between">
                    <h5 className="">{nombre}</h5>
                    <p style={{ fontSize: "0.7rem" }}>{descripcion}</p>
                    <h4>
                        <span>{precioConDescuento}</span>
                    </h4>
                </div>
                <div style={{
                    backgroundImage: "url(http://localhost:4000/imgs/" + rutaImg + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }} className={classnames("col-md-5 border-left")} >
                </div>
            </div>
        </div>
    )
}

export default TarjetaCatalogo
