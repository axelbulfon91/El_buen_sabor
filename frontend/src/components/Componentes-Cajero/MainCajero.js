import React, { PureComponent } from 'react'
import axios from 'axios';
import { OverlayTrigger, Button, Table,Popover, Form, Row, FormControl } from 'react-bootstrap';
import { format, register } from 'timeago.js';

class MainCajero extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            pedidos: [],
            filtro: '',
            estados: [],
            pedidosFiltrados: [],
            estadoElegido: '',
            nombreBotonEstado: "Pasar a cocina"
        }

    }

    calcularSubtotal = (productos) =>{
        var result = 0;
        productos.map(p => {
            return result += p.Producto.precio * p.cantidad
        })
        return result.toFixed(2)
    }

    componentDidMount() {
        this.cargarProductos();
    }

    cargarProductos = async () => {

        const res = await axios.get('http://localhost:4000/api/pedidos/');
        this.setState({ pedidos: res.data.pedidos });
    }

    clasificarPorEstado = (e) => {

        const estado = e.target.value;
        this.setState({
            estadoElegido: estado
        })
    }

    buscarPorNombre = async (e) => {
        const aux = e.target.value
        this.setState({
            filtro: aux
        })
    }

    cambiarEstado = async (ped) =>{
        const pedActualizado = ped        
        pedActualizado.estado = "En Produccion"
        await axios.put('http://localhost:4000/api/pedidos/' + pedActualizado.id, pedActualizado);
        this.cargarProductos()
    }

    demorar = ()=>{
        alert("Se demorara el pedido 10 min")
    }

    render() {
        var pedidosFiltrados = this.state.pedidos;

        if (this.state.estadoElegido !== '') {

            pedidosFiltrados = this.state.pedidos.filter((ped) => {
                return (ped.estado.toString() === this.state.estadoElegido)
            })

            if (this.state.filtro !== '') {

                pedidosFiltrados = pedidosFiltrados.filter((ped) => {
                    return (ped.Usuario.nombre.toLowerCase().includes(this.state.filtro.toLowerCase()))
                })
            }

        } else if (this.state.filtro !== '') {

            pedidosFiltrados = this.state.pedidos.filter((ped) => {
                return (ped.Usuario.nombre.toLowerCase().includes(this.state.filtro.toLowerCase()))
            })

        }

        return (
            <React.Fragment>
                <Row>
                    <div className="col-md-4 ">
                        <Form.Control as="select" placeholder="Seleccione estado"
                            className="my-2 form-control" name="estado" value={this.state.estadoElegido}
                            onChange={this.clasificarPorEstado}>
                            <option value=''>Ver todos los estados</option>
                                <option value="Creado">Creado</option>
                                <option value="En Produccion">En produccion</option>
                                <option value="Demorado">Demorado</option>
                                <option value="Listo">Listo</option>
                                <option value="En Delivery">En delivery</option>
                                <option value="Finalizado">Finalizado</option>
                            
                        </Form.Control>
                    </div>
                </Row>
                <hr />
                <Form inline>
                    Buscar por nombre: <FormControl type="text" className="ml-2" name="filtro" value={this.state.filtro}
                        onChange={this.buscarPorNombre} placeholder="Buscar" autoComplete="off" />
                </Form>
                <Table responsive className="mt-3 text-center">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Cliente</th>
                            <th>Fecha pedido</th>
                            <th>Detalle</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosFiltrados.map(ped =>
                            <tr key={ped.id}>
                                <td>
                                    {ped.id}
                                </td>
                                <td>
                                    <h5 className="card-title" >{ped.Usuario.nombre} (Cod: {ped.Usuario.id})</h5>
                                </td>
                                <td>
                                    <h5 className="card-title" >{format(new Date(ped.createdAt), 'es')}</h5>
                                </td>
                                <td>
                                    <OverlayTrigger trigger="click" placement="right" key={ped.id} rootClose={true}
                                        overlay={
                                            <Popover id={ped.id}>
                                                <Popover.Content>
                                                    <div className="card-body">
                                                        <ul>
                                                            {ped.Detalle_Venta.map(prod =>
                                                                <li key={prod.Producto.id}>
                                                                    <p>{prod.Producto.nombre} (Cod: {prod.Producto.id}) x {prod.cantidad} <br/>
                                                                        $ {prod.Producto.precio} x {prod.cantidad} = $ {(prod.Producto.precio * prod.cantidad)}</p>
                                                                    <p>Detalle: xxx</p> <hr />
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </Popover.Content>
                                            </Popover>
                                        }

                                    >
                                        <Button variant="secondary">Detalle</Button>
                                    </OverlayTrigger>
                                </td>
                                <td>                                    
                                    <p>$ {this.calcularSubtotal(ped.Detalle_Venta)}</p>                                      
                                </td>
                                <td>
                                    {ped.estado}
                                </td>
                                <td className="text-left">
                                    <button className="btn btn-primary mr-2">
                                        Editar
                                    </button>
                                    <button className="btn btn-danger mr-2">
                                        Cancelar
                                    </button>
                                    <button className="btn btn-success mr-2" onClick={() => this.cambiarEstado(ped)}> 
                                        Cambiar estado
                                    </button>
                                    <button className="btn btn-warning" onClick={() => this.demorar(ped)}> 
                                        Demorar
                                    </button>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </Table>

            </React.Fragment>
        )
    }
}

const localeFunc = (number, index, totalSec) => {
    return [
        ['justo ahora', 'en un rato'],
        ['hace %s segundos', 'en %s segundos'],
        ['hace 1 minuto', 'en 1 minuto'],
        ['hace %s minutos', 'en %s minutos'],
        ['hace 1 hora', 'en 1 hora'],
        ['hace %s horas', 'en %s horas'],
        ['hace 1 día', 'en 1 día'],
        ['hace %s días', 'en %s días'],
        ['hace 1 semana', 'en 1 semana'],
        ['hace %s semanas', 'en %s semanas'],
        ['hace 1 mes', 'en 1 mes'],
        ['hace %s meses', 'en %s meses'],
        ['hace 1 año', 'en 1 año'],
        ['hace %s años', 'en %s años']
    ][index];
};
register('es', localeFunc);


export default MainCajero

