import React from 'react'
import { Table, Button } from 'react-bootstrap'

const TablaArtElegidos = ({ articulos, cantidad, eliminar }) => {
    return (
        <Table bordered size="sm" striped variant='light' >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>U/Medida</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {articulos.map((art, index) => {
                    return <tr key={art.Articulo.id}>
                        <td>{index+1}</td>
                        <td>{art.Articulo.nombre}</td>
                        <td>{parseFloat(cantidad[index]).toFixed(3)}</td>
                        <td>{art.Articulo.unidadMedida}</td>
                        <td className='text-center'><Button variant="outline-danger" size="sm" onClick={() => eliminar(index)}>
                            <i className='fa fa-times'></i>
                        </Button></td>
                    </tr>
                })}
            </tbody>
        </Table>
    )
}

export default TablaArtElegidos
