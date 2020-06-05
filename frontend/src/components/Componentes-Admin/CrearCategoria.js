import React, { PureComponent } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class CrearCategoria extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            nombre: ''
        }
    }

    changeInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

        const data = {
            nombre: this.state.nombre
        }
        await axios.post('http://localhost:4000/api/categorias', data);

        window.location.href = '/admin/gestionarProducts';
        
    }


    render() {
        return (
            
            <div className="row">
                <div className="col-md-5 mt-2 mx-auto">
                    <div className="card card-body">
                        <h3>Crear Categoria</h3>
                        <Form validated={this.state.valido} onSubmit={this.validarCampos}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese un nombre para la categoria"
                                    className="my-2 form-control" name="nombre" value={this.state.nombre}
                                    onChange={this.changeInputs} required autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">Debe ingresar nombre</Form.Control.Feedback>
                            </Form.Group>                            
                            <div className="d-flex">
                                <Link className="btn btn-secondary" to={"/admin/gestionarProducts"}>
                                    Volver
                                </Link>
                                <Button className="btn btn-primary ml-auto"                                    
                                    type="submit">
                                    Agregar
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

        )
    }
}

export default CrearCategoria