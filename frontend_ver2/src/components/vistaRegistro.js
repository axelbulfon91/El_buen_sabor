import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import Footer from '../components/comercio/uso_compartido/Footer';
import SeccionContacto from '../components/comercio/SeccionContacto';
import estilos from '../assets/css/VistaPerfil.module.css'
import BarraNavegacion from '../components/comercio/uso_compartido/BarraNavegacion';

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
        } else {
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
            <div className={estilos.fondo} style={{ paddingBottom: "3em" }}>
                <div className={estilos.fondoBarra}></div>
                <BarraNavegacion></BarraNavegacion>
                <Container className="mt-5">
                    <h3 className="text-center text-dark display-4">Registro</h3>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6">
                            <div className="form-group text-left">
                                <label>Email</label>
                                <input type="email"
                                    value={usuario}
                                    className="form-control"
                                    placeholder="Ingresa un Correo Electrónico"
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                            </div>
                            <div className="form-group text-left">
                                <label >Contraseña</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Ingresa una Contraseña"
                                    value={contrasenia}
                                    onChange={(e) => setContrasenia(e.target.value)}
                                />
                            </div>
                            <div className="form-group text-left">
                                <label >Contraseña</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Repite tu Contraseña"
                                    value={contrasenia2}
                                    onChange={(e) => setContrasenia2(e.target.value)}
                                />
                            </div>
                            <div className="text-center mt-4 mb-0">
                                <button onClick={() => registroLocal()}
                                    className="btn btn-info mb-4"><i className="fa fa-sign-in-alt"></i> Registrarse
                                 </button>
                                <p className="mb-2">
                                    ¿Ya tienes cuenta? <a href="/login" className="text-info">Ingresá</a>
                                </p>
                            </div>
                            <div className="text-center">
                                <GoogleLogin
                                    className=""
                                    clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENTE_ID}
                                    buttonText="Ingresar con Google"
                                    onSuccess={registroCorrecto}
                                    onFailure={registroIncorrecto}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>

                        </div>
                    </div>
                </Container>
            </div>
            <SeccionContacto></SeccionContacto>
            <Footer></Footer>
        </React.Fragment>
    )
}

export default VistaRegistro
