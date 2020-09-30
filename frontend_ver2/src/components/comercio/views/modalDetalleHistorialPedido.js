import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import { obtenerTotal } from './HistorialPedidos';

const ModalDetalleHistorialPedido = ({ modalDetalle, setModalDetalle, detalle }) => {

    if (detalle.Detalle_Pedidos !== undefined) {
        return (

            <Modal show={modalDetalle} onHide={() => setModalDetalle(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Pedido N° {detalle.id} realizado el dia {new Date(detalle.createdAt).toLocaleDateString()} a las {new Date(detalle.createdAt).toLocaleTimeString()} hs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead className="thead-dark">
                            <tr><th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalle.Detalle_Pedidos.map((prod, i) =>
                                <tr key={i}>
                                    {prod.elaborado ?
                                        <td>
                                            {prod.elaborado.nombre}
                                        </td>
                                        :
                                        <td>
                                            {prod.bebida.Articulo.nombre}
                                        </td>
                                    }

                                    <td>{prod.cantidad}</td>
                                    <td>$ {(prod.precioDetalle / prod.cantidad).toFixed(2)}</td>
                                    <td>$ {((prod.precioDetalle / prod.cantidad) * prod.cantidad).toFixed(2)}</td>
                                </tr>
                            )}
                            {(detalle.tipoRetiro === 0) ?
                                <tr className="text-center"><td colSpan={4}>Tipo de entrega: <span className="text-danger">Delivery</span></td></tr>
                                :
                                <tr className="text-center"><td colSpan={4}>Tipo de entrega: <span className="text-danger">Retiro por local </span>( -10% )</td></tr>
                            }
                            {(detalle.tipoRetiro === 1) ?
                                <tr className="text-center"><td colSpan={4}><h5>
                                Precio final: <b> $ <span>
                                    {(obtenerTotal(detalle) - (obtenerTotal(detalle) * 0.1)).toFixed(2)}</span>
                                </b></h5></td></tr>
                                :
                                <tr className="text-center"><td colSpan={4}><h5>
                                Precio final: <b> $ <span>
                                    {obtenerTotal(detalle).toFixed(2)}</span>
                                </b></h5></td></tr>
                            }                            
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setModalDetalle(false)}>
                        Volver
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }else{
        return null
    }

}

export default ModalDetalleHistorialPedido
