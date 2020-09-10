import React from 'react'
import { Modal, Row, Container, Col, Form } from 'react-bootstrap'
import { format } from 'date-fns'
import TablaDetallesPedido from './TablaDetallesPedido';
import { AccionesPedido } from './AccionesPedido';

const DetallePedidoView = (props) => {
    const { pedido } = props;
    const devolverEstado = (estado) => {
        switch (estado) {
            case "pendiente":
                return <span style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkSalmon", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pendiente</span>
            case "confirmado":
                return <span style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkTurquoise", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Confirmado</span>
            case "demorado":
                return <span style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkOrchid", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Demorado</span>
            case "listo":
                return <span style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkSeaGreen", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Listo</span>
            case "entregado":
                return <span style={{ border: "1px solid black", width: "135px", backgroundColor: "DeepSkyBlue", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Entregado</span>
            case "cancelado":
                return <span style={{ border: "1px solid black", width: "135px", backgroundColor: "Crimson", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Cancelado</span>

            default:
                break;
        }
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="font-weight-lighter">
                    Stock / <strong>Detalle Pedido nro: {pedido.id} </strong>
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Container>
                        <Form.Group as={Row} >
                            <Form.Label column>
                                Fecha:
                                    </Form.Label>
                            <Col >
                                <Form.Control type="text" value={format(new Date(pedido.createdAt), "dd/MM/yy")} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column>
                                Hora:
                                    </Form.Label>
                            <Col >
                                <Form.Control type="text" value={format(new Date(pedido.createdAt), "hh:mm")} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column>
                                Cliente:
                                    </Form.Label>
                            <Col >
                                <Form.Control type="text" value={pedido.Usuario.nombre} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column>
                                Tiempo de Elaboración:
                                    </Form.Label>
                            <Col >
                                <Form.Control type="text" value={pedido.tiempoElaboracion + " minutos"} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column>
                                Tipo de Retiro:
                                    </Form.Label>
                            <Col >
                                <Form.Control type="text" value={pedido.tipoRetiro === 0 ? "Delivery" : "Retiro Por Local"} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column>
                                Estado Actual:
                                    </Form.Label>
                            <Col >
                                <Form.Control type="text" value={pedido.estado} disabled />
                            </Col>
                        </Form.Group>
                        <p className="mb-2 mt-1 pt-1 font-weight-bold border-top"> -Detalle del Pedido: </p>
                        <TablaDetallesPedido productos={pedido.Detalle_Pedidos} />

                    </Container>
                </Modal.Body>
            </Form>
            <Modal.Footer style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap'
            }}>
            </Modal.Footer>
            <AccionesPedido
                setRefreshToken={props.setRefreshToken}
                pedido={pedido}
                onHide={props.onHide}
            />

        </Modal>
    )
}

export default DetallePedidoView
