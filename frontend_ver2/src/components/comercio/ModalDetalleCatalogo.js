import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import estilos from '../../assets/css/ModalDetalleCatalogo.module.css'
import { RibbonOferta } from './RibbonOferta';


const ModalDetalleCatalogo = (props) => {
    const { producto, tipoProducto, oferta } = props;
    const [cantidad, setCantidad] = useState(1)

    const nombre = tipoProducto === "bebida"
        ? <span>{producto.Articulo.nombre}</span>
        : <span>{producto.nombre}</span>
    const rutaImg = tipoProducto === "bebida" ? producto.Articulo.nombreImg : producto.nombreImg
    const precio = Number(producto.precio);
    const descuento = oferta ? Number(oferta.porcentajeDescuento) : 0;
    const precioConDescuento = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(precio - ((precio * descuento) / 100))
    const descripcion = tipoProducto === "elaborado" ? producto.detalle : ""
    const subtotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((precio - ((precio * descuento) / 100)) * cantidad)
    
    const aniadirACarrito = () => {
        let detallePedido = {};
        tipoProducto === "bebida"
            ? detallePedido = { idBebida: producto.id, cantidad }
            : detallePedido = { idElaborado: producto.id, cantidad }
        console.log(detallePedido);
        //TODO: agregar al carrito el detallePedido
    }
    
    return (
        <Modal
            {...props}

            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            {oferta && <RibbonOferta porcentajeDescuento={descuento}></RibbonOferta>}
            <Modal.Body style={{ padding: "0px" }}>
                <div style={{
                    backgroundImage: "url(http://localhost:4000/imgs/" + rutaImg + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: "40vh",
                    textAlign: "right"
                }} >
                    <button className={estilos.botonCerrar}
                        onClick={() => props.onHide()}><span className="fa fa-close"></span></button>
                </div>
                <div className="p-3">
                    <h1 className="display-4">{nombre}</h1>
                    <p className="lead" style={{}}>{descripcion}</p>
                    <div style={{ height: "5vh" }}></div>
                    <div className="row">
                        <div className="col-9">
                            <h4>-Cantidad: </h4>
                        </div>
                        <div className="col-3 d-flex align-items-center justify-content-center" style={{ fontSize: "1.5rem" }}>
                            <Button variant="outline-dark" size="sm"
                                onClick={() => {
                                    if (cantidad > 1) {
                                        setCantidad(prev => prev - 1)
                                    }
                                }}
                            ><span className="fa fa-minus"></span></Button>
                            <span className="mx-1">{cantidad}</span>
                            <Button variant="outline-dark" size="sm"
                                onClick={() => setCantidad(prev => prev + 1)}>

                                <span className="fa fa-plus"></span></Button>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-9">
                            <h4>-Precio: </h4>
                        </div>
                        <div className="col-3 text-center">
                            <h4 style={oferta && { color: "MediumTurquoise" }}>{subtotal}</h4>
                        </div>
                    </div>
                    <div style={{ height: "2vh" }}></div>
                    <div className="text-right">
                        <Button variant="outline-secondary" block onClick={() => aniadirACarrito()}>Añadir al Pedido</Button>
                    </div>
                </div>


            </Modal.Body>
        </Modal>
    )
}

export default ModalDetalleCatalogo
