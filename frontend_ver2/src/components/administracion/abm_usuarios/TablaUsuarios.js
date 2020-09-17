import React, { Fragment, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import ModalBotonEliminar from '../abm_stock/ModalBotonEliminar'


const TablaUsuarios = (props) => {
    const { usuarios, refrescarUsuarios, abrirFormulario } = props;
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState(null);
    const [showModalEliminar, setShowModalEliminar] = useState(false)

    const handleShowModalEliminar = async (id) => {
        setIdUsuarioSeleccionado(id);
        setShowModalEliminar(true);
    };
    const handleEliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/usuarios/${id}`)
        } catch (error) {
            console.log(error);
        }
        refrescarUsuarios();
        handleCloseModalEliminar();
    }
    const handleCloseModalEliminar = () => setShowModalEliminar(false);
    return (
        <Fragment>
            <Table className="text-center lead" striped hover size="sm">
                <thead className="thead-dark">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>email</th>
                    <th>rol</th>
                    <th>Acción</th>

                </thead>
                <tbody>
                    {usuarios && usuarios.map(usuario => {
                        return <tr style={{ cursor: "pointer" }} key={usuario.id} onClick={() => abrirFormulario(usuario)}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rols[0].rol}</td>
                            <td className="text-center"><Button size='lg' variant="outline-danger" onClick={(e) => {
                                handleShowModalEliminar(usuario.id)
                            }}><i className='fa fa-times'></i></Button></td>

                        </tr>
                    })}
                </tbody>
            </Table>
            {/* MODAL ELIMINAR */}
            {
                showModalEliminar && <ModalBotonEliminar
                    id={idUsuarioSeleccionado}
                    handleCloseModalEliminar={handleCloseModalEliminar}
                    showModalEliminar={showModalEliminar}
                    handleEliminar={handleEliminar}
                >
                </ModalBotonEliminar>
            }
        </Fragment>
    )
}

export default TablaUsuarios
