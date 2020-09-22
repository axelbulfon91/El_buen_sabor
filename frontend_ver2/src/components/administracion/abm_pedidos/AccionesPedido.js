import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { TIPOS_ESTADO_PEDIDOS } from '../uso_compartido/valoresHardCoded'
import { toast } from 'react-toastify';
import FacturaPedido from './FacturaPedido';



export const AccionesPedido = ({ pedido, onHide, setRefreshToken }) => {
    const [botonNuevoEstado, setBotonNuevoEstado] = useState(null)
    const [botonGenerarFactura, setbotonGenerarFactura] = useState(null)
    const [botonCancelarODemorar, setBotonCancelarODemorar] = useState(null)
    const [selectNuevoEstado, setselectNuevoEstado] = useState(null)

    const estadoActual = pedido.estado;
    let rol = null;
    if (sessionStorage.getItem('token')) {
        const userData = jwtDecode(sessionStorage.getItem('token'));
        rol = userData.rol
    }

    useEffect(() => {
        setBotonCancelarODemorar(
            <button
                onClick={() => actualizarPedido("cancelado")}
                className="d-flex align-items-center justify-content-center"
                style={{ border: "1px solid black", width: "165px", backgroundColor: "Crimson", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>
                <span>Pasar a Cancelado</span><i className="fa fa-arrow-right"></i>
            </button>
        )

        if (rol === "ADMINISTRADOR") {
            setselectNuevoEstado(<Form.Group as={Row}>
                <Form.Label column>Actualizar estado a: </Form.Label>
                <Col>
                    <Form.Control as="select" onChange={(e) => handleSelectNuevoEstado(e.target.value)}>
                        <option value="-">-</option>
                        {TIPOS_ESTADO_PEDIDOS.map(estado => {
                            return estado.valor === estadoActual || estado.valor === "cancelado" ? null : <option key={estado.valor} value={estado.valor}>{estado.valor}</option>
                        })}
                    </Form.Control>
                </Col>
            </Form.Group>)
            if (estadoActual === "entregado") {
                setbotonGenerarFactura(
                    <FacturaPedido pedido={pedido}>
                   </FacturaPedido>
                )
            }
        } else if (rol === "CAJERO") {
            if (estadoActual === "pendiente") {
                setBotonNuevoEstado(devolverBotonNuevoEstado("confirmado"))
            } else if (estadoActual === "listo") {
                setBotonNuevoEstado(devolverBotonNuevoEstado("entregado"))
            } else if (estadoActual === "entregado") {
                setBotonCancelarODemorar(null)
                setbotonGenerarFactura(
                    <FacturaPedido pedido={pedido}>
                   </FacturaPedido>
                )
            }
        } else if (rol === "COCINERO") {
            if (estadoActual !== "listo") {
                setBotonCancelarODemorar(
                    <button
                        onClick={() => actualizarPedido("demorado")}
                        className="d-flex align-items-center justify-content-center"
                        style={{ border: "1px solid black", width: "165px", backgroundColor: "DarkOrchid", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>
                        Pasar a demorado<i className="fa fa-arrow-right"></i>
                    </button>
                )
                if (estadoActual === "confirmado" || estadoActual === "demorado") {
                    setBotonNuevoEstado(devolverBotonNuevoEstado("listo"))
                }
            } else {
                setBotonCancelarODemorar(null)
            }
        }
    }, [])

    const devolverBotonNuevoEstado = (estado) => {
        switch (estado) {
            case "pendiente":
                return <button onClick={() => actualizarPedido(estado)}
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "1px solid black", width: "165px", backgroundColor: "DarkSalmon", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}> Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            case "confirmado":
                return <button onClick={() => actualizarPedido(estado)}
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "1px solid black", width: "165px", backgroundColor: "DarkTurquoise", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            case "demorado":
                return <button onClick={() => actualizarPedido(estado)}
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "1px solid black", width: "165px", backgroundColor: "DarkOrchid", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            case "listo":
                return <button onClick={() => actualizarPedido(estado)}
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "1px solid black", width: "165px", backgroundColor: "DarkSeaGreen", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            case "entregado":
                return <button onClick={() => actualizarPedido(estado)}
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "1px solid black", width: "165px", backgroundColor: "DeepSkyBlue", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            default:
                break;
        }
    }

    const handleSelectNuevoEstado = async (newState) => {
        setBotonNuevoEstado(devolverBotonNuevoEstado(newState))
    }
    const actualizarPedido = async (newState) => {
        try {
            await axios.put(`http://localhost:4000/api/pedidos/estado/${pedido.id}`, { estado: newState });
            setRefreshToken((token) => token + 1)
            onHide();
            toast.success('Pedido Actualizado', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="mx-4 lead">
            {selectNuevoEstado}
            <div className="d-flex justify-content-around mx-5 mb-3">
                {estadoActual === "cancelado" ? null : botonCancelarODemorar}
                {botonNuevoEstado}
                {botonGenerarFactura}
            </div>
        
        </div>
    )
}
