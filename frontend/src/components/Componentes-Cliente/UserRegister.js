import React, { PureComponent } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class UserRegister extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            email:'',
            password:'',
            nombre:''
        }
    }

    changeInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = async (e)=>{

        e.preventDefault();                
        const data = {
            username: this.state.email,
            nombre: this.state.nombre,
            password: this.state.password
        }
             
        const res = await axios.post('http://localhost:4000/api/usuarios/registro', data);
        console.log(res.data.usuario.id);
        //window.location.href = '/';
    }

    render() {
        return (
            
            <div className="row">            
                <div className="col-md-5 mt-2 mx-auto">
                    <div className="card card-body">
                        <h3>Registro</h3>
                        <Form onSubmit={this.submit}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese un nombre"
                                    className="my-2 form-control" name="nombre" value={this.state.nombre}
                                    onChange={this.changeInputs} required autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">Debe ingresar Email</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese un Email"
                                    className="my-2 form-control" name="email" value={this.state.email}
                                    onChange={this.changeInputs} required
                                />
                                <Form.Control.Feedback type="invalid">Debe ingresar nombre</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese un password"
                                    className="my-2 form-control" name="password" value={this.state.password}
                                    onChange={this.changeInputs} required autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">Debe ingresar password</Form.Control.Feedback>
                            </Form.Group>
                                                                                
                            <div className="d-flex">
                                <Link className="btn btn-secondary" to={"/"}>
                                    Volver
                                </Link>
                                <Button className="btn btn-primary ml-auto"                          
                                    type="submit">                                    
                                    Registrarse
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserRegister