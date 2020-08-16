import React, { useState, useEffect, useContext } from "react";
import Axios from 'axios';
import { UserContext } from '../../../UserContext';
import { toast } from 'react-toastify';

// reactstrap components
import { Container, Row, Col } from "reactstrap";


function SectionDetalle() {



    function goBacHandle() {
        window.history.back()
    }

    const id = window.location.pathname.split('Detalle/')[1]
    const [producto, setProducto] = useState({})
    const { carrito, setCarrito } = useContext(UserContext)
    const [cant, setCant] = useState(1)
    var carritoAux = carrito

    useEffect(() => {
        obtenerProducto()
        setCarrito(JSON.parse(window.localStorage.getItem('carrito')) || [])
    }, [])


    async function obtenerProducto() {

        const resp = await Axios.get("http://localhost:4000/api/productos/elaborados/" + id)
        console.log(resp.data)
        resp.data.precio = resp.data.precio.toFixed(2)
        setProducto(resp.data)

    }

    function agregarProducto(){
        const productoAgregado = {
            producto: producto,
            cantidad: cant
        }
        carritoAux.push(productoAgregado)
        setCarrito(carritoAux)        
        window.localStorage.setItem('carrito', JSON.stringify(carrito));
        mensaje();
    }

    const cambiarCantidad = valor => {
        
        setCant(parseInt(valor))
        
    }

    function mensaje() {
        toast.success('Producto agregado al carrito', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    return (
        <>
            <section className="hero-wrap hero-wrap-2" style={{ backgroundImage: "url(" + require("assets/img/images/bg_2.jpg") + ")" }} data-stellar-background-ratio="0.5">
                <Container >
                    <Row className="no-gutters slider-text align-items-end justify-content-center">
                        <div className="col-md-9 ftco-animate text-center mb-4">
                            <h1 className="mb-2 bread text-center">Menú</h1>
                        </div>
                        <div
                            className="moving-clouds"
                            style={{
                                backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }}
                        />
                    </Row>
                </Container>
            </section>
            <section className="ftco-section">
                <Container>
                    <div className="ftco-search">
                        <Row>
                            <Col md="6">
                                <img className="img-thumbnail" src={require("assets/img/images/breakfast-1.jpg")}></img>
                            </Col>
                            <Col md="6">

                                <h1 className="text-muted text-uppercase">{producto.nombre}</h1>

                                <p><b>Ingredientes: </b>{producto.detalle}</p>
                                <h2 className="text-muted"> $ {producto.precio}</h2>
                                <hr />

                                <div className="form-group row">

                                    {/* <h4 class="col-lg-0 col-md-0 col-xs-12">
                                        <hr />
                                        <small>
                                            <i className="fa fa-clock-o mr-2"></i>
                                            En Stock  |
                                            <i className="fa fa-shopping-cart mt-0 mr-2" style={{ margin: +"0px 5px" }}></i>
                                            320 compras |
                                            <i className="fa fa-eye mt-0 mr-2"></i>
                                            Visto por <span class="vistas">100</span> personas
                                        </small>
                                    </h4> */}
                                    Cantidad: <input value={cant} onChange={e => cambiarCantidad(e.target.value)} className="ml-2" type="number" placeholder="1"/>

                                    <button onClick={agregarProducto} className="btn btn-primary btn-block btn-lg mt-4">AÑADIR<i className="fa fa-shopping-cart ml-2"></i></button>
                                    <button onClick={goBacHandle} className="btn btn-secondary btn-block btn-lg text-light mt-4"><i className="fa fa-reply mr-2"></i> Continuar Buscando</button>
                                    
                                </div>

                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default SectionDetalle;