import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin'
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionAdminLateral from '../uso_compartido/NavegacionAdminLateral';
import estilos from '../../../assets/css/VistaDashboard.module.css';
import PedidosPorEstado from '../dashboard/PedidosPorEstado';
import PedidosPorMes from '../dashboard/PedidosPorMes';
import CategDeProductosPedidos from '../dashboard/CategDeProductosPedidos';
import BotonExportarExcel from '../dashboard/BotonExportarExcel';
import IngresosPorMes from '../dashboard/IngresosPorMes';


const VistaDashbord = () => {
    const [data, setData] = useState([])
    const [categorias, setCategorias] = useState([])
    const [meses] = useState(["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"])
    const [estados] = useState(["pendiente", "confirmado", "demorado", "listo", "entregado", "cancelado"])

    const [pedidosPorMes, setPedidosPorMes] = useState([])
    const [pedidosPorMesJson, setPedidosPorMesJson] = useState([])
    const [ingresosPorMes, setIngresosPorMes] = useState([])
    const [ingresosPorMesJson, setIngresosPorMesJson] = useState([])
    const [pedidosPorEstado, setPedidosPorEstado] = useState([])
    const [pedidosPorEstadoJson, setPedidosPorEstadoJson] = useState([])
    const [prodPorCatPedida, setProdPorCatPedida] = useState([])
    const [prodPorCatPedidaJson, setProdPorCatPedidaJson] = useState([])

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
        const fetchCategorias = async () => {
            try {
                const resultCategorias = await axios.get("http://localhost:4000/api/productos/categorias");
                const categoriasFiltradas = [];
                resultCategorias.data.forEach(cat => {
                    if (cat.tipo === "elaborados") {
                        categoriasFiltradas.push(cat.nombre);
                    }
                })
                resultCategorias.data.forEach(cat => {
                    if (cat.tipo === "bebidas") {
                        categoriasFiltradas.push(cat.nombre);
                    }
                })
                setCategorias(categoriasFiltradas);
            } catch (error) {
                console.log(error);
            }
        }

        const intervalo = setInterval(() => {
            fetchPedidos();
        }, 5000);
        fetchCategorias();
        fetchPedidos();
        return () => clearInterval(intervalo)
    }, [])
    useEffect(() => {
        obtenerPedidosPorMes(data);
        obtenerPedidosPorEstado(data);
        obtenerPedidosPorCategoria(data)
        obtenerIngresosPorMes(data)
    }, [data])

    const obtenerPedidosPorMes = (pedidos) => {
        let pedPorMesAux = meses.map(() => 0)
        pedidos.forEach(ped => {
            const fechaCreacion = new Date(ped.createdAt);
            const mesCreacion = fechaCreacion.getMonth();
            pedPorMesAux[mesCreacion] = pedPorMesAux[mesCreacion] + 1;
        })
        let dataJson = meses.map((valor, i) => {
            return { mes: meses[i], cantidadPedidos: pedPorMesAux[i] }
        })
        setPedidosPorMes(pedPorMesAux)
        setPedidosPorMesJson(dataJson)
    }
    const obtenerIngresosPorMes = (pedidos) => {
        let ingPorMesAux = meses.map(() => 0)
        pedidos.forEach(ped => {
            if (ped.estado === "entregado") {
                const fechaCreacion = new Date(ped.createdAt);
                const mesCreacion = fechaCreacion.getMonth();
                const detallesPedido = ped.Detalle_Pedidos;
                let totalDetalles = 0;
                detallesPedido.forEach((detalle) => {
                    totalDetalles += detalle.precioDetalle
                })
                console.log("TotalDetalles: ", totalDetalles);

                let totalDelPedido = ped.tipoRetiro == 1 ? totalDetalles * 0.9 : totalDetalles;
                console.log("TotalDelPedido " + ped.id + ":", totalDelPedido);

                ingPorMesAux[mesCreacion] = ingPorMesAux[mesCreacion] + totalDelPedido;
            }
        })
        let dataJson = meses.map((valor, i) => {
            return { mes: meses[i], ingresosPorMes: ingPorMesAux[i] }
        })
        setIngresosPorMes(ingPorMesAux)
        setIngresosPorMesJson(dataJson)
    }

    const obtenerPedidosPorCategoria = (pedidos) => {
        let pedPorCatAux = categorias.map(() => 0);//Mapeo un arreglo de elementos 0 por cada categoria
        pedidos.forEach(ped => {//Recorro cada pedido
            ped.Detalle_Pedidos.forEach(detalle => {//Recorro cada detalle del pedido
                let catDeDetalle = ""
                if (detalle.bebida) {
                    catDeDetalle = detalle.bebida.Articulo.Categorium.nombre
                } else {
                    catDeDetalle = detalle.elaborado.Categorium.nombre
                }
                categorias.forEach((cat, i) => {
                    if (cat === catDeDetalle) {
                        pedPorCatAux[i] = pedPorCatAux[i] + 1
                    }
                })
            });
        })
        let dataJson = categorias.map((valor, i) => {
            return { categoria: categorias[i], prodPorCatPedida: pedPorCatAux[i] }
        })
        setProdPorCatPedida(pedPorCatAux)
        setProdPorCatPedidaJson(dataJson)
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
        let dataJson = estados.map((valor, i) => {
            return { estado: estados[i], pedidosPorEstado: pedPorEstAux[i] }
        })
        setPedidosPorEstado(pedPorEstAux)
        setPedidosPorEstadoJson(dataJson)
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
                            <IngresosPorMes meses={meses} ingresosPorMes={ingresosPorMes} />
                        </div>
                        <div className={estilos.pedidosPorMes}>
                            <PedidosPorMes meses={meses} pedidosPorMes={pedidosPorMes} />
                        </div>

                        <div className={estilos.pedidosPorEstado}>
                            <PedidosPorEstado estados={estados} pedidosPorEstado={pedidosPorEstado} />
                        </div>
                        <div className={estilos.catDeProdPedidos}>
                            <CategDeProductosPedidos categorias={categorias} prodPorCatPedida={prodPorCatPedida} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <BotonExportarExcel
                            pedidosPorMesJson={pedidosPorMesJson}
                            prodPorCatPedidaJson={prodPorCatPedidaJson}
                            pedidosPorEstadoJson={pedidosPorEstadoJson}
                            ingresosPorMesJson={ingresosPorMesJson}
                        />
                    </div>
                </div>
            </GridLayoutAdmin>
        </>

    )
}

export default VistaDashbord
