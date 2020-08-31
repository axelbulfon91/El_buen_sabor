import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import { Container } from "react-bootstrap";

function VistaLogin() {
    const [usuario, setUsuario] = useState("")
    const [contrasenia, setContrasenia] = useState("")

    const loginCorrectoGoogle = async (r) => {
        const user = {
            googleId: r.googleId,
            email: r.profileObj.email,
            nombre: r.profileObj.name
        }
        const resp = await Axios.post("http://localhost:4000/api/usuarios/login/google", user)

        if (resp.data.message !== 'Error al registrar el usuario') {
            alert(resp.data.message)
            window.sessionStorage.setItem('token', resp.data.token)
            window.location.href = "/"

        } else {
            alert(resp.data.message)
        }
    }

    const loginIncorrectoGoogle = () => {
        alert('Error al loguearse con Google')
    }
    const loginCorrectoLocal = async () => {

        const user = {
            email: usuario,
            password: contrasenia
        }
        const resp = await Axios.post("http://localhost:4000/api/usuarios/login", user)

        if (resp.data.message == "Login correcto") {
            alert(resp.data.message)
            window.localStorage.setItem('token', resp.data.token)
            window.location.href = "/"

        } else {
            alert(resp.data.message)
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        loginCorrectoLocal()
    }

    return (
        <React.Fragment>

            <Container className="mt-5">
                <h2>Login</h2>
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={(e) => handleOnSubmit(e)}>
                            <div className="form-group text-left">
                                <label>Email address</label>
                                <input type="email"
                                    value={usuario}
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                            </div>
                            <div className="form-group text-left">
                                <label >Password</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={contrasenia}
                                    onChange={(e) => setContrasenia(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Ingresar</button>
                        </form>
                        <br />
                    o ingresa por Google

                    <GoogleLogin
                            className="ml-4"
                            clientId="505222477717-sitpp1mna4vtrih544ugpmorbo669qj9.apps.googleusercontent.com"
                            buttonText="Ingresar con Google"
                            onSuccess={loginCorrectoGoogle}
                            onFailure={loginIncorrectoGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>

            </Container>
        </React.Fragment>
    )
}

export default VistaLogin
