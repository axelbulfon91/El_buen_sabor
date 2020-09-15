import React, { Fragment, useState } from 'react'
import { Table } from 'react-bootstrap'
import DetalleUsuarioContainer from './DetalleUsuarioContainer'


const TablaUsuarios = (props) => {
    const { usuarios, setRefreshToken } = props;
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [showModalDetalleUsuario, setShowModalDetalleUsuario] = useState(false)


    const handleShowModalUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setShowModalDetalleUsuario(true);
    }
    return (
        <Fragment>
            <Table className="text-center lead" striped hover size="sm">
                <thead className="thead-dark">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>email</th>
                    <th>rol</th>

                </thead>
                <tbody>
                    {usuarios && usuarios.map(usuario => {
                        return <tr style={{ cursor: "pointer" }} key={usuario.id} onClick={() => handleShowModalUsuario(usuario)}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rols[0].rol}</td>

                        </tr>
                    })}
                </tbody>
            </Table>
            {/* RENDERIZADO CONDICIONAL DE MODAL DETALLE PEDIDO */}
            {
                showModalDetalleUsuario && <DetalleUsuarioContainer
                    usuario={usuarioSeleccionado}
                    showModal={showModalDetalleUsuario}
                    setRefreshToken={setRefreshToken}
                    closeModal={() => setShowModalDetalleUsuario(false)}
                >
                </DetalleUsuarioContainer>
            }
        </Fragment>
    )
}

export default TablaUsuarios
