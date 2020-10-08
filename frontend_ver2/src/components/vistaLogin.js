import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import Footer from '../components/comercio/uso_compartido/Footer';
import SeccionContacto from '../components/comercio/SeccionContacto';
import estilos from '../assets/css/VistaPerfil.module.css'
import BarraNavegacion from '../components/comercio/uso_compartido/BarraNavegacion';

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
            window.sessionStorage.setItem('token', resp.data.token)
            window.location.href = "/"

        } else {
            alert(resp.data.message)
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        loginCorrectoLocal()
    }

    const enviarEmail = async () => {

        if (usuario !== "") {
            const data = {
                email: usuario
            }

            const resp = await Axios.post('http://localhost:4000/api/enviarEmail/recuperarPassword', data)
            if (resp.data.message === "OK") {
                alert("Revise su correo para resetear la clave")
            }
        } else {
            alert('Debe ingresar un correo valido')
        }
    }


    return (
        <React.Fragment>
            <div className={estilos.fondo} style={{ paddingBottom: "3em" }}>
                <div className={estilos.fondoBarra}></div>
                <BarraNavegacion></BarraNavegacion>

                <div style={{ //container
                    width: "80%",
                    maxWidth: "450px",
                    margin: "5em auto",
                }}>
                    <div>
                        <h3 className="text-center text-dark display-4 mb-3"><i className="fa fa-user"></i> Ingresar</h3>
                        <div className="d-flex flex-column" >
                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                <div className="form-group text-left">
                                    <label>Email</label>
                                    <input type="email"
                                        value={usuario}
                                        className="form-control"
                                        placeholder="Ingresa un Correo Electrónico"
                                        onChange={(e) => setUsuario(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-1">
                                    <label >Password</label>
                                    <input type="password"
                                        className="form-control"
                                        placeholder="Ingresa una Contraseña"
                                        value={contrasenia}
                                        onChange={(e) => setContrasenia(e.target.value)}
                                    />
                                    <div className="d-flex justify-content-between mt-2">
                                        <p className="pt-2">¿Sin cuenta? <a href="/registro" className="text-info">Regístrate</a></p>
                                        <p onClick={() => enviarEmail()}
                                            className="btn pt-2 bg-transparent border-0 text-right"
                                            style={{ color: "darkred" }}>Olvidé mi Contraseña</p>
                                    </div>
                                </div>
                                <div className="d-flex flex-column justify-content-around align-items-center">
                                    <button type="submit" className="btn btn-info btn- w-50"><i className="fa fa-sign-in-alt"></i> Ingresar</button>
                                    <div className="d-flex justify-content-center mt-3" style={{ width: "100%" }}>
                                        <GoogleLogin
                                            className="text-center"
                                            clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENTE_ID}
                                            buttonText="Ingresar con Google"
                                            onSuccess={loginCorrectoGoogle}
                                            onFailure={loginIncorrectoGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </div>
                                </div>



                                <br />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <SeccionContacto></SeccionContacto>
            <Footer></Footer>
        </React.Fragment>
    )
}

export default VistaLogin
