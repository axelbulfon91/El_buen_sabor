import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { Table, Image, Button } from 'react-bootstrap';
import store from '../../store';

class Carrito extends PureComponent {
    constructor(props) {

        super(props)

        this.state = {
            carrito: store.getState().carrito,
            total : 0,
            final : 0,
            tipoEntrega : "1"
        }
    }

    componentDidMount() {
        if (JSON.parse(window.sessionStorage.getItem('carrito'))) {

            this.setState({
                carrito: JSON.parse(window.sessionStorage.getItem('carrito'))
            })
        }
        
    }

    quitarDelCarrito = (producto) => {
        store.dispatch({
            type: 'QUITAR_PRODUCTO',
            producto
        })
        this.setState({
            carrito: store.getState().carrito
        })
        document.getElementById('cantidadCarrito').innerHTML = this.state.carrito.length - 1
        window.sessionStorage.removeItem('carrito')
        window.sessionStorage.setItem('carrito', JSON.stringify(store.getState().carrito))

    }

    cambiarTipoEntrega = (e)=>{
        this.setState({
            tipoEntrega : e.target.value
        })       
    }


    render() {
        var carrito = this.state.carrito
        var aux = 0
        carrito.map(producto => {
            return aux += (parseFloat(producto.cantidad) * parseFloat(producto.product.precio))
        })
        this.setState({
            total : aux.toFixed(2)
        })

        if(this.state.tipoEntrega === "2"){
            let aux2 = this.state.total - (this.state.total * 0.1)
            this.setState({
                final : aux2.toFixed(2)
            })
        }else{
            this.setState({
                final : this.state.total
            })
        }
        return (
            <Table responsive className="mt-3 text-center">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(carrito.length !== 0) ?
                        carrito.map((producto, i) =>
                            <tr key={i}>
                                <td>
                                    <Image src={"http://localhost:4000/imgs/" + producto.product.nombreImg}
                                        width="100"
                                        fluid
                                        alt="..."
                                    />
                                </td>
                                <td>
                                    <h5 className="card-title" >{producto.product.nombre}</h5>
                                </td>
                                <td>
                                    <h5 className="card-title" >$ {producto.product.precio.toFixed(2)}</h5>
                                </td>
                                <td>
                                    <h5>{producto.cantidad}</h5>
                                </td>
                                <td>
                                    <h5>$ {(producto.cantidad * producto.product.precio).toFixed(2)}</h5>                                    
                                </td>
                                <td>
                                    <Button onClick={() => this.quitarDelCarrito(producto)} variant="danger" size="sm"> X </Button>
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
                <tfoot>
                    <tr >
                        <td colSpan={4}>
                           
                        </td>

                        <td colSpan={8} className="text-left">
                            <h5 className="ml-3">Total: $ {this.state.total}</h5> 
                        </td>                        
                    </tr>

                    <tr>
                        <td colSpan={4} className="text-left">
                            <h5>Tipo de entrega:  
                                <select name="tipoEntrega" className="ml-2" onChange={this.cambiarTipoEntrega}> 
                                    <option value="1">Delivery</option>                                           
                                    <option value="2">Retiro en local ( -10% )</option>                                    
                                </select> 
                            </h5>
                        </td>
                        <td colSpan={8} className="text-left text-danger ">
                            <h5>Precio final: $ {this.state.final}</h5>
                        </td>                        
                    </tr>

                    <tr>
                        <td colSpan={6} className="text-center mt-5">
                            {carrito.length !== 0 ? <button className="btn btn-lg btn-success">PEDIR</button>
                            : <button disabled className="btn btn-lg btn-success">PEDIR</button>
                            }                            
                        </td>                        
                    </tr>

                </tfoot>
            </Table>

        )
    }
}

export default Carrito