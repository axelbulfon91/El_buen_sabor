import React, { useState, useEffect } from 'react'
import { Container, Row, Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import axiosAutorizado from 'utils/axiosAutorizado';
import jwtDecode from 'jwt-decode';

function Carrito() {

    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [costoFinal, setCostoFinal] = useState(0);
    const [tipoRetiro, setTipoRetiro] = useState("0"); // 0 Delivery, 1 Retiro por local
    const [cambio, setCambio] = useState(false)
    const [tiempoElab, setTiempoElab] = useState(0)

    useEffect(() => {

        obtenerCarritoDeLocal()

    }, [cambio])

    function obtenerCarritoDeLocal() {
        var carritoAux = []

        if (window.localStorage.getItem('carrito')) {
            carritoAux = JSON.parse(window.localStorage.getItem('carrito'))
        }

        setCarrito(carritoAux);
        var aux = 0
        var auxTiempo = 0
        carritoAux.forEach(p => {
            aux += (parseFloat(p.producto.precio) * p.cantidad)
            auxTiempo += p.producto.tiempoElaboracion * p.cantidad
        });
        setTiempoElab(auxTiempo)
        var valor = aux.toFixed(2)
        setTotal(valor)
        if (tipoRetiro === "0") {
            setCostoFinal(valor)
        } else if (tipoRetiro === "1") {
            setCostoFinal((valor - (valor * 0.1)))
        }
        setCambio(true)

    }

    const obtenerDatos = async () => {


        var aux = 0
        var auxTiempo = 0
        const dato = await axiosAutorizado().get("http://localhost:4000/api/pedidos/" + 1)  // Id de pedido solicitado
        var pedido = dato.data
        if (pedido !== null) {
            var productosDeCarrito = pedido.Detalle_Pedidos
            setCarrito(productosDeCarrito)
            productosDeCarrito.forEach(p => {
                aux += (p.precioDetalle.toFixed(2) * p.cantidad)
                auxTiempo += p.producto.tiempoElaboracion * p.cantidad
            });
            setTiempoElab(auxTiempo)
            setTotal(aux.toFixed(2))
            setCostoFinal(aux.toFixed(2))
        }

    }

    function decrementarUnidad(prod, i) {

        const nuevoCarrito = carrito.filter((p, idx) => {
            if (p.producto.id === prod.producto.id && i === idx) {
                if (p.cantidad > 1) {
                    p.cantidad = p.cantidad - 1
                }
            }
            return p
        })
        setCarrito(nuevoCarrito)
        calcularTotal()
    }

    function incrementarUnidad(prod, i) {

        const nuevoCarrito = carrito.filter((p, idx) => {
            if (p.producto.id === prod.producto.id && i === idx) {
                p.cantidad = p.cantidad + 1
            }
            return p
        })
        setCarrito(nuevoCarrito)
        calcularTotal()

    }

    function calcularTotal() {
        var aux = 0
        var auxTiempo = 0
        carrito.forEach(p => {
            aux += (parseFloat(p.producto.precio) * p.cantidad)
            auxTiempo += p.producto.tiempoElaboracion * p.cantidad
        });
        var valor = aux.toFixed(2)
        setTotal(valor)
        setTiempoElab(auxTiempo)
        if (tipoRetiro === "0") {
            setCostoFinal(valor)
        } else if (tipoRetiro === "1") {
            setCostoFinal((valor - (valor * 0.1)))
        }
    }

    function vaciarCarrito() {
        if (window.confirm("Seguro desea vaciar el carrito?")) {
            window.localStorage.removeItem('carrito')
            setCarrito([])
        }


    }

    function cambiarTipoRetiro(val) {

        if (val === "0") {
            setCostoFinal(total)
        } else if (val === "1") {
            setCostoFinal((total - (total * 0.1)).toFixed(2))
        }
        setTipoRetiro(val)

    }

    function eliminar(idx) {

        const nuevoCarrito = carrito.filter((p, i) => {
            if (i !== idx) {
                return p
            }
        })
        window.localStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
        setCambio(!cambio)
    }

    async function realizarPedido() {

        //Falta validar que haya token de usuario para poder hacer pedido sino redirigir a pantalla de login      
        
        if(localStorage.getItem('token')){
            const userData = jwtDecode(localStorage.getItem('token'));
            const idUsuario = userData.id
            var pedido = {
                productosPedidos: carrito,
                id_usuario: idUsuario, 
                estado: "Creado",
                tipoRetiro: tipoRetiro,
                tiempoElaboracion: tiempoElab
            }
            const resp = await Axios.post("http://localhost:4000/api/pedidos", pedido)
            console.log(resp.data)

            if (resp.data.message === "OK") {
                alert("Pedido realizado correctamente, volvera al inicio")
                window.localStorage.removeItem('carrito')
                window.location.href = "/"

            }else if (resp.data.message == "No hay stock"){
                alert("No hay stock suficiente para generar el pedidos")
                window.localStorage.removeItem('carrito')
                window.location.href = "/Catalogo"
            }

        }else{
            alert('Debe estar logueado para poder realizar un pedido, redirigiendo a la pantalla de login')
            window.location.href = "/LoginPage"
        }
        

        

    }

    return (

        <>
            <div className="main">
                <div className="section section-image section-login">
                    <Container className="mt-5">
                        <Row>
                            <h3 className="text-light">Tu Carrito</h3>
                            <Button onClick={() => vaciarCarrito()} className="ml-auto btn-warning">Vaciar Carrito <i className="fa fa-times" /></Button>
                        </Row>
                        <Table responsive className="mt-5">
                            <thead>
                                <tr className="text-center">
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-light">
                                {(carrito.length !== 0) ?
                                    carrito.map((p, i) =>
                                        <tr key={i} className="text-center">
                                            <td>
                                                <Row>
                                                    <img src={"http://localhost:4000/imgs/" + p.producto.nombre}
                                                        width="100"
                                                        alt="..." />
                                                    <h5 className="card-title" >{p.producto.nombre}</h5>
                                                </Row>
                                            </td>
                                            <td>
                                                <h5 className="card-title" >$ {(parseFloat(p.producto.precio)).toFixed(2)}</h5>
                                            </td>
                                            <td>
                                                <Button onClick={() => decrementarUnidad(p, i)} className="btn btn-info">-</Button>
                                                <span className="mx-3"><b>{p.cantidad}</b></span>
                                                <Button onClick={() => incrementarUnidad(p, i)} className="btn btn-info">+</Button>
                                            </td>
                                            <td>
                                                <h5>$ {((parseFloat(p.producto.precio)).toFixed(2) * p.cantidad).toFixed(2)}</h5>
                                            </td>
                                            <td>
                                                <Button onClick={() => eliminar(i)} className="btn btn-danger" size="sm"><i className="fa fa-times"></i></Button>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <React.Fragment>
                                        <tr>
                                            <th colSpan={5}>
                                                <h3 className="text-center mt-3">Sin productos en el carrito</h3>
                                            </th>
                                        </tr>
                                    </React.Fragment>
                                }
                            </tbody>
                            <tfoot>
                                {(carrito.length !== 0) ?
                                    <React.Fragment>
                                        <tr>
                                            <td colSpan={5} className="text-center">
                                                <h4 className="text-light">Total: $ {total}</h4>
                                                <h4 className="text-dark">Tiempo de elaboracion aproximada: {tiempoElab} min</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className="text-left">
                                                <h5>Tipo de retiro:
                                                    <select value={tipoRetiro} className="ml-1" onChange={(e) => cambiarTipoRetiro(e.target.value)}>
                                                        <option value="0">Delivery</option>
                                                        <option value="1">Retiro en local ( -10% )</option>
                                                    </select>
                                                </h5>
                                            </td>
                                            <td className="text-left">
                                                <h4 className="text-danger">Precio final: $ {costoFinal}</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5} className="text-center mt-5">
                                                <button onClick={() => realizarPedido()} className="btn btn-lg btn-success">PEDIR</button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <tr>
                                            <th colSpan={5} className="text-center">
                                                <Link to="/Catalogo" className="btn btn-success">Ir al catalogo</Link>
                                            </th>
                                        </tr>
                                    </React.Fragment>
                                }
                            </tfoot>
                        </Table>
                    </Container>
                </div>
            </div>
        </>

    )
}

export default Carrito
