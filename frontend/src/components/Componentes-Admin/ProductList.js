import React, { PureComponent } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Button, Table, Image, Popover, Form, Row, FormControl } from 'react-bootstrap';

class ProductList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            deshabilitarBtnCrear: false,
            filtro: '',
            productosFiltrados: [],
            categorias: [],
            categoriaElegida: ''
        }

    }

    componentDidMount() {
        this.cargarProductos();
    }

    eliminarItem = async (id) => {

        await axios.delete('http://localhost:4000/api/productos/' + id);
        this.cargarProductos();
    }

    cargarProductos = async () => {
        const categorias = await axios.get("http://localhost:4000/api/categorias");
        this.setState({
            categorias: categorias.data
        })
        const res = await axios.get('http://localhost:4000/api/productos');
        this.setState({ productos: res.data });
    }

    clasificarPorCategoria = (e) => {

        const cat = e.target.value;
        this.setState({
            categoriaElegida: cat
        })
    }

    buscarPorNombre = async (e) => {
        const aux = e.target.value
        this.setState({
            filtro: aux
        })
    }

    crearNuevo = () => {
        window.location.href = "/admin/crearProducto"
    }

    crearNuevaCategoria = () => {
        window.location.href = "/admin/crearCategoria"
    }

    render() {

        var productosFiltrados = this.state.productos;   

        if (this.state.categoriaElegida !== '') {

            productosFiltrados = this.state.productos.filter((prod) => {
                return (prod.categoria_id.toString() === this.state.categoriaElegida)
            })

            if (this.state.filtro !== '') {
            
                productosFiltrados = productosFiltrados.filter((prod) => {
                    return (prod.nombre.toLowerCase().includes(this.state.filtro.toLowerCase()))
                })                
            }
           
        }else if (this.state.filtro !== '') {
            
            productosFiltrados = this.state.productos.filter((prod) => {
                return (prod.nombre.toLowerCase().includes(this.state.filtro.toLowerCase()))
            })
            
        }

        return (
            <React.Fragment>
                <Row>
                    <div className="col-md-4 ">
                        <Form.Control as="select" placeholder="Seleccione categoria"
                            className="my-2 form-control" name="categoria" value={this.state.categoriaElegida}
                            onChange={this.clasificarPorCategoria}>
                            <option value=''>Ver todas las categorias</option>{
                                this.state.categorias.map(cat => <option key={cat.id} value={cat.id.toString()}>{cat.nombre}</option>)
                            }
                        </Form.Control>
                    </div>
                    <Button onClick={this.crearNuevo} className="btn btn-success ml-auto mr-3 " to="/admin/crearProducto" disabled={this.state.deshabilitarBtnCrear}>
                        Crear nuevo
                    </Button>
                    <Button onClick={this.crearNuevaCategoria} className="btn btn-success ml-auto mr-3 " disabled={this.state.deshabilitarBtnCrear}>
                        Crear nueva categoria
                    </Button>
                </Row>
                <hr />
                <Form inline>
                    Buscar por nombre: <FormControl type="text" className="ml-2" name="filtro" value={this.state.filtro}
                        onChange={this.buscarPorNombre} placeholder="Buscar" autoComplete="off" />
                </Form>
                <Table responsive className="mt-3 text-center">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Categoria</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map(product =>
                            <tr key={product.id}>
                                <td>
                                    <Image src={"http://localhost:4000/imgs/" + product.nombreImg}
                                        width="100"
                                        fluid
                                        alt="..."
                                    />
                                </td>
                                <td>
                                    <h5 className="card-title" >{product.nombre}</h5>
                                </td>
                                <td>
                                    <h5 className="card-title" >$ {(product.precio).toFixed(2)}</h5>
                                </td>
                                <td>
                                    <OverlayTrigger trigger="click" placement="right" key={product.id} rootClose={true}
                                        overlay={
                                            <Popover id={product.id}>
                                                <Popover.Content>
                                                    <div className="card-body">
                                                        {product.detalle}
                                                    </div>
                                                </Popover.Content>
                                            </Popover>
                                        }

                                    >
                                        <Button variant="secondary">Detalle</Button>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    {product.Categorium.nombre}
                                </td>
                                <td>
                                    <Link className="btn btn-primary mr-2" to={"/admin/editarProducto/" + product.id}>
                                        Editar
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => this.eliminarItem(product.id)}>
                                        Eliminar
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



export default ProductList

