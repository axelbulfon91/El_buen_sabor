import React, { PureComponent } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';



class LoginAdmin extends PureComponent{
    constructor(props) {
        super(props)

        this.state = {
            username:'',
            password:''            
        }
        
    }

    changeInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = async (e) => {

        e.preventDefault();
        const res = await axios.post('http://localhost:4000/api/usuarios/adminlogin', this.state);
        if (res.data.esAdmin) {            
            this.setState({
                id : res.data.id
            })
            console.log("Usuario logueado correctamente")
        } else {
            console.log("Usuario no logueado");
        }

    }

   
    render() {
        return (            
            <React.Fragment>
               <div className="row">
                <div className="col-md-5 mt-5 mx-auto">
                    <div className="card card-body">                        
                        <h3 className="text-center">Login</h3>
                        <Form onSubmit={this.submit} >
                            <Form.Group>
                                <Form.Label className="mt-2">Usuario</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese usuario"
                                    className="my-2 form-control" name="username" value={this.state.username}
                                    onChange={this.changeInputs} required  autocomplete="off"
                                />                                
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese un password"
                                    className="my-2 form-control mb-4" name="password" value={this.state.password}
                                    onChange={this.changeInputs} required autocomplete="off"
                                />                                
                            </Form.Group>
                            <div className="text-center">
                                <Button className="btn btn-primary btn-block my-3"
                                    type="submit">
                                    Ingresar
                                </Button>                               
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default LoginAdmin