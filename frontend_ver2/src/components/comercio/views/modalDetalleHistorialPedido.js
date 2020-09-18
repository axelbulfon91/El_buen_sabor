import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';

const ModalDetalleHistorialPedido = ({ modalDetalle, setModalDetalle, detalle }) => {
    console.log(detalle)
    return (

        <Modal show={modalDetalle} onHide={() => setModalDetalle(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalle pedido N° {detalle.ped.id}</Modal.Title>
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
                        {detalle.ped.Detalle_Pedidos.map((prod, i) =>
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
                                <td>$ {prod.precioDetalle.toFixed(2)}</td>
                                <td>$ {(prod.precioDetalle * prod.cantidad).toFixed(2)}</td>
                            </tr>
                        )
                        }

                    </tbody>
                    <tfoot>
                        {(detalle.ped.tipoRetiro === 0) ?
                            <tr className="text-center"><td colSpan={4}>Tipo de entrega: <span className="text-danger">Delivery</span></td></tr>
                            :
                            <tr className="text-center"><td colSpan={4}>Tipo de entrega: <span className="text-danger">Retiro por local </span>( -10% )</td></tr>
                        }
                        <tr className="text-center"><td colSpan={4}><h5>
                            Precio final: <b> $ <span>
                                {detalle.ped.tipoRetiro === 0 ? detalle.total.toFixed(2) : (detalle.total - (detalle.total * 0.1)).toFixed(2)}</span>
                            </b></h5></td></tr>
                    </tfoot>
                </Table>



            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setModalDetalle(false)}>
                    Volver
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDetalleHistorialPedido
