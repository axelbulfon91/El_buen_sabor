import React, { useEffect, useState } from 'react'
import { Container, Table, PopoverBody, Button, UncontrolledPopover } from 'reactstrap';
import { format, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axiosAutorizado from '../../utils/axiosAutorizado';

function HistorialPedidos() {

    const userData = jwtDecode(sessionStorage.getItem('token'));
    const idUsuario = userData.id
    const [pedidos, setPedidos] = useState([])
    const [totales, setTotales] = useState([])

    useEffect(() => {
        obtenerDatos()
    }, [])

    
    async function obtenerDatos() {

        const resp = await axiosAutorizado().get("http://localhost:4000/api/pedidos/usuario/" + idUsuario) // ID de usuario 
        const pedidos = resp.data.pedidos
        const totales = resp.data.totales
        if (pedidos !== null) {
            setPedidos(pedidos)
            setTotales(totales)
        }
        console.log(pedidos)
    }

    return (
        <>
            <div className="main">
                <div className="section section-image section-login">
                    <Container className="mt-5">
                        <Table responsive className="mt-5">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Detalle</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody className="text-light">
                                {(pedidos.length !== 0) ?
                                    pedidos.map((pedido, i) =>
                                        <tr key={i} className="text-center">
                                            <td>{pedido.id}</td>
                                            <td>{format(new Date(pedido.createdAt), 'es')}</td>
                                            <td>
                                                <Button id={"detalle" + i} type="button">
                                                    Detalle
                                                </Button>
                                                <UncontrolledPopover trigger="legacy" placement="right" target={"detalle" + i}>
                                                    <PopoverBody>
                                                        <ul>
                                                            {pedido.Detalle_Pedidos.map((prod, i) =>
                                                                <li key={i}>
                                                                    <p>{prod.elaborado.nombre} x {prod.cantidad} <br />
                                                                            $ {prod.precioDetalle} x {prod.cantidad} = $ {(prod.precioDetalle * prod.cantidad)}</p>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </PopoverBody>
                                                    <PopoverBody>
                                                    <b>Tipo de envio: </b>
                                                        {(pedido.tipoRetiro === 0) ?
                                                            <b>Delivery</b>
                                                         :
                                                            <b>Retiro por local</b>  
                                                        }                                                    
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </td>
                                            <td>$ {totales[i]}</td>
                                            <td>{(pedido.estado === "Finalizado") ? 
                                                   <Button className="btn btn-warning">Facturado<br/>Ver Factura</Button>     
                                                :
                                                    pedido.estado   
                                                }
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <React.Fragment>
                                        <tr>
                                            <th colSpan={5}>
                                                <h3 className="text-center mt-5">No hay pedidos en el historial</h3>
                                            </th>
                                        </tr>
                                    </React.Fragment>
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={5} className="text-center">
                                        <Link to="/" className="btn btn-success">Volver al catalogo</Link>
                                    </th>
                                </tr>
                            </tfoot>
                        </Table>
                    </Container>
                </div>
            </div>
        </>
    )
}


const localeFunc = (number, index, totalSec) => {
    return [
        ['justo ahora', 'en un rato'],
        ['hace %s segundos', 'en %s segundos'],
        ['hace 1 minuto', 'en 1 minuto'],
        ['hace %s minutos', 'en %s minutos'],
        ['hace 1 hora', 'en 1 hora'],
        ['hace %s horas', 'en %s horas'],
        ['hace 1 día', 'en 1 día'],
        ['hace %s días', 'en %s días'],
        ['hace 1 semana', 'en 1 semana'],
        ['hace %s semanas', 'en %s semanas'],
        ['hace 1 mes', 'en 1 mes'],
        ['hace %s meses', 'en %s meses'],
        ['hace 1 año', 'en 1 año'],
        ['hace %s años', 'en %s años']
    ][index];
};
register('es', localeFunc);

export default HistorialPedidos
