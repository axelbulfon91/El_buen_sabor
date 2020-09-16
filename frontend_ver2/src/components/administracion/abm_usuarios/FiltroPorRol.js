import React from 'react'
import { Form } from 'react-bootstrap'

const FiltroPorRol = ({ filtrarPorRol }) => {
    return <Form.Group>
        <Form.Label>Filtrar por: </Form.Label>
        <Form.Control as="select" onChange={(e) => filtrarPorRol(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="CAJERO">Cajero</option>
            <option value="COCINERO">Cocinero</option>
            <option value="CLIENTE">Cliente</option>
        </Form.Control>
    </Form.Group>

}

export default FiltroPorRol
