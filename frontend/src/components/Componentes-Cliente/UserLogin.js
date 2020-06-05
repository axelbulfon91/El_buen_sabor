import React, { PureComponent } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import UserProfile from './UserProfile';

class UserLogin extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            id: ''
        }
    }

    changeInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = async (e) => {

        e.preventDefault();
        const res = await axios.post('http://localhost:4000/api/usuarios/login', this.state);
        if (res.data) {            
            this.setState({
                id : res.data.id
            })
        } else {
            console.log("Usuario no logueado");
        }

    }

    render() {

        return (

            <div className="row">
                <div className="col-md-5 mt-2 mx-auto">
                    <div className="card card-body">
                        <UserProfile valorId={this.state.id}></UserProfile>
                        <h3 className="text-center">Login</h3>
                        <Form onSubmit={this.submit} >
                            <Form.Group>
                                <Form.Label className="mt-2">Email</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese un Email"
                                    className="my-2 form-control" name="username" value={this.state.username}
                                    onChange={this.changeInputs} required 
                                />                                
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese un password"
                                    className="my-2 form-control mb-4" name="password" value={this.state.password}
                                    onChange={this.changeInputs} required autoComplete="off"
                                />                                
                            </Form.Group>
                            <div className="text-center">
                                <Button className="btn btn-primary btn-block my-3"
                                    type="submit">
                                    Ingresar
                            </Button>
                                No tienes cuenta?
                                <br></br>
                                <Link to="/registro" className="mt-2 btn btn-secondary btn-sm"> Registrate </Link>
                                <Button className="btn btn-danger btn-block my-3">o ingresa con GOOGLE</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserLogin