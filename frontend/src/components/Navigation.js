import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import store from '../store';

class Navigation extends PureComponent {

    
    constructor(props) {
        super(props)
        const { location } = props;
        this.state = {
            esAdmin: {
                estado: false,
                url: location.pathname                
            },
            carrito: JSON.parse(window.sessionStorage.getItem('carrito')) || store.getState().carrito
            
        }
        
        
    }
    
    componentDidMount() {        

        if (this.state.esAdmin.url.includes('admin')) {
            this.setState({
                esAdmin: {
                    estado: true
                }
            })
        }
        this.actualizarCantCarrito()
    }

    actualizarCantCarrito(){
        document.getElementById('cantidadCarrito').innerHTML = this.state.carrito.length
    }

    render() {        
        
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    {this.state.esAdmin.estado ?
                        <Link className="navbar-brand" to="/admin">Administracion</Link>
                        :
                        <Link className="navbar-brand" to="/">El Buen Sabor</Link>
                    }
                    <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {this.state.esAdmin.estado ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/gestionarProducts">Gestionar Productos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/editarNegocio">Informacion negocio</Link>
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className='nav-link' to={{
                                            pathname: '/carrito',
                                            state: { carrito: this.state.carrito } }}> Carrito <Badge id="cantidadCarrito" variant="danger" >{ 0 }</Badge>
                                        </Link>
                                    </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                </React.Fragment>                                
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navigation)