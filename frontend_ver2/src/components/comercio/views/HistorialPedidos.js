import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import estilos from '../../../assets/css/VistaCarrito.module.css'
import BarraNavegacion from '../uso_compartido/BarraNavegacion'
import { format, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axiosAutorizado from '../../../utils/axiosAutorizado';
import ModalDetalle from './modalDetalleHistorialPedido';
import { devolverEstado } from '../../administracion/abm_pedidos/TablaPedidos';
import { TablePagination } from 'react-pagination-table';
import '../../../assets/css/TablaHistorial.css';
import PropTypes from 'prop-types';
import Footer from '../uso_compartido/Footer';
import SeccionContacto from '../SeccionContacto';


const HistorialPedidos = () => {

    const Header = ["ID", "Fecha", "Detalle", "Total", "Estado"];
    const userData = jwtDecode(sessionStorage.getItem('token'));
    const idUsuario = userData.id
    const [pedidos, setPedidos] = useState([])
    const [modalDetalle, setModalDetalle] = useState(false)
    const [detalle, setDetalle] = useState({})

    useEffect(() => {

        const obtenerDatos = async () => {
            const resp = await axiosAutorizado().get("http://localhost:4000/api/pedidos/usuario/" + idUsuario) // ID de usuario 

            if (resp.data.pedidos) {
                setPedidos(resp.data.pedidos)
            }
            const filas = resp.data.pedidos.map((pedido) => {
                const f = {
                    id: pedido.id,
                    fecha: format(new Date(pedido.createdAt), 'es'),
                    detalle: <Link to="#" onClick={() => { setDetalle(pedido); setModalDetalle(true); }} variant="info">Ver detalle</Link>,
                    total: "$ " + (pedido.tipoRetiro === 0 ? obtenerTotal(pedido).toFixed(2) : (obtenerTotal(pedido) - (obtenerTotal(pedido) * 0.1)).toFixed(2)),
                    estado: devolverEstado(pedido.estado)
                }
                return f
            }
            )
            setPedidos(filas)
        }
        obtenerDatos()
    }, [])


    return (
        <>
            <div className={estilos.fondo}>
                <div className={estilos.fondoBarra}></div>
                <BarraNavegacion></BarraNavegacion>
                <Container className="mt-5">
                    <h3 className="display-4">Mis Pedidos</h3>
                    {pedidos.length !== 0 ?
                        <TablePagination
                            className="text-center mt-5 thead-dark tabla-pedidos"
                            headers={Header}
                            partialPageCount={1}
                            data={pedidos}
                            columns="id.fecha.detalle.total.estado"
                            perPageItemCount={5}
                            totalCount={pedidos.length}
                            arrayOption={[[]]}
                            nextPageText=""
                            prePageText=""

                        />
                        :
                        <div className="text-center">
                            <h3 className="mt-5">Sin Datos</h3>
                            <a className="btn btn-success mt-4" href="/">Volver a la pagina principal</a>
                        </div>

                    }
                </Container>

            </div>
            {detalle !== undefined &&
                <ModalDetalle
                    modalDetalle={modalDetalle}
                    setModalDetalle={setModalDetalle}
                    detalle={detalle}>
                </ModalDetalle>
            }
            <SeccionContacto></SeccionContacto>
            <Footer></Footer>
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

export const obtenerTotal = (pedido) => {
    var total = 0
    pedido.Detalle_Pedidos.forEach(p => {
        total += p.precioDetalle

    });
    return total

}

HistorialPedidos.propTypes = {
    Header: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HistorialPedidos
