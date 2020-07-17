import React, { useState, useEffect } from 'react'
import { Container, Row, Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Carrito() {

    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [costoFinal, setCostoFinal] = useState(0);
    const [tipoRetiro, setTipoRetiro] = useState("0"); // 0 Delivery, 1 Retiro por local
    
    useEffect(() => {
        obtenerDatos()
        calcularTotal()        
    }, [])

    const obtenerDatos = async () => {
        var aux = 0
        const dato = await Axios.get("http://localhost:4000/api/pedidos/" + 1)  // Id de pedido solicitado
        var pedido = dato.data
        if (pedido !== null) {
            var productosDeCarrito = pedido.Detalle_Pedidos
            setCarrito(productosDeCarrito)
            productosDeCarrito.forEach(p => {
                aux += (p.precioDetalle.toFixed(2) * p.cantidad)
            });
            setTotal(aux.toFixed(2))
            setCostoFinal(aux.toFixed(2))
        }

    }

    function decrementarUnidad (prod){

        const nuevoCarrito = carrito.filter(p => {
            if (p.elaborado.id === prod.elaborado.id) {
                if (p.cantidad !== 0) {
                    p.cantidad = p.cantidad - 1
                }
            }
            return p
        })
        setCarrito(nuevoCarrito)
        calcularTotal()
    }

    function incrementarUnidad (prod){

        const nuevoCarrito = carrito.filter(p => {
            if (p.elaborado.id === prod.elaborado.id) {
                p.cantidad = p.cantidad + 1
            }
            return p
        })
        setCarrito(nuevoCarrito)
        calcularTotal()

    }

    function calcularTotal (){
        var aux = 0
        carrito.forEach(p => {
            aux += (p.precioDetalle.toFixed(2) * p.cantidad)
        });
        var totalAux = aux.toFixed(2)
        setTotal(totalAux)    
        if (tipoRetiro === "0") {
            setCostoFinal(totalAux)
        } else if (tipoRetiro === "1") {
            setCostoFinal((totalAux - (totalAux * 0.1)).toFixed(2))
        }  

    }

    function vaciarCarrito (){
        if (window.confirm("Seguro desea vaciar el carrito?")) {
            setCarrito([])
        }

    }

    function cambiarTipoRetiro (val){
        
        if (val === "0") {
            setCostoFinal(total)
        } else if (val === "1") {
            setCostoFinal((total - (total * 0.1)).toFixed(2))
        }               
        setTipoRetiro(val)
    }

    function eliminar(prod) {

        const nuevoCarrito = carrito.filter(p => {
            if (p.elaborado.id !== prod.elaborado.id) {
                return p
            }

        })
        setCarrito(nuevoCarrito)
        calcularTotal()
    }

    async function realizarPedido(){
        var pedido = {
            productosPedidos: carrito,
            id_usuario: 1, // Id del usuario
            estado: "Creado",
            tipoRetiro: tipoRetiro
        }
        console.log(pedido)
        const resp = await Axios.post("http://localhost:4000/api/pedidos", pedido)
        console.log(resp.data)
        if(resp.data.respuesta === "OK"){
            alert("Pedido realizado correctamente, volvera al catalogo")
            window.location.href = "/"
        }else{
            alert("Error al enviar el pedido: " +  resp.data)
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
                                    carrito.map((producto, i) =>
                                    <tr key={i} className="text-center">
                                            <td>
                                                <Row>
                                                    <img src={"http://localhost:4000/imgs/" + producto.elaborado.nombre}
                                                        width="100"
                                                        alt="..." />
                                                    <h5 className="card-title" >{producto.elaborado.nombre}</h5>
                                                </Row>
                                            </td>
                                            <td>
                                                <h5 className="card-title" >$ {producto.precioDetalle.toFixed(2)}</h5>
                                            </td>
                                            <td>
                                                <Button onClick={() => decrementarUnidad(producto)} className="btn btn-info">-</Button>
                                                <span className="mx-3"><b>{producto.cantidad}</b></span>
                                                <Button onClick={() => incrementarUnidad(producto)} className="btn btn-info">+</Button>
                                            </td>
                                            <td>
                                                <h5>$ {(producto.precioDetalle.toFixed(2) * producto.cantidad).toFixed(2)}</h5>
                                            </td>
                                            <td>
                                                <Button onClick={() => eliminar(producto)} className="btn btn-danger" size="sm"><i className="fa fa-times"></i></Button>
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
                                                <h4 className="text-danger" value={costoFinal}>Precio final: $ {costoFinal}</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5} className="text-center mt-5">
                                                <button onClick={() => realizarPedido()}  className="btn btn-lg btn-success">PEDIR</button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <tr>
                                            <th colSpan={5} className="text-center">
                                                <Link to="/" className="btn btn-success">Ir al catalogo</Link>
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
