import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { Form, Row, Col } from 'react-bootstrap';
import { TIPOS_ESTADO_PEDIDOS } from '../uso_compartido/valoresHardCoded'

export const AccionesPedido = ({ pedido }) => {
    const [nuevoEstado, setNuevoEstado] = useState("")
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
                className="d-flex align-items-center justify-content-center"
                style={{ border: "1px solid black", width: "135px", backgroundColor: "Crimson", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>
                Pasar a Cancelado<i className="fa fa-arrow-right"></i>
            </button>
        )

        if (rol === "ADMINISTRADOR") {
            setselectNuevoEstado(<Form.Group as={Row}>
                <Form.Label column>Actualizar estado a: </Form.Label>
                <Col>
                    <Form.Control as="select" onChange={(e) => filtrarPorEstado(e.target.value)}>
                        <option value="-">-</option>
                        {TIPOS_ESTADO_PEDIDOS.map(estado => {
                            return estado.valor === estadoActual || estado.valor === "cancelado" ? null : <option key={estado.valor} value={estado.valor}>{estado.valor}</option>
                        })}

                    </Form.Control>
                </Col>
            </Form.Group>)
            if (estadoActual === "entregado") {
                setbotonGenerarFactura(
                    <button
                        style={{ border: "1px solid black", width: "135px", backgroundColor: "#E0C700", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "black", display: "inline-block", fontWeight: "bolder" }}>
                        <i className="fa fa-file-upload mr-2"></i>Generar Factura
                    </button>
                )
            }
        } else if (rol === "CAJERO") {
            if (estadoActual === "pendiente") {
                setNuevoEstado("confirmado")
                setBotonNuevoEstado(devolverBotonNuevoEstado("confirmado"))
            } else if (estadoActual === "listo") {
                setNuevoEstado("entregado")
                setBotonNuevoEstado(devolverBotonNuevoEstado("entregado"))
            } else if (estadoActual === "entregado") {
                setBotonCancelarODemorar(null)
                setbotonGenerarFactura(
                    <button
                        style={{ border: "1px solid black", width: "135px", backgroundColor: "#E0C700", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "black", display: "inline-block", fontWeight: "bolder" }}>
                        <i className="fa fa-file-upload mr-2"></i>Generar Factura
                    </button>
                )
            }
        } else if (rol === "COCINERO") {
            if (estadoActual !== "listo") {
                setBotonCancelarODemorar(
                    <button
                        className="d-flex align-items-center justify-content-center"
                        style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkOrchid", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>
                        Pasar a demorado<i className="fa fa-arrow-right"></i>
                    </button>
                )
                if (estadoActual === "confirmado") {
                    setNuevoEstado("listo")
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
                return <button className="d-flex align-items-center justify-content-center" style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkSalmon", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}> Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            case "confirmado":
                return <button className="d-flex align-items-center justify-content-center" style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkTurquoise", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            case "demorado":
                return <button className="d-flex align-items-center justify-content-center" style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkOrchid", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            case "listo":
                return <button className="d-flex align-items-center justify-content-center" style={{ border: "1px solid black", width: "135px", backgroundColor: "DarkSeaGreen", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            case "entregado":
                return <button className="d-flex align-items-center justify-content-center" style={{ border: "1px solid black", width: "135px", backgroundColor: "DeepSkyBlue", borderRadius: "15px", padding: "0.5em 1em", margin: "5px 0px", color: "white", display: "inline-block", fontWeight: "bolder" }}>Pasar a {estado}<i className="fa fa-arrow-right"></i></button>
            default:
                break;
        }
    }

    const filtrarPorEstado = (nuevoEstado) => {
        setNuevoEstado(nuevoEstado)
        setBotonNuevoEstado(devolverBotonNuevoEstado(nuevoEstado))
    }

    return (
        <div className="mx-4">
            {selectNuevoEstado}
            <div className="d-flex justify-content-around mx-5 mb-3">
                {estadoActual === "cancelado" ? null : botonCancelarODemorar}
                {botonNuevoEstado}
                {botonGenerarFactura}
            </div>
        </div>
    )
}
