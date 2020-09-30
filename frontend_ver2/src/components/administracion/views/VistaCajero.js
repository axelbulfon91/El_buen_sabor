import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import FiltroPorEstado from '../abm_pedidos/FiltroPorEstado';
import TablaPedidos from '../abm_pedidos/TablaPedidos';
import FiltroPorFecha from '../uso_compartido/FiltroPorFecha';
import FiltroPorId from '../abm_pedidos/FiltroPorId';
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin';




const VistaCajero = () => {
    const [data, setData] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [pedidosFiltrados, setPedidosFiltrados] = useState([])
    const [refreshToken, setRefreshToken] = useState(0)
    //Filtros
    const [fecha, setFecha] = useState("")
    const [estado, setEstado] = useState("todos")
    const [idPedido, setIdPedido] = useState("")

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const pedidosResult = await axios.get("http://localhost:4000/api/pedidos")
                const result = pedidosResult.data.pedidos;
                const ordenados = result.sort((a, b) => {
                    if (a.id < b.id) {
                        return 1;
                    }
                    if (a.id > b.id) {
                        return -1;
                    }
                    return 0;
                })
                setData(ordenados)

            } catch (error) {
                console.log(error);
            }
        }
        fetchPedidos();
        const intervalo = setInterval(() => {
            fetchPedidos();
        }, 10000);
        return () => clearInterval(intervalo)
    }, [refreshToken])
    useEffect(() => {
        setPedidos(data)
    }, [data])
    useEffect(() => {
        setPedidosFiltrados(pedidos)
        buscar()
    }, [pedidos])

    const buscar = () => {
        let filtradosPorFecha = fecha !== "" ? pedidos.filter(p => (p.createdAt).includes(fecha)) : pedidos;
        let filtradosPorId = idPedido !== "" ? filtradosPorFecha.filter(p => p.id == idPedido) : filtradosPorFecha;
        let filtradosPorEstado = estado !== "todos" ? filtradosPorId.filter(p => p.estado === estado) : filtradosPorId;

        setPedidosFiltrados(filtradosPorEstado)
    }
    const limpiarFiltros = () => {
        setFecha("")
        setIdPedido("")
        setEstado("todos")
        setPedidosFiltrados(pedidos)
    }

    return (
        <>
            <BarraNavegacionAdmin />
            <div id="columna-2" className="m-5">
                <h1 className="display-4 p-3" style={{ borderLeft: "8px solid DarkRed" }}>Administración / <strong>Pedidos</strong></h1>
                <div className='d-flex justify-content-between align-items-end'>
                    <div className='d-flex justify-content-end align-items-center'>
                        <div className="mr-2"><FiltroPorEstado filtrarPorEstado={setEstado} estado={estado}></FiltroPorEstado></div>
                        <div className="mr-2"><FiltroPorFecha filtrarPorFecha={setFecha} fecha={fecha}></FiltroPorFecha></div>
                        <FiltroPorId filtrarPorId={setIdPedido} idPedido={idPedido}></FiltroPorId>
                    </div>
                    <div className='d-flex justify-content-end align-items-end'>
                        <Button style={{ marginBottom: "1rem", boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} variant="secondary" onClick={() => buscar()}><i className='fa fa-search mr-2'></i>Filtrar</Button>
                        <Button style={{ marginBottom: "1rem", marginLeft: "5px", boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} variant="dark" onClick={() => limpiarFiltros()}>Limpiar Filtros</Button>
                    </div>
                </div>
                <div className="scrollable">
                    <TablaPedidos
                        setRefreshToken={setRefreshToken}
                        pedidos={pedidosFiltrados}
                    ></TablaPedidos>
                </div>
            </div>
        </>
    )
}

export default VistaCajero
