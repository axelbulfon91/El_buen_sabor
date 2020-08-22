import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Container, Col, Form } from 'react-bootstrap'
import SeleccionadorImg from '../uso_compartido/SeleccionadorImg'

const FormBebidasView = (props) => {
    const [nombre, setNombre] = useState('');
    const [nombreImg, setRutaImagen] = useState('');
    const [categoria, setCategoria] = useState(props.categorias[0].id);
    const [unidadMedida, setUnidadDeMedida] = useState('unidad');
    const [stockMaximo, setStockMaximo] = useState(0);
    const [stockMinimo, setStockMinimo] = useState(0);
    const [precio, setPrecio] = useState(0);

    useEffect(() => {
        if (props.bebida) {
            setNombre(props.bebida.Articulo.nombre);
            setRutaImagen(props.bebida.Articulo.nombreImg);
            setCategoria(props.bebida.Articulo.Categorium.id);
            setUnidadDeMedida(props.bebida.Articulo.unidadMedida);
            setStockMaximo(props.bebida.Articulo.stockMaximo);
            setStockMinimo(props.bebida.Articulo.stockMinimo)
            setPrecio(props.bebida.precio)
        } else {
            setNombre('');
            setRutaImagen('');
            setCategoria(props.categorias[0].id);
            setUnidadDeMedida('unidad');
            setStockMaximo(0);
            setStockMinimo(0)
            setPrecio(0)
        }
    }, [props.bebida])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {props.bebida 
                        ? <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Actualizar datos de Bebida</span></span> 
                        : <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Crear un Nueva Bebida</span></span> }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} md={4}>
                                <Form.Group >
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </Form.Group>
                                <SeleccionadorImg setRutaImagen={setRutaImagen} rutaImagen={nombreImg} />
                            </Col>
                            <Col xs={6} md={8} className="border-left">
                                <Form.Group >
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Control as="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                        {
                                            props.categorias && props.categorias.map((categoria) => {
                                                return <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Unidad de Medida</Form.Label>
                                    <Form.Control type="text" value={unidadMedida} onChange={(e) => setUnidadDeMedida(e.target.value)} disabled>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Stock Máximo</Form.Label>
                                    <Form.Control type="number" value={stockMaximo} onChange={(e) => setStockMaximo(e.target.value)} />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Stock Mínimo</Form.Label>
                                    <Form.Control type="number" value={stockMinimo} onChange={(e) => setStockMinimo(e.target.value)} />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'nowrap'
                }}>
                    <Button style={{boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)"}} onClick={props.onHide} variant="danger" block>Cancelar</Button>
                    <Button style={{boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)"}} onClick={() => props.handleGuardar(nombre, nombreImg, categoria, unidadMedida, stockMaximo, stockMinimo, precio)} variant="success" block>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

export default FormBebidasView
