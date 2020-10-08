import React from 'react'
import { Table } from 'react-bootstrap'

export const PedidosPorCliente = ({ meses, clientesJson }) => {
    return (
        <Table className="text-center lead mt-5" striped hover size="sm" >

            <thead className="thead-dark">
                <th colSpan="13">Cantidad de Pedidos realizados por Cliente por Mes</th>
            </thead>
            <thead className="thead-light">
                <th> </th>
                {meses.map((mes) => {
                    return <th> {mes} </th>
                })}
            </thead>
            <tbody>

                {clientesJson.map((cli, i) => {
                    return <tr key={i} >
                        <td>{cli.nombre}</td>
                        {cli.cantidadDePedidos.map(cantXMes => {
                            return <td>{cantXMes}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </Table>
    )
}
