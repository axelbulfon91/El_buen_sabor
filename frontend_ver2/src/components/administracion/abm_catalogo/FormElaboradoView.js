import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Container, Col, Form } from 'react-bootstrap'
import SeleccionadorImg from '../uso_compartido/SeleccionadorImg'
import TablaArtElegidos from '../uso_compartido/TablaArtElegidos'


const FormElaboradoView = (props) => {
    const [nombre, setNombre] = useState('');
    const [nombreImg, setRutaImagen] = useState('');
    const [categoria, setCategoria] = useState(props.categorias[0].id);
    const [precio, setPrecio] = useState(0)
    const [tiempoElaboracion, setTiempoElaboracion] = useState(0)
    const [detalle, setDetalle] = useState("")
    const [esCatalogo, setEsCatalogo] = useState(false)
    //Estado para el detalle
    const [ingrediente, setIngrediente] = useState(props.ingredientes[0].id);
    const [tipoIngrediente, setTipoIngrediente] = useState("insumos");
    const [ingFiltrados, setIngFiltrados] = useState(props.ingredientes.filter(ing => ing.Articulo.Categorium.tipo === "insumos"))
    const [cantidadIngrediente, setcantidadIngrediente] = useState(0.1);
    const [ingredientesElegidos, setIngredientesElegidos] = useState([]);
    const [elegidos, setElegidos] = useState([]);
    const [cantidadIngredienteElegido, setcantidadIngredienteElegido] = useState([]);
    const [unidadIngrediente, setUnidadIngrediente] = useState(props.ingredientes[0].Articulo.unidadMedida);

    useEffect(() => {
        if (props.elaborado) {//Si es un edit seteo los valores pasados
            setNombre(props.elaborado.nombre);
            setRutaImagen(props.elaborado.nombreImg);
            setCategoria(props.elaborado.Categorium.id);
            setPrecio(props.elaborado.precio);
            setTiempoElaboracion(props.elaborado.tiempoElaboracion);
            setDetalle(props.elaborado.detalle);
            setEsCatalogo(props.elaborado.esCatalogo);

            let ingredientesDelElabProp = [];
            let cantidadDelIngrediente = [];
            let elegidosDelProp = []
            props.elaborado.detalle_elaborados.forEach((detalle) => {
                if (detalle) {
                    props.ingredientes.forEach((ing) => {
                        if (detalle.Articulo.id === ing.Articulo.id) {
                            ingredientesDelElabProp.push(ing)
                            cantidadDelIngrediente.push(detalle.cantidad)
                            elegidosDelProp.push({ id: ing.Articulo.id, cantidad: detalle.cantidad })
                        }
                    })
                }
            })
            setIngredientesElegidos(ingredientesDelElabProp)
            setcantidadIngredienteElegido(cantidadDelIngrediente);
            setElegidos(elegidosDelProp);

        } else {//Sino es un form de nuevo y seteo todo en 0
            setNombre('');
            setRutaImagen('');
            setCategoria(props.categorias[0].id);
            setPrecio(0);
            setTiempoElaboracion(0);
            setDetalle("");
            setEsCatalogo(false);
            setIngredientesElegidos([]);
            setcantidadIngredienteElegido([]);
            setElegidos([])
        }
    }, [props.elaborado])

    const agregarIngrediente = (idArt, cant) => {
        if (cant > 0) {
            let ingrediente = props.ingredientes.find((ing) => { return ing.Articulo.id == idArt });
            setIngredientesElegidos((prevState) => [...prevState, ingrediente]);
            setcantidadIngredienteElegido((prevState) => [...prevState, cant]);
            setElegidos(prevState => ([...prevState, { id: idArt, cantidad: cant }]));
        }
    }

    const eliminarArt = (index) => {
        const nuevoArticulos = ingredientesElegidos.filter((ins, i) => {
            return index !== i;
        })
        const nuevoCantidad = cantidadIngredienteElegido.filter((ins, i) => {
            return index !== i;
        })
        const nuevosElegidos = elegidos.filter((ins, i) => {
            return index !== i;
        })
        setIngredientesElegidos(nuevoArticulos);
        setcantidadIngredienteElegido(nuevoCantidad);
        setElegidos(nuevosElegidos)
    }
    const handleSelectIngrediente = (e) => {
        let artElegido = props.ingredientes.find((ing) => { return ing.Articulo.id == e.target.value });
        setUnidadIngrediente(artElegido.Articulo.unidadMedida)
        setIngrediente(e.target.value)
    }
    const handleTipoIngrediente = (e) => {
        const ingFiltradosPorTipo = props.ingredientes.filter(ing => ing.Articulo.Categorium.tipo === e.target.value)
         setIngFiltrados(ingFiltradosPorTipo)
        setTipoIngrediente(e.target.value)
        setUnidadIngrediente(ingFiltradosPorTipo[0].Articulo.unidadMedida)
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
                    <Modal.Title>
                        {props.elaborado 
                        ? <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Actualizar datos de Plato</span></span> 
                        : <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Crear un Nuevo Plato</span></span> }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} md={4}>
                                <Form.Group >
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Categoria:</Form.Label>
                                    <Form.Control as="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                        {
                                            props.categorias && props.categorias.map((categoria) => {
                                                return <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Check type="checkbox" label="Mostrar en Catálogo " checked={esCatalogo} onChange={(e) => setEsCatalogo(e.target.checked)} />
                                </Form.Group>
                                <SeleccionadorImg setRutaImagen={setRutaImagen} rutaImagen={nombreImg} />
                            </Col>
                            <Col xs={6} md={8} className="border-left">
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Precio ($):</Form.Label>
                                        <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Tiempo de Elaboración (mins):</Form.Label>
                                        <Form.Control type="number" value={tiempoElaboracion} onChange={(e) => setTiempoElaboracion(e.target.value)} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group >
                                    <Form.Label>Descripción: </Form.Label>
                                    <Form.Control as="textarea" rows="3" value={detalle} onChange={(e) => setDetalle(e.target.value)} />
                                </Form.Group>


                                <div id="Ingredientes" className='border' >
                                    <h5 className='p-3'>Ingredientes: </h5>
                                    <Form.Group as={Col}>
                                        {/* //TODO: handle onChange de unidadMediad */}
                                        <Form.Control as="select" value={tipoIngrediente} onChange={(e) => handleTipoIngrediente(e)}>
                                            <option value="insumos">Insumos</option>
                                            <option value="semielaborados">Semielaborados</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Row className='px-3 align-items-center justify-content-between'>

                                        <Form.Group as={Col}>
                                            {/* //TODO: handle onChange de unidadMediad */}
                                            <Form.Control as="select" value={ingrediente} onChange={(e) => handleSelectIngrediente(e)}>
                                                {
                                                    props.ingredientes && ingFiltrados.map((ing) => {
                                                        return <option key={ing.Articulo.id} value={ing.Articulo.id}>{ing.Articulo.nombre}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className="col-3">
                                            <Form.Control placeholder='Cantidad' type="number" min="0.1" step="0.1" value={cantidadIngrediente} onChange={(e) => setcantidadIngrediente(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="col-2">
                                            <Form.Control placeholder='Unidad' type="text" value={unidadIngrediente === "unidad" ? "uni." : "kg"} disabled />
                                        </Form.Group>
                                        <Form.Group className="col-2">
                                            <Button onClick={() => agregarIngrediente(ingrediente, cantidadIngrediente)} variant="outline-info" block><i className='fa fa-plus'></i> </Button>
                                        </Form.Group>
                                    </Form.Row>
                                    <TablaArtElegidos articulos={ingredientesElegidos} cantidad={cantidadIngredienteElegido} eliminar={eliminarArt}></TablaArtElegidos>
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
                    <Button style={{boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)"}} onClick={() => props.handleGuardar(nombre, nombreImg, categoria, precio, tiempoElaboracion, detalle, esCatalogo, elegidos)} variant="success" block>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default FormElaboradoView
