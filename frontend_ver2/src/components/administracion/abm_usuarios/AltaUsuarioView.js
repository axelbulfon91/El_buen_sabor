import React, { useState, useEffect } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import ComponenteFormDomicilio from '../views/componentes/ComponenteFormDomicilio';
import TablaDomicilios from './TablaDomicilios';
import axiosAutorizado from '../../../utils/axiosAutorizado';
import notificacion from '../../../utils/Toast';


const AltaUsuarioView = (props) => {
    const { usuarioSeleccionado, handleGuardar } = props;

    const idUsuario = usuarioSeleccionado ? usuarioSeleccionado.id : null;
    const titulo = usuarioSeleccionado ? "Modificar Datos de Usuario" : "Añadir Nuevo Usuario"
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [password, setPassword] = useState("")
    const [rol, setRol] = useState(4)

    const [showModalDom, setShowModalDom] = useState(false)
    const [domicilios, setDomicilios] = useState([])

    useEffect(() => {
        if (usuarioSeleccionado) {
            const u = usuarioSeleccionado;
            setNombre(u.nombre)
            setEmail(u.email)
            setTelefono(u.telefono)
            setPassword(u.password)
            setRol(devolverRolValor(u.rols))
            u.Domicilios && setDomicilios(u.Domicilios)
        }
    }, [])
    const devolverRolValor = (rols) => {
        const largo = rols.length;
        const ultimoRol = rols[largo - 1].rol;
        let rolValor;
        switch (ultimoRol) {
            case "COCINERO":
                rolValor = 1
                break;
            case "CAJERO":
                rolValor = 2
                break;
            case "ADMINISTRADOR":
                rolValor = 3
                break;
            case "CLIENTE":
                rolValor = 4
                break;
            default:
                break;
        }
        return rolValor;
    }

    const eliminarDom = async (d, i) => {
        const domAEliminar = domicilios.find((dom) => dom.id === d.id)
        if (domAEliminar.id !== undefined) {
            const aux = {
                id_domicilio: domAEliminar.id
            }
            const conf = window.confirm("Seguro desea eliminar el domicilio?")
            if (conf) {
                const resp = await axiosAutorizado().post('http://localhost:4000/api/usuarios/domicilios/eliminar/' + idUsuario, aux)
                var domiciliosActualizados = domicilios.filter((dom, idx) => {
                    if (idx !== i) return dom
                })
                notificacion("error", "Domicilio Removido")
                setDomicilios(domiciliosActualizados)
            }
        } else {
            var domiciliosActualizados = domicilios.filter((dom, idx) => {
                if (idx !== i) return dom
            })
            setDomicilios(domiciliosActualizados)
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span className="font-weight-lighter">Administración / <span className="font-weight-bolder">{titulo}</span></span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group >
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Telefono:</Form.Label>
                        <Form.Control type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </Form.Group>
                    {!usuarioSeleccionado && <Form.Group >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>}
                    <Form.Group>
                        <Form.Label>Rol:</Form.Label>
                        <Form.Control as="select" value={rol} onChange={(e) => setRol(e.target.value)}>
                            <option value={4}>CLIENTE</option>
                            <option value={1}>COCINERO</option>
                            <option value={2}>CAJERO</option>
                            <option value={3}>ADMINISTRADOR</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                {usuarioSeleccionado && <TablaDomicilios
                    domicilios={domicilios}
                    setDomicilios={setDomicilios}
                    eliminarDom={eliminarDom}
                    setShowModalDom={setShowModalDom}
                />}
            </Modal.Body>
            <Modal.Footer style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap'
            }}>
                <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} onClick={props.onHide} variant="danger" block>Cancelar</Button>
                <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} onClick={() => handleGuardar(nombre, email, password, telefono, parseInt(rol), domicilios)} variant="success" block>Guardar</Button>
            </Modal.Footer>
            {showModalDom && <ComponenteFormDomicilio
                showModalDom={showModalDom}
                setShowModalDom={setShowModalDom}
                domicilio={domicilios}
                setDomicilio={setDomicilios} />}
        </Modal>
    );
}

export default AltaUsuarioView
