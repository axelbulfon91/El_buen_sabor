import React from 'react'
import {Form} from 'react-bootstrap'

 const FiltroPorFecha = ({filtrarPorFecha, fecha}) => {
    return (
        <Form.Group>
            <Form.Label>
                Filtrar por Fecha: 
            </Form.Label>
            <Form.Control type="date" value={fecha} onChange={(e) => filtrarPorFecha(e.target.value)}></Form.Control>
        </Form.Group>
    )
}
export default FiltroPorFecha
