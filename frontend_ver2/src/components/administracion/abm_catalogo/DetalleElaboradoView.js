import React from 'react'
import { Modal, Row, Container, Col, Form, Image, Table } from 'react-bootstrap'

const DetalleElaboradoView = (props) => {
    const { elaborado } = props;

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="font-weight-lighter">Stock /<strong>Detalle Elaborado </strong></Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col lg="6">
                                <Image fluid src={`http://localhost:4000/imgs/${elaborado.nombreImg}`}></Image>
                                <h1 className="display-4">{elaborado.nombre}</h1>
                                <Form.Group>
                                    <Form.Label>
                                        Descripción:
                                    </Form.Label>
                                    <Form.Control as="textarea" rows="2" value={elaborado.detalle} disabled />
                                </Form.Group>
                            </Col>

                            <Col lg="6" className="border-left">
                                <Form.Group as={Row}>
                                    <Form.Label column>Código de Elaborado:</Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={elaborado.id} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column>Categoría:</Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={elaborado.Categorium.nombre} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column>Es parte del Catálogo:</Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={elaborado.esCatalogo ? "Si" : "No"} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column>Tiempo de Elaboración:</Form.Label>
                                    <Col >
                                        <Form.Control type="text" value={elaborado.tiempoElaboracion + " minutos"} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column>Ingredientes:</Form.Label>
                                    <Table className="mx-3" striped size="sm" variant='light' >
                                        <thead variant="dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Cantidad</th>
                                                <th>Unidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {elaborado.detalle_elaborados.map((detalle, index) => {
                                                if (detalle) {
                                                    return <tr key={detalle.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{detalle.Articulo.nombre}</td>
                                                        <td>{(detalle.cantidad).toFixed(3)}</td>
                                                        <td>{detalle.Articulo.unidadMedida}</td>
                                                    </tr>
                                                } else {
                                                    return
                                                }

                                            })}
                                        </tbody>
                                    </Table>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

export default DetalleElaboradoView
