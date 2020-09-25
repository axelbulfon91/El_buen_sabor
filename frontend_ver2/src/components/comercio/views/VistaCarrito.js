import React, { useState, useEffect, useContext } from 'react'
import BarraNavegacion from '../uso_compartido/BarraNavegacion'
import estilos from '../../../assets/css/VistaCarrito.module.css'
import { Container, Row, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import datosContext from '../../../datosLocalContext';
import moment from 'moment';
import ModalEleccionDomicilio from './modalEleccionDomicilio';

function mensaje() {
    toast.error('Producto eliminado', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

}

const VistaCarrito = () => {

    var datos = useContext(datosContext)

    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [costoFinal, setCostoFinal] = useState(0);
    const [tipoRetiro, setTipoRetiro] = useState(0);
    const [cambio, setCambio] = useState(false)
    const [tiempoElab, setTiempoElab] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [domElegido, setDomElegido] = useState(null)
    let carritoAux = sessionStorage.getItem('carrito')
    
    useEffect(() => {

        if (carritoAux) { //si exite carrito en el sessionStorage lo carga
            let aux = []
            aux = JSON.parse(carritoAux)
            setCarrito(aux)
            calcularTotal(aux)
        }

    }, [cambio])

    function decrementarUnidad(prod, i) {

        const nuevoCarrito = carrito.filter((p, idx) => {
            if (p.producto.id === prod.producto.id && i === idx) {
                if (p.cant > 1) {
                    p.cant = p.cant - 1
                }
            }
            return p
        })
        setCarrito(nuevoCarrito)
        window.sessionStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
        calcularTotal()
    }

    function incrementarUnidad(prod, i) {

        const nuevoCarrito = carrito.filter((p, idx) => {
            if (p.producto.id === prod.producto.id && i === idx) {
                p.cant = p.cant + 1
            }
            return p
        })
        setCarrito(nuevoCarrito)
        window.sessionStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
        calcularTotal()

    }

    function calcularTotal(c) {
        var carritoAux = []
        var aux = 0
        var auxTiempo = 0
        c ? carritoAux = c : carritoAux = carrito // Compruebo si la llamada a la funcion viene con parametro (useEffect) o no

        carritoAux.forEach(p => {
            aux += (parseFloat(p.producto.precio) * p.cant)
            if (p.producto.Articulo) {
                auxTiempo += 0
            } else {
                auxTiempo += p.producto.tiempoElaboracion * p.cant
            }

        });
        var valor = aux.toFixed(2)
        setTotal(valor)
        setTiempoElab(auxTiempo)
        if (tipoRetiro === 0) {
            setCostoFinal(valor)
        } else if (tipoRetiro === 1) {
            setCostoFinal((valor - (valor * 0.1).toFixed(2)))
        }
        //setCambio(!cambio)
    }

    function vaciarCarrito() {
        if (window.confirm("Seguro desea vaciar el carrito?")) {
            window.sessionStorage.removeItem('carrito')
            setCarrito([])
        }

    }

    function cambiarTipoRetiro(val) {
        if (parseInt(val) === 0) {
            setCostoFinal(total)
        } else if (parseInt(val) === 1) {
            setCostoFinal((total - (total * 0.1)))
        }
        setTipoRetiro(parseInt(val))
        setCambio(!cambio)
    }

    function eliminar(idx) {

        carrito.splice(idx, 1)
        sessionStorage.setItem('carrito', JSON.stringify(carrito))
        calcularTotal()
        mensaje()
    }

    function dentroDeHorario() {
        var diaActual = new Date(Date.now())
        const diaAbierto = datos && datos.horarios.find((d) => {
            if (d.dia === diaActual.getDay()) { // d.dia devuelve el numero de dia pj 0-Domingo, 1-Lunes, etc  
                return d.dia
            }
        })
        if (diaAbierto) {
            var horarioApertura = diaActual.getDate() + " " + diaAbierto.horarioApertura
            var horarioCierre = diaActual.getDate() + " " + diaAbierto.horarioCierre
            console.log(moment(horarioApertura, "DD HH:mm")._i)
            const abre = moment(horarioApertura, "DD HH:mm")._i
            const act = moment(diaActual).format("DD HH:mm")
            var cierre = null
            diaAbierto.horarioApertura > diaAbierto.horarioCierre
                ? cierre = moment(horarioCierre, "DD HH:mm").add(1, "day").format("DD HH:mm")// Si el horario de cierre es despues de las 00, incrementa un dia
                : cierre = moment(horarioCierre, "DD HH:mm")._i
            console.log("Abre: " + abre + " -  Actual: " + act + " - Cierra: " + cierre)
            if (moment(act, "DD HH:mm").isBetween(moment(abre, "DD HH:mm"), moment(cierre, "DD HH:mm"))) {
                console.log("Permitido")
                return true
            } else {
                alert("Los horarios de atencion son de " + diaAbierto.horarioApertura + " a " + diaAbierto.horarioCierre)
                console.log("Fuera de horario")
                return false
            }

        } else {
            alert("Hoy no abrimos, sepa disculpar")
            return false
        }

    }

    async function realizarPedido() {
        if (sessionStorage.getItem('token')) {
            if (tipoRetiro === 0) {
                if (!domElegido) {
                    setShowModal(true)
                }
            }
            if (domElegido || tipoRetiro === 1) {
                const confirmar = window.confirm("Realizar pedido?")
                if (confirmar) {
                    if (dentroDeHorario()) {
                        const userData = jwtDecode(sessionStorage.getItem('token'));
                        const idUsuario = userData.id
                        var carritoListo = carrito.map(c => {
                            if (c.producto.Articulo) {
                                return { "idBebida": c.producto.Articulo.id, "cantidad": c.cant }
                            } else {
                                return { "idElaborado": c.producto.id, "cantidad": c.cant }
                            }
                        })
                        var pedido = {
                            productosPedidos: carritoListo,
                            id_usuario: idUsuario,
                            estado: "pendiente",
                            tipoRetiro: tipoRetiro,
                            domElegido: domElegido,
                            tiempoElaboracion: tiempoElab
                        }


                        const resp = await Axios.post("http://localhost:4000/api/pedidos", pedido)
                        if (resp.data.message === "OK") {
                            alert("Pedido realizado correctamente, volvera al inicio")
                            window.sessionStorage.removeItem('carrito')
                            //window.location.href = "/"

                        } else if (resp.data.message == "No hay stock") {
                            alert("No hay stock suficiente para generar el pedidos")
                            //window.sessionStorage.removeItem('carrito')
                            window.location.href = "/Catalogo"
                        } else {
                            alert(resp.data.message)
                        }
                    } else {
                        //window.location.href = "/"
                    }
                }

            }


        } else {
            alert('Debe estar logueado para poder realizar un pedido, redirigiendo a la pantalla de login')
            window.location.href = "/login"
        }


    }


    return (
        <div className={estilos.fondo}>
            <BarraNavegacion></BarraNavegacion>

            <Container className="mt-5">
                <Row>
                    <h3 className="text-light">Tu Carrito</h3>
                    <Button onClick={() => vaciarCarrito()} className="ml-auto btn-warning">Vaciar Carrito<i className="fa fa-times" /></Button>
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
                                            <img src={`http://localhost:4000/imgs/${p.producto.Articulo ? p.producto.Articulo.nombreImg : p.producto.nombreImg}`}
                                                width="100"
                                                alt={p.producto.Articulo ? p.producto.Articulo.nombreImg : p.producto.nombreImg} />
                                            <h5 className="card-title" >{p.producto.Articulo ? p.producto.Articulo.nombre : p.producto.nombre}</h5>
                                        </Row>
                                    </td>
                                    <td>
                                        <h5 className="card-title" >$ {p.producto.precio}</h5>
                                    </td>
                                    <td>
                                        <Button onClick={() => decrementarUnidad(p, i)} className="btn btn-info">-</Button>
                                        <span className="mx-3"><b>{p.cant}</b></span>
                                        <Button onClick={() => incrementarUnidad(p, i)} className="btn btn-info">+</Button>
                                    </td>
                                    <td>
                                        <h5>$ {((parseFloat(p.producto.precio)).toFixed(2) * p.cant).toFixed(2)}</h5>
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
                                    <td colSpan={2} className="text-left">
                                        <h4 className="text-dark">Tiempo de elaboracion aproximada: {tiempoElab} min</h4>
                                    </td>
                                    <td colSpan={3} className="text-right">
                                        <h4 className="text-light">Total: $ {total}</h4>

                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-left">
                                        <h5>Tipo de retiro:
                                            <select defaultValue={tipoRetiro} className="ml-1" onChange={(e) => cambiarTipoRetiro(e.target.value)}>
                                                <option value={0}>Delivery</option>
                                                <option value={1}>Retiro en local ( -10% )</option>
                                            </select>
                                        </h5>
                                    </td>
                                    <td colSpan={3} className="text-right">
                                        <h4 className="text-danger">Precio final: $ {parseFloat(costoFinal).toFixed(2)}</h4>
                                    </td>
                                </tr>
                                <tr>
                                    {
                                        domElegido ?
                                            <td colSpan={2} className="text-left mt-5">
                                                <h5>Enviar a {domElegido.calle + " " + domElegido.numeracion + " en " + domElegido.nombreLocalidad}
                                                    <button onClick={() => { setDomElegido(null); setShowModal(true) }} className="ml-2 btn btn-sm btn-warning">Cambiar domicilio</button></h5>
                                            </td>
                                            :
                                            <td colSpan={2}></td>
                                    }

                                    <td colSpan={3} className="text-right mt-5">
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
            {carrito.length > 0 &&
                <ModalEleccionDomicilio
                    showModal={showModal}
                    setShowModal={setShowModal}
                    domElegido={domElegido}
                    setDomElegido={setDomElegido}
                ></ModalEleccionDomicilio>
            
            }

        </div>
    )

}

export default VistaCarrito


