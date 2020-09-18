import React, { useState, useEffect, useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

const AltaUsuarioView = (props) => {
    const { usuarioSeleccionado, handleGuardar } = props;

    const titulo = usuarioSeleccionado ? "Modificar Datos de Usuario" : "Añadir Nuevo Usuario"
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [password, setPassword] = useState("")
    const [rol, setRol] = useState(4)

    const selectRol = useRef(null);
    useEffect(() => {
        if (usuarioSeleccionado) {
            const u = usuarioSeleccionado;
            setNombre(u.nombre)
            setEmail(u.email)
            setTelefono(u.telefono)
            setPassword(u.password)
            setRol(u.rol)



        }
    }, [])

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
                    <Form.Group >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rol:</Form.Label>
                        <Form.Control as="select" value={rol} onChange={(e) => setRol(e.target.value)} ref={selectRol}>
                            <option value={4}>CLIENTE</option>
                            <option value={1}>COCINERO</option>
                            <option value={2}>CAJERO</option>
                            <option value={3}>ADMINISTRADOR</option>

                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap'
            }}>
                <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} onClick={props.onHide} variant="danger" block>Cancelar</Button>
                <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} onClick={() => handleGuardar(nombre, email, password, telefono, parseInt(rol))} variant="success" block>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AltaUsuarioView
