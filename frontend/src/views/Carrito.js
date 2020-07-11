import React from 'react'
import { Container, Row, Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';

async function cargarCarrito(){
    var carrito = []
    const dato = await Axios.get("http://localhost:4000/api/pedidos/" + "1")
    console.log(dato)
    
}


function Carrito() {

    var carrito = cargarCarrito()

    
    return (
        <>
            <div className="main">
                <div className="section section-image section-login">

                    <Container className="mt-5">
                        <Row>
                            <h3 className="text-light">Tu Carrito</h3>
                            <Button className="ml-auto btn-warning">Vaciar Carrito <i className="fa fa-times" /></Button>
                        </Row>

                        <Table responsive className="mt-5">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-light">
                                {(carrito.length !== 0) ?
                                    carrito.map((producto, i) =>
                                        <tr key={i}>
                                            <td>
                                                <img src={"http://localhost:4000/imgs/" + producto.product.nombreImg}
                                                    width="100"
                                                    fluid
                                                    alt="..."
                                                />
                                                <h5 className="card-title" >{producto.product.nombre}</h5>
                                            </td>                                            
                                            <td>
                                                <h5 className="card-title" >$ {producto.product.precio.toFixed(2)}</h5>
                                            </td>
                                            <td>
                                                <h5>{producto.cantidad}</h5>
                                            </td>
                                            <td>
                                                <Button onClick={() => this.quitarDelCarrito(producto)} variant="danger" size="sm"><i className="fa fa-times"></i></Button>
                                            </td>
                                        </tr>

                                    )

                                    :
                                    <React.Fragment>
                                        <tr>
                                            <th colSpan={6}>
                                                <h3 className="text-center mt-3">Sin productos en el carrito</h3>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colSpan={6}>
                                                <Link to="/" className="btn btn-success mt-3">Ir al catalogo</Link>
                                            </th>
                                        </tr>
                                    </React.Fragment>
                                }
                            </tbody>
                        </Table>

                    </Container>

                </div>
            </div>

        </>

    )
}

export default Carrito
