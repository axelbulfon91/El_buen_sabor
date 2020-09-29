import React from 'react'
import AltaUsuarioView from './AltaUsuarioView'
import axiosAutorizado from '../../../utils/axiosAutorizado'
import mensaje from '../../../utils/Toast'




const AltaUsuarioContainer = ({ refrescarUsuarios, mostrarModal, cerrarModal, usuarioSeleccionado }) => {


    const handleGuardar = async (nombre, username, password, telefono, rol, domicilios) => {//TODO: agregar campo direccion
        let url = usuarioSeleccionado ? `http://localhost:4000/api/usuarios/${usuarioSeleccionado.id}` : `http://localhost:4000/api/usuarios/registro`;
        try {
            const axiosAuth = axiosAutorizado();
            await axiosAuth({
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
            if (usuarioSeleccionado) {
                if (domicilios && domicilios.length) { // Guarda en BD todos los domicilios de la pantalla de edicion de datos
                    domicilios.map(async (d) => {
                        var dom = {
                            id_domicilio: d.id,
                            calle: d.calle,
                            numeracion: d.numeracion,
                            detalle_adicional: d.detalle,
                            id_localidad: d.idLocalidad
                        }
                        const respAct = await axiosAutorizado().put('http://localhost:4000/api/usuarios/domicilios/' + usuarioSeleccionado.id, dom)
                        console.log(respAct.data)
                    })
                } else {
                    console.log("Sin domicilios a cargar")
                }
            }
            mensaje("exito", "Guardado con Exito")
            refrescarUsuarios();
            cerrarModal();
        } catch (error) {
            mensaje("error", "No se pudo guardar")
            console.log(url);
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
