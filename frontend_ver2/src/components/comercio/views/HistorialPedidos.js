import React, { useEffect, useState } from 'react'
import { Container, Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import estilos from '../../../assets/css/VistaCarrito.module.css'
import BarraNavegacion from '../uso_compartido/BarraNavegacion'
import { format, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axiosAutorizado from '../../../utils/axiosAutorizado';
import ModalDetalle from './modalDetalleHistorialPedido';
import formEstado from '../../administracion/abm_pedidos/TablaPedidos';

const HistorialPedidos = () => {

    const userData = jwtDecode(sessionStorage.getItem('token'));
    const idUsuario = userData.id
    const [pedidos, setPedidos] = useState([])
    const [totales, setTotales] = useState([])
    const [modalDetalle, setModalDetalle] = useState(false)
    const [detalle, setDetalle] = useState({})

    useEffect(() => {

        const obtenerDatos = async () => {
            const resp = await axiosAutorizado().get("http://localhost:4000/api/pedidos/usuario/" + idUsuario) // ID de usuario 

            if (resp.data.pedidos) {
                setPedidos(resp.data.pedidos)
                console.log(resp.data.pedidos)
                setTotales(resp.data.totales)
            }
        }
        obtenerDatos();

    }, [])
    
    return (
        <>
            <div className={estilos.fondo}>
                <BarraNavegacion></BarraNavegacion>
                <Container className="mt-5">
                    <h3>Historial de Pedidos</h3>
                    <Table responsive className="mt-3">
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Detalle</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-dark">
                            {(pedidos.length !== 0) ?
                                pedidos.map((pedido, i) =>
                                    <tr key={i} className="text-center">
                                        <td>{pedido.id}</td>
                                        <td data-toggle="tooltip" data-placement="right" title={new Date(pedido.createdAt).toLocaleString()}>
                                            {format(new Date(pedido.createdAt), 'es')}
                                        </td>
                                        <td>
                                            <Link to="#" onClick={() => { setDetalle({ ped: pedido, total: totales[i] }); setModalDetalle(true); }} variant="info">Ver detalle</Link>
                                        </td>
                                        <td>$ {parseFloat(totales[i]).toFixed(2)}</td>
                                        <td>
                                            {(pedido.estado === "Finalizado") ?
                                                <Button className="btn btn-warning">Facturado<br />Ver Factura</Button>
                                                :
                                                formEstado.devolverEstado(pedido.estado)
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
            {detalle.ped !== undefined ?
                <ModalDetalle
                    modalDetalle={modalDetalle}
                    setModalDetalle={setModalDetalle}
                    detalle={detalle}>
                </ModalDetalle>
                :
                <span>Cargando...</span>
            }

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

