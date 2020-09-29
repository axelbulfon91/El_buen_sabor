import React, { Fragment, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { format } from 'date-fns'
import axios from 'axios'
import ModalBotonEliminar from './ModalBotonEliminar'
import mensaje from '../../../utils/Toast'



const TablaExistencias = ({ existencias, conNombre, conEliminar, refrescarExistencias }) => {

    //Estado Modal Eliminar
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const handleCloseModalEliminar = () => setShowModalEliminar(false);
    const [tipoArticulo, setTipoArticulo] = useState(null)
    const [idExistencia, setIdExistencia] = useState(null)
    const handleShowModalEliminar = async (id, tipo) => {
        setIdExistencia(id);
        setTipoArticulo(tipo)
        setShowModalEliminar(true);
    };

    const handleEliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/productos/existencias/${tipoArticulo}/${id}`)
            mensaje("error", "Eliminado exitosamente")
        } catch (error) {
            mensaje("error", "No se pudo Eliminar")
            console.log(error);
        }
        refrescarExistencias();
        handleCloseModalEliminar();
    }
    return (
        <Fragment>
            <Table bordered size="sm" striped variant='' className={"text-center" + (conEliminar && " lead")}>
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        {conNombre && <th>Artículo</th>}
                        <th>Fecha de Creación</th>
                        <th>Cantidad</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Costo unitario</th>
                        <th>Costo Total</th>
                        {conEliminar && <th>Accion</th>}
                    </tr>
                </thead>
                <tbody>
                    {existencias && existencias.map((ex, index) => {
                        return <tr key={ex.id}>
                            <td>{index + 1}</td>
                            {conNombre && <th>{ex.Articulo.nombre}</th>}
                            <td>{format(new Date(ex.createdAt), 'dd/MM/yyyy HH:mm')}</td>
                            <td>{(ex.Articulo.unidadMedida === "kg" ? (ex.cantidad).toFixed(3) : ex.cantidad) + " " + (ex.Articulo.unidadMedida === "unidad" ? "unidades" : ex.Articulo.unidadMedida)}</td>
                            <td>{format(new Date(ex.fechaVencimiento), 'dd/MM/yyyy')}</td>
                            <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ex.costoPorUnidad) + "/" + ex.Articulo.unidadMedida}</td>
                            <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ex.cantidad * ex.costoPorUnidad)}</td>
                            {conEliminar && <td className="text-center"><Button size='lg' variant="outline-danger" onClick={() => {
                                handleShowModalEliminar(ex.id, ex.Articulo.Categorium.tipo)
                            }}><i className='fa fa-times'></i></Button></td>}

                        </tr>
                    })}
                </tbody>
            </Table>
            {/* MODAL ELIMINAR */}
            {
                showModalEliminar && <ModalBotonEliminar
                    id={idExistencia}
                    handleCloseModalEliminar={handleCloseModalEliminar}
                    showModalEliminar={showModalEliminar}
                    handleEliminar={handleEliminar}
                >
                </ModalBotonEliminar>
            }
        </Fragment>
    )
}

export default TablaExistencias
