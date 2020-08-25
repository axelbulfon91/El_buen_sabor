import React from 'react'
import GoogleLogin from 'react-google-login';
import Axios from 'axios';

import { Container } from "react-bootstrap";

function VistaRegistro() {
    
    const registroCorrecto = async (r) => {

        const user = {
            googleId: r.googleId,
            email: r.profileObj.email,
            nombre: r.profileObj.name
        }
        const resp = await Axios.post("http://localhost:4000/api/usuarios/login/google", user)

        if (resp.data.message !== 'Error al registrar el usuario') {
            alert(resp.data.message)
            window.localStorage.setItem('token', resp.data.token)
            window.location.href = "/"

        } else {
            alert(resp.data.message)
        }
    }

    const registroIncorrecto = () => {
        alert('Error al registrarse con Google')
    }

    return (
        <React.Fragment>
            
            <Container className="mt-5">
            <h2>Registro</h2>
                <div className="row">
                    <div className="col-md-6">
                        <form>
                            <div className="form-group text-left">
                                <label>Email address</label>
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputPassword1">Repeat Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="password2"
                                    placeholder="Repeat password"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Registrarse</button>
                        </form>
                        <br/>

                    o registrate por Google

                    <GoogleLogin
                            className="ml-4"
                            clientId="505222477717-sitpp1mna4vtrih544ugpmorbo669qj9.apps.googleusercontent.com"
                            buttonText="Ingresar con Google"
                            onSuccess={registroCorrecto}
                            onFailure={registroIncorrecto}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>




            </Container>
        </React.Fragment>
    )
}

export default VistaRegistro