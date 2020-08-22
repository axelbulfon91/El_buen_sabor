import React from 'react'
import { Form } from 'react-bootstrap'

const FiltroPorFecha = ({ filtrarPorId, idPedido }) => {
    return (
        <Form.Group>
            <Form.Label>
                Filtrar por ID:
            </Form.Label>
            <Form.Control type="number" value={idPedido} onChange={(e) => filtrarPorId(e.target.value)}></Form.Control>
        </Form.Group>
    )
}
export default FiltroPorFecha
