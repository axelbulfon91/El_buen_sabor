import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const CategoriaAltaView = (props) => {
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState(props.tiposCategorias[0])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span className="font-weight-lighter">Stock / <span className="font-weight-bolder">Crear Nueva Categoría</span></span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Tipo de Categoría</Form.Label>
                        <Form.Control as="select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            {
                                props.tiposCategorias.map((categoria) => {
                                    return <option key={categoria}>{categoria}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap'
            }}>
                <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} onClick={props.onHide} variant="danger" block>Cancelar</Button>
                <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} onClick={() => props.handleGuardar(nombre, tipo)} variant="success" block>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default CategoriaAltaView
