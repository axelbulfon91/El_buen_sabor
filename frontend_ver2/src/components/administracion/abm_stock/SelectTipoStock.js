import React from 'react'
import { Form } from 'react-bootstrap'

const SelectTipoStock = ({ filtrarTipoStock, conOpcionTodas, conElaborados }) => {
    return <Form.Group>
                <Form.Label>Filtrar por: </Form.Label>
                <Form.Control as="select" onChange={(e) => filtrarTipoStock(e.target.value)}>
                    {conOpcionTodas && <option value="todas">Todas</option>}
                    <option value="insumos">Insumos</option>
                    <option value="semielaborados">Semielaborados</option>
                    <option value="bebidas">Bebidas</option>
                    {conElaborados && <option value="elaborados">Elaborados</option>}
                </Form.Control>
            </Form.Group>
  
}

export default SelectTipoStock
