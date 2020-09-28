import React, { Fragment } from 'react'
import { Table, Button, OverlayTrigger, Popover } from 'react-bootstrap'






const TablaDomicilios = ({ domicilios, eliminarDom, setShowModalDom }) => {

    return (
        <Fragment>
            <div>
                <label>Domicilios: </label>
                <Table className="text-center lead" striped hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Localidad</th>
                            <th>Calle</th>
                            <th>Numeracion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {domicilios.length > 0 ? (
                            (domicilios.map((d, i) => (
                                <tr key={i}>
                                    <td className="text-left">{d.nombreLocalidad || d.Localidad.nombre}</td>
                                    <td>{d.calle}</td>
                                    <td>{d.numeracion}</td>
                                    <td>
                                        <OverlayTrigger
                                            trigger={"focus"}
                                            key={i}
                                            placement="left"
                                            overlay={
                                                <Popover id={`popover-positioned-${i}`}>
                                                    <Popover.Content>
                                                        {d.detalle_adicional}
                                                    </Popover.Content>
                                                </Popover>
                                            }
                                        >
                                            <Button className="btn btn-info btn-sm">?</Button>
                                        </OverlayTrigger>
                                        <button onClick={() => eliminarDom(d, i)} className="ml-1 btn btn-danger btn-sm">X</button>
                                    </td>
                                </tr>
                            ))
                            )
                        )
                            :
                            <tr className="text-center" ><td colSpan="3" >Sin datos</td></tr>
                        }
                    </tbody>
                    <tfoot>
                        <tr className="text-center" >
                            <td colSpan="4">
                                <button onClick={() => setShowModalDom(true)} className="btn btn-secondary">Cargar Domicilio</button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        </Fragment>
    )
}

export default TablaDomicilios
