import React from 'react'
import { Modal, Row, Container, Col, Form, Image } from 'react-bootstrap'
import { formatDistanceStrict } from 'date-fns'
import TablaExistencias from './TablaExistencias'

const DetalleBebidaView = (props) => {

    const { producto, existencias } = props;

    let vtoMasProximo = "-";

    if (existencias) {
        vtoMasProximo = new Date(existencias[existencias.length-1].fechaVencimiento);
        existencias.forEach((ex) => {
            let fechaVencimiento = new Date(ex.fechaVencimiento);
            if (fechaVencimiento < vtoMasProximo && fechaVencimiento > new Date()) {
                vtoMasProximo = fechaVencimiento
            }
        })
        vtoMasProximo = formatDistanceStrict(vtoMasProximo, new Date(), {
            addSuffix: true
          });
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
                    Stock / <strong>Detalle Bebida </strong>
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col lg="4">
                                <Image fluid src={`http://localhost:4000/imgs/${producto.Articulo.nombreImg}`}></Image>
                                <h1 className="display-4">{producto.Articulo.nombre}</h1>
                                <span> Cod.Art: {producto.Articulo.id} </span>
                            </Col>
                            <Col lg="8" className="border-left">

                                <Form.Group as={Row} >
                                    <Form.Label column>
                                        Categoría:
                                    </Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={producto.Articulo.Categorium.nombre} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column>
                                        Costo última compra:
                                    </Form.Label>
                                    <Col >
                                        <Form.Control type="text" className={existencias ? "" : "text-center"} value={existencias ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(existencias[existencias.length-1].costoPorUnidad) + "/" + producto.Articulo.unidadMedida : "-"} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column>
                                        Vto. más próximo en:
                                    </Form.Label>
                                    <Col >
                                        <Form.Control type="text" className={existencias ? "" : "text-center"} value={vtoMasProximo} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column >
                                        Stock Máximo:
                                    </Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={producto.Articulo.stockMaximo + " "+ producto.Articulo.unidadMedida} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column>
                                        Stock Mínimo:
                                    </Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={producto.Articulo.stockMinimo + " "+ producto.Articulo.unidadMedida} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column>
                                        Stock Actual:
                                    </Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={ new Intl.NumberFormat().format(producto.Articulo.stockActual) + " "+  producto.Articulo.unidadMedida} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column>
                                        Precio Actual de Venta:
                                    </Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(producto.precio)} disabled />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="border-top">
                            <h6 className="mt-2">Historial de Adición de Existencias:</h6>
                                <TablaExistencias
                                    existencias={existencias}
                                ></TablaExistencias>
                        </Row>
                    </Container>
                </Modal.Body>
            </Form>
            <Modal.Footer style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap'
            }}>
            </Modal.Footer>
        </Modal>
    );
}

export default DetalleBebidaView
