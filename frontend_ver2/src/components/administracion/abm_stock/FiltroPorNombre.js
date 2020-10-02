import React from 'react'
import { Form } from 'react-bootstrap'

const FiltroPorNombre = ({ filtrarLista }) => {

    return (
        <Form.Group className="mt-2">
            <Form.Control type="text" placeholder="Filtrar por Nombre" onChange={(e) => {
                filtrarLista(e.target.value)
            }} />
        </Form.Group>
    )
}

export default FiltroPorNombre
