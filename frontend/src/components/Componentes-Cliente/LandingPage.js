import React, { PureComponent } from 'react'
import axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap';
import store from '../../store';

class LandingPage extends PureComponent {

    constructor() {
        
        super();
        this.state = {
            productos: [],
            carrito: [],
            cantidad : 1
        }

    }

    unsubscribe = store.subscribe(() => {
        this.setState({
            carrito: store.getState().carrito
        })
    })

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidMount() {
        this.cargarProductos();
    }


    cargarProductos = async () => {
        const res = await axios.get('http://localhost:4000/api/productos');
        this.setState({ productos: res.data });
    }

    cambiarCantidad = (e)=>{
        this.setState({
            cantidad : parseFloat(e.target.value)
        })
    }

    cargarACesta = (product) => {         
          
        var productoElegido = {
            product,
            cantidad: this.state.cantidad
        }
        store.dispatch({
            type: 'AGREGAR_PRODUCTO',
            productoElegido
        })
        this.setState({
            cantidad: 1
        })
        document.getElementById('cantidadCarrito').innerHTML = this.state.carrito.length + 1
        window.sessionStorage.setItem('carrito', JSON.stringify(store.getState().carrito))

        var btn = document.getElementById('btn-' + product.id)
        var sel = document.getElementById('select-' + product.id)
        btn.innerHTML = "Producto Agregado"
        btn.style.background = "#007700"
        btn.disabled = true
        sel.disabled = true
    }

    render() {

        
        return (

            <React.Fragment>

                <div className="row">
                    {this.state.productos.map(product => (
                        <div className="col-md-4" key={product.id}>
                            <div className="card my-3 p-4 bg-light border-secondary ">
                                <img src={"http://localhost:4000/imgs/" + product.nombreImg}
                                    height="180"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title" >{product.nombre}</h5>
                                    <h6 className="card-text">${(product.precio).toFixed(2)}</h6>
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} className="btn btn-secondary btn-sm" variant="button" eventKey={product.id}>
                                                    Ver detalles
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={product.id}>
                                                <Card.Body>
                                                    {product.detalle}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                    <div className="mt-3">                                        
                                        Cantidad: <select name="cantidad" id={'select-' + product.id} onChange={this.cambiarCantidad} style={{"width": 50}}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>                                       
                                    </div>
                                    <Button className='btn btn-success mt-3 btn-block' id={'btn-' + product.id}
                                            onClick={() => this.cargarACesta(product)}> Agregar producto
                                    </Button>

                                </div>
                            </div>
                        </div>))
                    }
                </div>
            </React.Fragment>

        )
    }
}


export default LandingPage