import React, { Fragment, useState } from 'react'
import { Table, Image, Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import ModalBotonEliminar from './ModalBotonEliminar'
import DetalleInsumoContainer from './DetalleInsumoContainer'
import DetalleSemielaboradoContainer from './DetalleSemielaboradoContainer'
import DetalleBebidaContainer from './DetalleBebidaContainer'
import NotificacionToast from '../uso_compartido/NotificacionToast'




const TablaProductos = ({ productos, refrescar, tipoStock, abrirFormulario }) => {
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState({});
    //Toast
    const [showToast, setShowToast] = useState(false);
    const [mensajeToast, setMensajeToast] = useState("")
    //Estado Modal de Detalle
    const [showModalDetalleInsumo, setShowModalDetalleInsumo] = useState(false);
    const [showModalDetalleBebida, setShowModalDetalleBebida] = useState(false);
    const [showModalDetalleSemielaborado, setShowModalDetalleSemielaborado] = useState(false);
    const handleShowModalDetalle = async (prod) => {
        await setIdProductoSeleccionado(prod.Articulo.id)
        let prodSelec = await productos.find((pr) => {
            return pr.Articulo.id === prod.Articulo.id
        });
        await setProductoSeleccionado(prodSelec);
        switch (tipoStock) {
            case 'insumos':
                setShowModalDetalleInsumo(true);
                break;
            case 'semielaborados':
                setShowModalDetalleSemielaborado(true);
                break;
            case 'bebidas':
                setShowModalDetalleBebida(true);
                break;
            default:
                break;
        }
    };
    //Estado Modal Eliminar
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const handleCloseModalEliminar = () => setShowModalEliminar(false);
    const handleShowModalEliminar = async (id) => {
        await setIdProductoSeleccionado(id)
        setShowModalEliminar(true);
    };
    const handleEliminar = async (id) => {
        let url = '';
        switch (tipoStock) {
            case 'insumos':
                url = `http://localhost:4000/api/productos/insumos/${id}`;
                break;
            case 'semielaborados':
                url = `http://localhost:4000/api/productos/semielaborados/${id}`;
                break;
            case 'bebidas':
                url = `http://localhost:4000/api/productos/bebidas/${id}`;
                break;
            default:
                break;
        }
        try {
            const borrada = await axios.delete(url);
            refrescar(oldKey => oldKey + 1);
            console.log(borrada.data);
        } catch (e) {
            console.log(e);
        }
        await handleCloseModalEliminar();
        await setMensajeToast("Eliminado con Éxito")
        setShowToast(true)
    }
    const renderizarColorDisponibilidad = (art) => {
        const maximo = Number(art.stockMaximo);
        const minimo = Number(art.stockMinimo);
        const actual = Number(art.stockActual);
        if (actual < (maximo + minimo) / 5) {
            return <div className="text-white bajoStock"><i className='fa fa-exclamation'></i></div>
        } else if (actual < (maximo + minimo) / 2) {
            return <div className="text-dark medioStock"><i className='fa fa-exclamation'></i></div>
        } else {
            return <div className="text-white altoStock"><i className='fa fa-check'></i></div>
        }
    }
    const devolverCategoria = (categoria) => {
        switch (categoria.tipo) {
            case "insumos":
                return <span className="badge" style={{backgroundColor: "DarkMagenta", color: "white"}}>{categoria.nombre}</span>
            case "semielaborados":
                return <span className="badge" style={{backgroundColor: "DarkOliveGreen", color: "white"}}>{categoria.nombre}</span>
            case "bebidas":
                return <span className="badge" style={{backgroundColor: "DarkSalmon", color: "white"}}> {categoria.nombre}</span>
            default:
                return
        }
    }

    return (
        <Fragment>
            {/* //Toast */}
            {showToast && <NotificacionToast showToast={showToast} setShowToast={setShowToast} mensaje={mensajeToast}/>}
            <Table striped  size="sm" variant='' hover className='text-center mt-2'>
                <thead className="thead-dark">
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock Actual</th>
                        {tipoStock === "bebidas" && <th>Precio</th>}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((prod) => {
                            return <OverlayTrigger
                                key={prod.Articulo.id}
                                placement="left"
                                overlay={
                                    <Tooltip> Ver Detalle </Tooltip>
                                }
                            >
                                <tr style={{ cursor: "pointer" }} key={prod.Articulo.id} onClick={() => handleShowModalDetalle(prod)}>
                                    <td><Image thumbnail style={{ maxHeight: "80px" }} src={"http://localhost:4000/imgs/" + prod.Articulo.nombreImg}
                                        width="100"
                                        fluid
                                        alt="Sin Imagen"
                                    /></td>
                                    <td className="lead">{prod.Articulo.nombre}</td>
                                    <td className="lead"> {devolverCategoria(prod.Articulo.Categorium)}</td>
                                    <td>
                                        <Row>
                                            <Col className="text-center lead">{prod.Articulo.stockActual 
                                            ? (prod.Articulo.unidadMedida === "kg"?(prod.Articulo.stockActual).toFixed(3):prod.Articulo.stockActual) + " " + (prod.Articulo.unidadMedida=== "unidad"?"unidades":prod.Articulo.unidadMedida) 
                                            : '-'}</Col>
                                            <Col className="col-4">{renderizarColorDisponibilidad(prod.Articulo)}</Col>
                                        </Row>
                                    </td>
                                    {tipoStock === "bebidas" && <td className="lead"> {prod.precio ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(prod.precio) : '-'}</td>}
                                    <td>
                                        <Button size='lg' variant="outline-link" onClick={(e) => {
                                            e.stopPropagation();
                                            abrirFormulario(prod)
                                        }}><i className='fa fa-edit text-secondary'></i></Button>
                                        <Button size='lg' variant="outline-link" onClick={(e) => {
                                            e.stopPropagation();
                                            handleShowModalEliminar(prod.Articulo.id)
                                        }}><i className='fa fa-times text-danger'></i></Button>
                                    </td>
                                </tr>
                            </OverlayTrigger>
                        })
                    }
                </tbody>
            </Table>
            {/* RENDERIZADO CONDICIONAL DE MODAL ELIMINAR */}
            {
                showModalEliminar && <ModalBotonEliminar
                    id={idProductoSeleccionado}
                    handleCloseModalEliminar={handleCloseModalEliminar}
                    showModalEliminar={showModalEliminar}
                    handleEliminar={handleEliminar}
                >
                </ModalBotonEliminar>
            }
            {/*RENDERIZADO CONDICIONAL DE MODAL DETALLE */}
            {showModalDetalleInsumo && <DetalleInsumoContainer
                producto={productoSeleccionado}
                showModalDetalleInsumo={showModalDetalleInsumo}
                setShowModalDetalleInsumo={setShowModalDetalleInsumo}
            >
            </DetalleInsumoContainer>}
            {showModalDetalleBebida && <DetalleBebidaContainer
                producto={productoSeleccionado}
                showModalDetalleBebida={showModalDetalleBebida}
                setShowModalDetalleBebida={setShowModalDetalleBebida}
            >
            </DetalleBebidaContainer>}
            {showModalDetalleSemielaborado && <DetalleSemielaboradoContainer
                producto={productoSeleccionado}
                showModalDetalleSemielaborado={showModalDetalleSemielaborado}
                setShowModalDetalleSemielaborado={setShowModalDetalleSemielaborado}
            >
            </DetalleSemielaboradoContainer>}


        </Fragment >
    )
}

export default TablaProductos
