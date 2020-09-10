import React from 'react'
import { Table } from 'react-bootstrap'

const TablaDetallesPedido = ({ productos }) => {
    const obtenerNombre = (prod) => {
        return prod.bebida ? prod.bebida.Articulo.nombre : prod.elaborado.nombre
    }

    return (
        <Table bordered size="sm" striped variant='light' >
            <thead className="thead-dark">
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((prod, index) => {
                    return <tr key={prod.id}>
                        <td>{obtenerNombre(prod)}</td>
                        <td>{prod.cantidad}</td>
                    </tr>
                })}
            </tbody>
        </Table>
    )
}

export default TablaDetallesPedido
