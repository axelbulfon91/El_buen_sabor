import React from 'react'
import axios from 'axios'
import AltaUsuarioView from './AltaUsuarioView'




const AltaUsuarioContainer = ({ refrescarUsuarios, mostrarModal, cerrarModal, usuarioSeleccionado }) => {


    const handleGuardar = async (nombre, username, password, telefono, rol) => {//TODO: agregar campo direccion
        let url = usuarioSeleccionado ? `http://localhost:4000/api/usuarios/${usuarioSeleccionado.id}` : `http://localhost:4000/api/usuarios/registro`;
        try {
            await axios({
                method: usuarioSeleccionado ? "put" : 'post',
                url: url,
                data: {
                    nombre,
                    username,
                    password,
                    telefono,
                    rol
                }
            });
            refrescarUsuarios();
            cerrarModal();
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <React.Fragment>
            <AltaUsuarioView
                show={mostrarModal}
                handleGuardar={handleGuardar}
                onHide={() => cerrarModal()}
                usuarioSeleccionado={usuarioSeleccionado}
            />
        </React.Fragment>
    )
}

export default AltaUsuarioContainer
