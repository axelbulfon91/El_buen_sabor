import React, { PureComponent } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class CrearProducto extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            precio: '',
            selectedFile: null,
            editar: false,
            id: '',
            boton: 'Agregar',
            detalle: '',
            valido: false,
            nombreForm: 'Crear nuevo producto',
            categoria: '',
            categorias: []
        };
    }

    async componentDidMount() {

        const categorias = await axios.get("http://localhost:4000/api/categorias");
        

        this.setState({
            categorias: categorias.data
        })

        if (this.props.match.params.id) {
            const res = await axios.get("http://localhost:4000/api/productos/" + this.props.match.params.id);
            
            this.setState({
                nombre: res.data.nombre,
                precio: res.data.precio,
                editar: true,
                boton: 'Actualizar',
                detalle: res.data.detalle,
                id: this.props.match.params.id,
                valido: false,
                nombreForm: 'Actualizar producto',
                categoria: res.data.categoria_id
            });
        }

    }

    changeInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    imageSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    validarCampos = (e) => {
        e.preventDefault()
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            this.submit();
        }


    }

    submit = async () => {

        const datosFormulario = new FormData();
        datosFormulario.append('nombre', this.state.nombre);
        datosFormulario.append('precio', this.state.precio);
        datosFormulario.append('detalle', this.state.detalle);
        datosFormulario.append('categoria', this.state.categoria);
        datosFormulario.append('imagen', this.state.selectedFile);

        if (this.state.editar) {

            await axios.put('http://localhost:4000/api/productos/' + this.state.id, datosFormulario, {
                headers: { 'content-type': 'multipart/form-data' }
            });

        } else {

            await axios.post('http://localhost:4000/api/productos', datosFormulario, {
                headers: { 'content-type': 'multipart/form-data' }
            });
        }

        window.location.href = '/admin/gestionarProducts';


    }

    render() {
        return (


            <div className="row">
                <div className="col-md-5 mt-2 mx-auto">
                    <div className="card card-body">
                        <h3>{this.state.nombreForm}</h3>
                        <Form validated={this.state.valido} onSubmit={this.validarCampos}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese un nombre"
                                    className="my-2 form-control" name="nombre" value={this.state.nombre}
                                    onChange={this.changeInputs} required autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">Debe ingresar nombre</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese un precio"
                                    className="my-2 form-control" name="precio" value={this.state.precio}
                                    onChange={this.changeInputs} required autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">Debe ingresar precio</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Detalle</Form.Label>
                                <Form.Control as="textarea" placeholder="Ingrese un detalle"
                                    className="my-2 form-control" name="detalle" value={this.state.detalle}
                                    onChange={this.changeInputs} required autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">Debe ingresar detalle</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" placeholder="Seleccione categoria"
                                    className="my-2 form-control" name="categoria" value={this.state.categoria}
                                    onChange={this.changeInputs} required>
                                    <option hidden defaultValue>Selecciona una opción</option>
                                    {
                                        this.state.categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option> )
                                    }                                                                       
                                </Form.Control>
                                
                                <Form.Control.Feedback type="invalid">Debe ingresar una categoria</Form.Control.Feedback>
                                
                            </Form.Group>
                            <Form.Group>
                                <Form.File id="formcheck-api-custom" custom>
                                    <Form.File.Input isValid
                                        className="custom-file-input" name="imagen" value={this.state.imagen}
                                        onChange={this.imageSelect}
                                        required
                                    />
                                    <Form.File.Label data-browse="Buscar">
                                        Seleccione una imagen
                                    </Form.File.Label>
                                </Form.File>
                            </Form.Group>
                            <div className="d-flex">
                                <Link className="btn btn-secondary" to={"/admin/gestionarProducts"}>
                                    Volver
                                </Link>
                                <Button className="btn btn-primary ml-auto"                                    
                                    type="submit">
                                    {this.state.boton}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>




        );
    }

}

export default CrearProducto