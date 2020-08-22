import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Container, Col, Form } from 'react-bootstrap'
import SeleccionadorImg from '../uso_compartido/SeleccionadorImg'
import TablaArtElegidos from '../uso_compartido/TablaArtElegidos';

const FormSemielaboradosView = (props) => {
    const [nombre, setNombre] = useState('');
    const [nombreImg, setRutaImagen] = useState('');
    const [categoria, setCategoria] = useState(props.categorias[0].id);
    const [stockMaximo, setStockMaximo] = useState(0);
    const [stockMinimo, setStockMinimo] = useState(0);
    const [costoFabricacion, setCostoFabricacion] = useState(0);
    //Estado para detalle
    const [cantidadInsumo, setcantidadInsumo] = useState(0.1);
    const [insumo, setInsumo] = useState(props.insumos[0].id);
    const [insumosElegidos, setInsumosElegidos] = useState([]);
    const [elegidos, setElegidos] = useState([]);
    const [cantidadInsumoElegido, setcantidadInsumoElegido] = useState([]);
    const [unidadInsumo, setUnidadInsumo] = useState(props.insumos[0].Articulo.unidadMedida);

    useEffect(() => {
        if (props.semielaborado) {//Si es un edit seteo los valores pasados
            setNombre(props.semielaborado.Articulo.nombre);
            setRutaImagen(props.semielaborado.Articulo.nombreImg);
            setCategoria(props.semielaborado.Articulo.Categorium.id);
            setStockMaximo(props.semielaborado.Articulo.stockMaximo);
            setStockMinimo(props.semielaborado.Articulo.stockMinimo);
            setCostoFabricacion(props.semielaborado.costoFabricacion);

            let insumosDelSemiProp = [];
            let cantidadDelInsumo = [];
            let elegidosDelProp = []
            props.semielaborado.detalle_semielaborados.forEach((detalle) => {
                if (detalle.insumo) {
                    props.insumos.forEach((ins) => {
                        if (detalle.insumo.Articulo.id === ins.Articulo.id) {
                            insumosDelSemiProp.push(ins)
                            cantidadDelInsumo.push(detalle.cantidad)
                            elegidosDelProp.push({ id: ins.Articulo.id, cantidad: detalle.cantidad })
                        }
                    })
                }
            })
            setInsumosElegidos(insumosDelSemiProp);
            setcantidadInsumoElegido(cantidadDelInsumo);
            setElegidos(elegidosDelProp);
        } else {//Sino es un form de nuevo y seteo todo en 0
            setNombre('');
            setRutaImagen('');
            setCategoria(props.categorias[0].id);
            setStockMaximo(0);
            setStockMinimo(0);
            setCostoFabricacion(0);
            setInsumosElegidos([]);
            setcantidadInsumoElegido([]);
            setElegidos([])
        }
    }, [props.semielaborado])

    const agregarInsumo = (idInsumo, cant) => {
        if (cant > 0) {
            let insumo = props.insumos.find((ins) => { return ins.id == idInsumo });
            setInsumosElegidos((prevState) => [...prevState, insumo]);
            setcantidadInsumoElegido((prevState) => [...prevState, cant]);
            setElegidos(prevState => ([...prevState, { id: idInsumo, cantidad: cant }]));
        }
    }


    const eliminarArt = (index) => {
        const nuevoArticulos = insumosElegidos.filter((ins, i) => {
            return index !== i;
        })
        const nuevoCantidad = cantidadInsumoElegido.filter((ins, i) => {
            return index !== i;
        })
        const nuevosElegidos = elegidos.filter((ins, i) => {
            return index !== i;
        })
        setInsumosElegidos(nuevoArticulos);
        setcantidadInsumoElegido(nuevoCantidad);
        setElegidos(nuevosElegidos)
    }
    const handleSelectIngrediente = (e) => {
        let insElegido = props.insumos.find((ins) => { return ins.Articulo.id == e.target.value });
        setUnidadInsumo(insElegido.Articulo.unidadMedida)
        setInsumo(e.target.value)
    }
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
                    {props.semielaborado 
                        ? <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Actualizar datos de Semielaborado</span></span> 
                        : <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Crear un Nuevo Semielaborado</span></span> }
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
                                <SeleccionadorImg setRutaImagen={setRutaImagen} rutaImagen={nombreImg} />
                            </Col>
                            <Col xs={6} md={8} className="border-left">
                                <Form.Group >
                                    <Form.Label>Costo de Fabricacion</Form.Label>
                                    <Form.Control type="number" value={costoFabricacion} onChange={(e) => setCostoFabricacion(e.target.value)} />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Stock Máximo</Form.Label>
                                    <Form.Control type="number" value={stockMaximo} onChange={(e) => setStockMaximo(e.target.value)} />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Stock Mínimo</Form.Label>
                                    <Form.Control type="number" value={stockMinimo} onChange={(e) => setStockMinimo(e.target.value)} />
                                </Form.Group>

                                <div id="Ingredientes" className='border' >
                                    <h5 className='p-3'>Ingredientes: </h5>
                                    <Form.Row className='px-3 align-items-center justify-content-between'>
                                        <Form.Group as={Col}>
                                            {/* //TODO: handle onChange de unidadMediad */}
                                            <Form.Control as="select" value={insumo} onChange={(e) => handleSelectIngrediente(e)}>
                                                {
                                                    props.insumos && props.insumos.map((ins) => {
                                                        return <option key={ins.Articulo.id} value={ins.Articulo.id}>{ins.Articulo.nombre}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className="col-3">
                                            <Form.Control placeholder='Cantidad' type="number" min="0.1" step="0.1" value={cantidadInsumo} onChange={(e) => setcantidadInsumo(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="col-2">
                                            <Form.Control placeholder='Unidad' type="text" value={unidadInsumo} disabled />
                                        </Form.Group>
                                        <Form.Group className="col-2">
                                            <Button onClick={() => agregarInsumo(insumo, cantidadInsumo)} variant="outline-info" block><i className='fa fa-plus'></i> </Button>
                                        </Form.Group>
                                    </Form.Row>
                                    <TablaArtElegidos articulos={insumosElegidos} cantidad={cantidadInsumoElegido} eliminar={eliminarArt}></TablaArtElegidos>
                                </div>
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
                    <Button style={{boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)"}} onClick={() => props.handleGuardar(nombre, nombreImg, categoria, costoFabricacion, stockMaximo, stockMinimo, elegidos)} variant="success" block>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default FormSemielaboradosView
