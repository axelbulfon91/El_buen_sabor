import React, { useState, useEffect } from 'react'
import { Form, Modal, Button, Col } from 'react-bootstrap'
import axios from 'axios'
import { format } from 'date-fns'





const ExistenciasAltaView = (props) => {
    const [tipoStock, setTipoStock] = useState("insumos");
    const [idArt, setIdArt] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [costoPorUnidad, setCostoPorUnidad] = useState(0);
    const [fechaVencimiento, setFechaVencimiento] = useState(format(new Date(), "yyyy-MM-dd"))
    const [articulos, setArticulos] = useState(null)
    const [unidadMedidaArt, setUnidadMedidaArt] = useState("")


    useEffect(() => {
        const fetchArticulos = async (tipoStock) => {
            let url = `http://localhost:4000/api/productos/${tipoStock}`
            const articulosResult = await axios.get(url);
            setArticulos(articulosResult.data)
        }
        fetchArticulos(tipoStock)

    }, [])
    useEffect(() => {
        if (articulos) {
            setIdArt(articulos[0].Articulo.id)
            let articuloElegido = articulos.find(art => art.Articulo.id == articulos[0].Articulo.id)
            setUnidadMedidaArt(articuloElegido.Articulo.unidadMedida)
        }
    }, [articulos])
    const handleCambioTipoStock = async (tipoStock) => {
        let url = `http://localhost:4000/api/productos/${tipoStock}`
        const articulosResult = await axios.get(url);
        setTipoStock(tipoStock)
        setArticulos(articulosResult.data)

    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Añadir Nueva Existencia</span></span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Artículo de tipo: </Form.Label>
                            <Form.Control as="select" value={tipoStock} onChange={(e) => handleCambioTipoStock(e.target.value)}>
                                {
                                    props.tiposExistencias.map((tipoEx) => {
                                        return <option key={tipoEx}>{tipoEx}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Seleccione Artículo: </Form.Label>
                            <Form.Control as="select" value={idArt} onChange={(e) => {
                                setIdArt(e.target.value);
                                let articuloElegido = articulos.find(art => art.Articulo.id == e.target.value)
                                setUnidadMedidaArt(articuloElegido.Articulo.unidadMedida)
                            }}>
                                {
                                    articulos && articulos.map((art) => {
                                        return <option key={art.Articulo.id} value={art.Articulo.id}>{art.Articulo.nombre}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Cantidad: </Form.Label>
                            <Form.Control type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Unidad: </Form.Label>
                            <Form.Control type="number" value={unidadMedidaArt} placeholder={unidadMedidaArt} disabled />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Costo Unitario: </Form.Label>
                        <Form.Control type="number" value={costoPorUnidad} onChange={(e) => setCostoPorUnidad(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Fecha de Vencimiento</Form.Label>
                        <Form.Control type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
                    </Form.Group>
                    </Form.Row>
                </Form>

            </Modal.Body>
            <Modal.Footer style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap'
            }}>
                <Button style={{boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)"}} onClick={props.onHide} variant="danger" block>Cancelar</Button>
                <Button style={{boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)"}} onClick={() => props.handleGuardar(tipoStock, idArt, cantidad, costoPorUnidad, fechaVencimiento)} variant="success" block>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ExistenciasAltaView
