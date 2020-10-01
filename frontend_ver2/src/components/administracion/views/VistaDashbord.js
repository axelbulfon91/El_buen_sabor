import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin'
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionAdminLateral from '../uso_compartido/NavegacionAdminLateral';
import estilos from '../../../assets/css/VistaDashboard.module.css';
import PedidosPorEstado from '../dashboard/PedidosPorEstado';
import PedidosPorMes from '../dashboard/PedidosPorMes';


const VistaDashbord = () => {
    const [data, setData] = useState([])
    const [meses] = useState(["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"])
    const [estados] = useState(["pendiente", "confirmado", "demorado", "listo", "entregado", "cancelado"])
    const [pedidosPorMes, setPedidosPorMes] = useState([])
    const [pedidosPorEstado, setPedidosPorEstado] = useState([])

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const pedidosResult = await axios.get("http://localhost:4000/api/pedidos")
                const result = pedidosResult.data.pedidos;
                setData(result)
            } catch (error) {
                console.log(error);
            }
        }

        const intervalo = setInterval(() => {
            fetchPedidos();
        }, 5000);
        fetchPedidos();
        return () => clearInterval(intervalo)
    }, [])
    useEffect(() => {
        obtenerPedidosPorMes(data);
        obtenerPedidosPorEstado(data)
    }, [data])

    const obtenerPedidosPorMes = (pedidos) => {
        let pedPorMesAux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        pedidos.forEach(ped => {
            const fechaCreacion = new Date(ped.createdAt);
            const mesCreacion = fechaCreacion.getMonth();
            pedPorMesAux[mesCreacion] = pedPorMesAux[mesCreacion] + 1;
        })
        setPedidosPorMes(pedPorMesAux)
    }
    const obtenerPedidosPorEstado = (pedidos) => {
        let pedPorEstAux = estados.map(() => 0);
        pedidos.forEach(ped => {
            switch (ped.estado) {
                case "pendiente":
                    pedPorEstAux[0] = pedPorEstAux[0] + 1;
                    break;
                case "confirmado":
                    pedPorEstAux[1] = pedPorEstAux[1] + 1;
                    break;
                case "demorado":
                    pedPorEstAux[2] = pedPorEstAux[2] + 1;
                    break;
                case "listo":
                    pedPorEstAux[3] = pedPorEstAux[3] + 1;
                    break;
                case "entregado":
                    pedPorEstAux[4] = pedPorEstAux[4] + 1;
                    break;
                case "cancelado":
                    pedPorEstAux[5] = pedPorEstAux[5] + 1;
                    break;
                default:
                    break;
            }
        })
        setPedidosPorEstado(pedPorEstAux)
    }


    return (
        <>
            <BarraNavegacionAdmin />
            <GridLayoutAdmin>
                {/* COLUMNA 1 */}
                <NavegacionAdminLateral />
                {/* COLUMNA 2 */}

                <div id="columna-2" className="m-5">
                    <h1 className="display-4 p-3" style={{ borderLeft: "8px solid DarkRed" }}>Administración / <strong>Dashboard</strong></h1>
                    <div className={estilos.contenedorGraficos}>
                        <div className={estilos.pedidosPorMes}>
                            <PedidosPorMes meses={meses} pedidosPorMes={pedidosPorMes} />
                        </div>
                        <div className={estilos.pedidosPorEstado}>
                            <PedidosPorEstado estados={estados} pedidosPorEstado={pedidosPorEstado} />
                        </div>

                    </div>
                </div>
            </GridLayoutAdmin>
        </>

    )
}

export default VistaDashbord
