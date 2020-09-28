import React, {useState} from 'react'
import {Container} from 'react-bootstrap';
import Axios from 'axios';

function CambioPassword(props) {

    const [usuario, setUsuario] = useState(atob(props.match.params.email))
    const [contrasenia, setContrasenia] = useState("")
    const [contrasenia2, setContrasenia2] = useState("")

    const handleOnSubmit = (e) => {
        e.preventDefault();
        cambioPassword();
    }

    const cambioPassword = async () => {
        if (usuario !== "") {
            if (contrasenia === contrasenia2 && contrasenia.length >= 6) {
                const user = {
                    password: contrasenia
                }
                const resp = await Axios.put("http://localhost:4000/api/usuarios/password/" + usuario, user)       
                if (resp.data.message === "Password actualizada correctamente") {
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

    return (
        <React.Fragment>

            <Container className="mt-5">
                <h2>Restablecer Contraseña</h2>
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
                            <div className="form-group text-left">
                                <label>Password</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Repeat password"
                                    value={contrasenia2}
                                    onChange={(e) => setContrasenia2(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary mr-3">Cambiar password</button>
                        </form>
                    </div>
                </div>

            </Container>
        </React.Fragment>
    )
}

export default CambioPassword
