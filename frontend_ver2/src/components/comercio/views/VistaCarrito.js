import React, { useState, useEffect, useContext } from 'react'
import BarraNavegacion from '../uso_compartido/BarraNavegacion'
import estilos from '../../../assets/css/VistaCarrito.module.css'
import { Container, Row, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import datosContext from '../../../datosLocalContext';
import moment from 'moment';
import ModalEleccionDomicilio from './modalEleccionDomicilio';
import mensaje from '../../../utils/Toast';
import Footer from '../uso_compartido/Footer';
import SeccionContacto from '../SeccionContacto';



const VistaCarrito = () => {

    var datos = useContext(datosContext)

    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [costoFinal, setCostoFinal] = useState(0);
    const [tipoRetiro, setTipoRetiro] = useState(0);
    const [tipoPago, setTipoPago] = useState("Debito")
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
        mensaje("error", "Producto Eliminado")
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
                        var tiempoAux = tiempoElab
                        if(tipoRetiro === 0){
                            tiempoAux += 10 // + 10 min de tiempo de delivery
                        }
                        var pedido = {
                            productosPedidos: carritoListo,
                            id_usuario: idUsuario,
                            estado: "pendiente",
                            tipoRetiro: tipoRetiro,
                            tipoPago: tipoPago,
                            domElegido: domElegido,
                            tiempoElaboracion: tiempoAux
                        }


                        const resp = await Axios.post("http://localhost:4000/api/pedidos", pedido)
                        if (resp.data.message === "OK") {
                            mensaje("exito", "Pedido realizado correctamente")
                            window.sessionStorage.removeItem('carrito')
                            setTimeout(() => {
                                window.location.href = "/historialPedidos"
                            }, 1000);


                        } else if (resp.data.message == "No hay stock") {
                            mensaje("error", "Lo sentimos!, nos hemos quedado sin stock suficiente para elaborar tu pedido")
                            //window.sessionStorage.removeItem('carrito')
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
        <>
            <div className={estilos.fondo}>
                <div className={estilos.fondoBarra}></div>
                <BarraNavegacion></BarraNavegacion>
                <Container className="mt-5">
                    <Row>
                        <h3 className="text-dark display-4" >Tu Carrito</h3>
                        <button
                            onClick={() => vaciarCarrito()}
                            className={estilos.btnVaciar}>
                            Vaciar Carrito<i className="ml-2 fa fa-trash-alt" /></button>
                    </Row>
                    <Table className="text-center lead mt-3" variant="" hover size="sm">
                        <thead className="thead-dark">
                            <tr className="text-center lead">
                                <th>#</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={estilos.cuerpoTabla}>
                            {(carrito.length !== 0) ?
                                carrito.map((p, i) =>

                                    <tr key={i} className="text-center">
                                        <td>{i + 1}</td>
                                        <td className="d-flex justify-content-lg-around align-items-center">
                                            <img src={`http://localhost:4000/imgs/${p.producto.Articulo ? p.producto.Articulo.nombreImg : p.producto.nombreImg}`}
                                                style={{ maxHeight: "80px", maxWidth: "100px" }}
                                                alt={p.producto.Articulo ? p.producto.Articulo.nombreImg : p.producto.nombreImg} />
                                            <h5 className="card-title" >{p.producto.Articulo ? p.producto.Articulo.nombre : p.producto.nombre}</h5>
                                        </td>
                                        <td>
                                            <h5 className="card-title" >$ {p.producto.precio}</h5>
                                        </td>
                                        <td>
                                            <Button size="sm" onClick={() => decrementarUnidad(p, i)} variant="dark" style={{ borderRadius: "25px", fontSize: "0.5em" }} ><i className="fa fa-minus"></i></Button>
                                            <span className="mx-2"><b>{p.cant}</b></span>
                                            <Button size="sm" onClick={() => incrementarUnidad(p, i)} variant="dark" style={{ borderRadius: "25px", fontSize: "0.5em" }}><i className="fa fa-plus"></i></Button>
                                        </td>
                                        <td>
                                            <h5>$ {((parseFloat(p.producto.precio)).toFixed(2) * p.cant).toFixed(2)}</h5>
                                        </td>
                                        <td>
                                            <Button onClick={() => eliminar(i)}
                                                variant="outline-danger"
                                                style={{ border: "none" }}
                                                size="sm" ><i className="fa fa-times"></i></Button>
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
                        <tfoot className={estilos.cuerpoTabla}>
                            {(carrito.length !== 0) ?
                                <React.Fragment>
                                    <tr> <br></br></tr>
                                    <tr >
                                        <td colSpan={3} className="text-left">
                                            <h5 className="text-dark">-Tiempo de elaboracion aproximada: {tiempoElab} min
                                            {tipoRetiro === 0 && 
                                                <span> + 10 min por envio</span>
                                            }
                                            </h5>   
                                        </td>
                                        <td colSpan={3} className="text-right pr-2">
                                            <h5 className="text-dark">Total: $ {total}</h5>

                                        </td>
                                    </tr>
                                    <tr style={{ borderTop: "1.5px solid black" }}>
                                        <td colSpan={3} className="text-left">
                                            <h5>-Tipo de retiro:
                                            <select defaultValue={tipoRetiro} className="ml-1" onChange={(e) => cambiarTipoRetiro(e.target.value)}>
                                                    <option value={0}>Delivery</option>
                                                    <option value={1}>Retiro en local ( -10% )</option>
                                                </select>
                                            </h5>
                                        </td>
                                        <td colSpan={3} className="text-right pr-2">
                                            <h4 className="text-danger font-weight-bold">Precio final: $ {parseFloat(costoFinal).toFixed(2)}</h4>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td colSpan="6" style={{ textAlign: "left" }}>
                                            <h5>-Tipo de pago:
                                                <select defaultValue={tipoPago} className="ml-1" onChange={(e) => setTipoPago(e.target.value)}>
                                                    <option value="Debito">Debito</option>
                                                    <option value="Credito">Credito</option>
                                                    {tipoRetiro === 1 &&
                                                        <option value="Efectivo">Efectivo</option>
                                                    }
                                                </select>
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr >
                                        {
                                            domElegido ?
                                                <td colSpan={2} className="text-left mt-5">
                                                    <h5>-Enviar a:  {domElegido.calle + " " + domElegido.numeracion + " en " + domElegido.nombreLocalidad}
                                                        <Button onClick={() => { setDomElegido(null); setShowModal(true) }} variant="warning" size="sm">Cambiar domicilio</Button></h5>
                                                </td>
                                                :
                                                <td colSpan={2}></td>
                                        }

                                    </tr>
                                    <tr >
                                        <td colSpan="6" style={{ textAlign: "right" }}
                                        >
                                            <Button
                                                size="lg"
                                                onClick={() => realizarPedido()}
                                                variant="info"
                                            >Confirmar Pedido <i className="fa fa-check"></i></Button>
                                        </td>
                                    </tr>

                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <tr>
                                        <th colSpan={5} className="text-center">
                                            <Link to="/Catalogo" className="btn btn-info">Ir al catalogo</Link>
                                        </th>
                                    </tr>
                                </React.Fragment>
                            }
                        </tfoot>
                    </Table>
                </Container>
                {
                    carrito.length > 0 &&
                    <ModalEleccionDomicilio
                        showModal={showModal}
                        setShowModal={setShowModal}
                        domElegido={domElegido}
                        setDomElegido={setDomElegido}
                    ></ModalEleccionDomicilio>

                }
            </div>
            <SeccionContacto></SeccionContacto>
            <Footer></Footer>
        </>
    )

}

export default VistaCarrito


