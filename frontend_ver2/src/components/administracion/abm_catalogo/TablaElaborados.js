import React, { Fragment, useState } from 'react'
import { Table, Image, Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import DetalleElaboradoContainer from './DetalleElaboradoContainer'
import ModalBotonEliminar from '../abm_stock/ModalBotonEliminar'

const TablaElaborados = ({ elaborados, refrescar, abrirFormulario }) => {
    const [idElaboradoSeleccionado, setIdElaboradoSeleccionado] = useState('');
    const [elaboradoSeleccionado, setElaboradoSeleccionado] = useState({});
    //Estado Modal de Detalle
    const [showModalDetalleElaborado, setShowModalDetalleElaborado] = useState(false);
    const handleShowModalDetalle = async (elab) => {
        await setIdElaboradoSeleccionado(elab.id)
        let elabSelec = await elaborados.find((el) => {
            return el.id === elab.id
        });
        await setElaboradoSeleccionado(elabSelec);
        setShowModalDetalleElaborado(true);
    }

    //Estado Modal Eliminar
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const handleCloseModalEliminar = () => setShowModalEliminar(false);
    const handleShowModalEliminar = async (id) => {
        await setIdElaboradoSeleccionado(id)
        setShowModalEliminar(true);
    };
    const handleEliminar = async (id) => {
        let url = `http://localhost:4000/api/productos/elaborados/${id}`;
        try {
            const borrada = await axios.delete(url);
            refrescar(oldKey => oldKey + 1);
            console.log(borrada.data);
        } catch (e) {
            console.log(e);
        }
        handleCloseModalEliminar();
    }

    return (
        <Fragment>
            <Table striped size="sm" variant='' hover className='text-center mt-2 lead'>
                <thead className="thead-dark">
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        elaborados.map((elab) => {
                            return <OverlayTrigger
                                key={elab.id}
                                placement="left"
                                overlay={
                                    <Tooltip> Ver Detalle </Tooltip>
                                }
                            >
                                <tr style={{ cursor: "pointer" }} key={elab.id} onClick={() => handleShowModalDetalle(elab)}>
                                    <td><Image thumbnail style={{maxHeight: "80px"}} src={"http://localhost:4000/imgs/" + elab.nombreImg}
                                        width="100"
                                        fluid
                                        alt="Sin Imagen"
                                    /></td>
                                    <td className="font-weight-bolder">{elab.nombre}</td>
                                    <td><span className="badge" style={{backgroundColor: "DarkGoldenRod", color: "white"}}>{elab.Categorium.nombre}</span></td>
                                    <td> {elab.precio ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(elab.precio) : '-'}</td>
                                    <td>
                                        <Button size='lg' variant="outline-link" onClick={(e) => {
                                            e.stopPropagation();
                                            abrirFormulario(elab)
                                        }}><i className='fa fa-edit text-secondary'></i></Button>
                                        <Button size='lg' variant="outline-link" onClick={(e) => {
                                            e.stopPropagation();
                                            handleShowModalEliminar(elab.id)
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
                    id={idElaboradoSeleccionado}
                    handleCloseModalEliminar={handleCloseModalEliminar}
                    showModalEliminar={showModalEliminar}
                    handleEliminar={handleEliminar}
                >
                </ModalBotonEliminar>
            }
            {/*RENDERIZADO CONDICIONAL DE MODAL DETALLE */}
            {showModalDetalleElaborado && <DetalleElaboradoContainer
                elaborado={elaboradoSeleccionado}
                showModalDetalleElaborado={showModalDetalleElaborado}
                setShowModalDetalleElaborado={setShowModalDetalleElaborado}
            >
            </DetalleElaboradoContainer>}
        </Fragment>
    )
}

export default TablaElaborados
