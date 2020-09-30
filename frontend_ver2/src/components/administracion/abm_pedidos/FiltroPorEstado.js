import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { TIPOS_ESTADO_PEDIDOS } from '../uso_compartido/valoresHardCoded'
import { Form } from 'react-bootstrap';


const FiltroPorEstado = ({ filtrarPorEstado }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        //Revisa si hay token (usuario logueado) y si hay muestra la data del mismo para ver su rol    
        if (sessionStorage.getItem('token')) {
            const userData = jwtDecode(sessionStorage.getItem('token'));
            setUser(userData)
        }
    }, [])

    return (
        <Form.Group>
            <Form.Label>Filtrar por Estado: </Form.Label>
            <Form.Control as="select" onChange={(e) => filtrarPorEstado(e.target.value)}>
                <option value="todos">Todos</option>
                {TIPOS_ESTADO_PEDIDOS.map(estado => {
                    if (user && user.rol === "COCINERO") {
                        if (estado.nombreEstado === "Confirmados" || estado.nombreEstado === "Demorados" || estado.nombreEstado === "Listos") {
                            return <option key={estado.valor} value={estado.valor}>{estado.nombreEstado}</option>
                        }
                    } else {
                        return <option key={estado.valor} value={estado.valor}>{estado.nombreEstado}</option>
                    }

                })}

            </Form.Control>
        </Form.Group>
    )
}

export default FiltroPorEstado
