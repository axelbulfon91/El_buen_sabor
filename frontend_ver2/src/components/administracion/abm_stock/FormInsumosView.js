import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Container, Col, Form } from 'react-bootstrap'
import SeleccionadorImg from '../uso_compartido/SeleccionadorImg'

const FormInsumosView = (props) => {
    const [nombre, setNombre] = useState('');
    const [nombreImg, setRutaImagen] = useState('');
    const [categoria, setCategoria] = useState(props.categorias[0].id);
    const [unidadMedida, setUnidadDeMedida] = useState(props.unidadesDeMedida[0]);
    const [stockMaximo, setStockMaximo] = useState(0);
    const [stockMinimo, setStockMinimo] = useState(0);

    useEffect(() => {
        if (props.insumo) {
            setNombre(props.insumo.Articulo.nombre);
            setRutaImagen(props.insumo.Articulo.nombreImg);
            setCategoria(props.insumo.Articulo.Categorium.id);
            setUnidadDeMedida(props.insumo.Articulo.unidadMedida);
            setStockMaximo(props.insumo.Articulo.stockMaximo);
            setStockMinimo(props.insumo.Articulo.stockMinimo)
        } else {
            setNombre('');
            setRutaImagen('');
            setCategoria(props.categorias[0].id);
            setUnidadDeMedida(props.unidadesDeMedida[0]);
            setStockMaximo(0);
            setStockMinimo(0)
        }
    }, [props.insumo])

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
                    {props.insumo 
                        ? <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Actualizar datos de Inusmo</span></span> 
                        : <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Crear un Nuevo insumo</span></span> }
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
                                    <Form.Control as="select" value={unidadMedida} onChange={(e) => setUnidadDeMedida(e.target.value)}>
                                        {
                                            props.unidadesDeMedida && props.unidadesDeMedida.map((unidad) => {
                                                return <option key={unidad}>{unidad}</option>
                                            })
                                        }
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
                    <Button style={{boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)"}} onClick={() => props.handleGuardar(nombre, nombreImg, categoria, unidadMedida, stockMaximo, stockMinimo)} variant="success" block>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

export default FormInsumosView
