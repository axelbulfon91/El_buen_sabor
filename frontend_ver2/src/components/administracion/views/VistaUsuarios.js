import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionAdminLateral from '../uso_compartido/NavegacionAdminLateral';
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin';
import axiosAutorizado from '../../../utils/axiosAutorizado';
import TablaUsuarios from '../abm_usuarios/TablaUsuarios';
import FiltroPorNombre from '../abm_stock/FiltroPorNombre';
import FiltroPorRol from '../abm_usuarios/FiltroPorRol';
import AltaUsuarioContainer from '../abm_usuarios/AltaUsuarioContainer';




const VistaUsuarios = () => {
    const [modalAltaUsuario, setModalAltaUsuario] = useState(false)
    const [rolSeleccionado, setRolSeleccionado] = useState("todos")
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([])
    const [refreshToken, setrefreshToken] = useState(0)
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const axiosAuth = axiosAutorizado();
                const usuariosResult = await axiosAuth.get("http://localhost:4000/api/usuarios");
                const result = usuariosResult.data;
                const ordenados = result.sort((a, b) => {
                    if (a.id < b.id) {
                        return 1;
                    }
                    if (a.id > b.id) {
                        return -1;
                    }
                    return 0;
                })
                setUsuarios(ordenados)
                setUsuariosFiltrados(ordenados)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsuarios();
    }, [refreshToken])
    useEffect(() => {
        usuarios && filtrarPorRol(rolSeleccionado)
    }, [usuarios])

    const filtrarNombre = (nombre) => {
        setUsuariosFiltrados(usuarios.filter((user) => {//se filtra la lista de los datos originales y se le asigna a listaFiltrada
            return user.nombre.toLowerCase().includes(nombre.toLowerCase());
        }))
        if (nombre === "") {
            filtrarPorRol(rolSeleccionado);
        }
    }
    const filtrarPorRol = (rol) => {
        const usuariosAux = usuarios.filter(user => {
            return user.rols[0].rol === rol;
        })
        rol === "todos" ? setUsuariosFiltrados(usuarios) : setUsuariosFiltrados(usuariosAux);
        setRolSeleccionado(rol)
    }

    const abrirFormulario = async (usuario) => {
        setUsuarioSeleccionado(usuario);
        setModalAltaUsuario(true);
    }
    const cerrarFormulario = () => {
        setUsuarioSeleccionado(null);
        setModalAltaUsuario(false);
    }

    return (
        <>
            <BarraNavegacionAdmin />
            <GridLayoutAdmin>
                <NavegacionAdminLateral></NavegacionAdminLateral>
                <div id="columna-2" className="m-5">
                    <h1 className="display-4 p-3" style={{ borderLeft: "8px solid DarkRed" }}>Administración / <strong>Usuarios</strong></h1>
                    <div className='d-flex justify-content-between align-items-center'>
                        <FiltroPorRol
                            filtrarPorRol={filtrarPorRol}
                            conOpcionTodas={true}
                        ></FiltroPorRol>
                        <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)", width: "14%", marginBottom: "9px" }} variant="info" onClick={() => abrirFormulario()}>
                            <i className='fa fa-plus'></i> Crear Nuevo</Button>
                    </div>
                    <div>
                        <FiltroPorNombre filtrarLista={filtrarNombre}></FiltroPorNombre>
                    </div>
                    <TablaUsuarios
                        usuarios={usuariosFiltrados}
                        refrescarUsuarios={() => setrefreshToken(prevState => prevState = prevState + 1)}
                        abrirFormulario={abrirFormulario}
                        cerrarModal={() => cerrarFormulario()}
                    />
                </div>
                { //Renderizado Condicional del Modal
                    modalAltaUsuario && <AltaUsuarioContainer
                        refrescarUsuarios={() => setrefreshToken(prevState => prevState = prevState + 1)}
                        mostrarModal={modalAltaUsuario}
                        cerrarModal={() => cerrarFormulario()}
                        usuarioSeleccionado={usuarioSeleccionado}
                    ></AltaUsuarioContainer>
                }
            </GridLayoutAdmin>
        </>
    )
}

export default VistaUsuarios
