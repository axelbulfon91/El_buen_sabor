import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import Axios from 'axios';

import { Container } from "react-bootstrap";

function VistaRegistro() {

    const [usuario, setUsuario] = useState("")
    const [contrasenia, setContrasenia] = useState("")
    const [contrasenia2, setContrasenia2] = useState("")

    const registroLocal = async () => {
        
        if (usuario !== "") {
            if (contrasenia === contrasenia2 && contrasenia.length >= 6) {
                const user = {
                    username: usuario,
                    password: contrasenia
                }
                const resp = await Axios.post("http://localhost:4000/api/usuarios/registro", user)
                console.log(resp.data)
                if (resp.data.message === "Usuario creado correctamente") {
                    alert(resp.data.message)
                    window.sessionStorage.setItem('token', resp.data.token)
                    window.location.href = "/"

                } else {
                    alert(resp.data.message)
                }
            } else {
                alert("Las contraseñas ingresadas no coinciden o tienen menos de 6 caracteres")
            }
        }else{
            alert("El campo de correo electronico no puede estar vacio")
        }
    }

    const registroCorrecto = async (r) => {

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

    const registroIncorrecto = () => {
        alert('Error al registrarse con Google')
    }

    return (
        <React.Fragment>

            <Container className="mt-5">
                <h2>Registro</h2>
                <div className="row">
                    <div className="col-md-6">
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
                        <div className="form-group text-left">
                            <label >Password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="Repeat password"
                                value={contrasenia2}
                                onChange={(e) => setContrasenia2(e.target.value)}
                            />
                        </div>

                        <button onClick={() => registroLocal()} className="btn btn-primary mr-3">Registrarse</button>
                        Tienes cuenta? <a href="/login" className="text-primary">Ingresa</a>
                        <br />

                    o registrate por Google

                    <GoogleLogin
                            className="ml-4"
                            clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENTE_ID}
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
