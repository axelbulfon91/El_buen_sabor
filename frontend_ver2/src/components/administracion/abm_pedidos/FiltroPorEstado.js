import React from 'react'
import { TIPOS_ESTADO_PEDIDOS } from '../uso_compartido/valoresHardCoded'
import {Form} from 'react-bootstrap';


const FiltroPorEstado = ({ filtrarPorEstado }) => {
    return (
        <Form.Group>
            <Form.Label>Filtrar por Estado: </Form.Label>
            <Form.Control as="select" onChange={(e) => filtrarPorEstado(e.target.value)}>
                        <option value="todos">Todos</option>
                {TIPOS_ESTADO_PEDIDOS.map(estado => {
                    return <option key={estado.valor} value={estado.valor}>{estado.nombreEstado}</option>
                })}

            </Form.Control>
        </Form.Group>
    )
}

export default FiltroPorEstado
