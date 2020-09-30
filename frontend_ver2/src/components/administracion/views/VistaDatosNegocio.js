import React, { useState, useEffect } from 'react'
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionAdminLateral from '../uso_compartido/NavegacionAdminLateral';
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin';
import { Table, Button } from 'react-bootstrap'
import Axios from 'axios';
import ModalHorarios from './componentes/modalHorarios';
import ComponenteFormDomicilio from './componentes/ComponenteFormDomicilio';
import mensaje from '../../../utils/Toast';


const VistaDatosNegocio = () => {

    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [domicilio, setDomicilio] = useState([]);
    const [show, setShow] = useState(false);
    const [showModalDom, setShowModalDom] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [modif, setModif] = useState({ flag: false, cambio: {} });
    const [nuevo, setNuevo] = useState(false)
    var domicilios = []

    useEffect(() => {
        const traerDatos = async () => {
            const resp = await Axios.get('http://localhost:4000/api/datosGenerales/1')
            if (resp.data.message === "Local no encontrado") {
                setHorarios([])
                setNuevo(true)
            } else {
                setEmail(resp.data.email)
                setHorarios(resp.data.horarios)
                setTelefono(resp.data.telefono)
                if (resp.data.Domicilio) {
                    var dom = {
                        idLocalidad: resp.data.Domicilio.Localidad.id,
                        nombreLocalidad: resp.data.Domicilio.Localidad.nombre,
                        calle: resp.data.Domicilio.calle,
                        numeracion: resp.data.Domicilio.numeracion
                    }
                    domicilios.push(dom)
                    setDomicilio(domicilios)
                }
            }
        }
        traerDatos()

    }, [])

    const handleOnSubmit = async () => {
        if (domicilio && domicilio.length) { // Verifica que haya domicilio cargado
            if (horarios && horarios.length) { // Verifica que haya horarios cargado
                if (telefono.length !== 0 || email.length !== 0) {
                    var datosAGuardar = {
                        email: email,
                        telefono: telefono,
                        horarios: horarios,
                        calle: domicilio[0].calle,
                        numeracion: domicilio[0].numeracion,
                        id_localidad: domicilio[0].idLocalidad
                    }
                    if (!nuevo) { //Verifica si hay que actualizar o crear uno
                        const resp = await Axios.put('http://localhost:4000/api/datosGenerales/1', datosAGuardar)
                        mensaje("exito", "Datos Modificados Exitosamente")
                    } else {
                        const resp = await Axios.post('http://localhost:4000/api/datosGenerales', datosAGuardar)
                        mensaje("exito", "Datos Creados Exitosamente")
                    }
                } else {
                    alert("Los campos Email y telefono no pueden estar vacios")
                }
            } else {
                alert("Debe ingresar Horarios de atencion")
            }
        } else {
            alert("Debe ingresar Domicilio del local")
        }




    }

    const conocerDia = (cod) => {
        switch (cod) {
            case 1: return "Lunes";
            case 2: return "Martes";
            case 3: return "Miercoles";
            case 4: return "Jueves";
            case 5: return "Viernes";
            case 6: return "Sabado";
            case 0: return "Domingo";
        }
    }

    const eliminarDom = (id) => {
        var domiciliosActualizados = domicilio.filter(d => d.idLocalidad !== id)
        setDomicilio(domiciliosActualizados)
    }

    const eliminarDia = (dia) => {
        console.log(dia)
        var diasActualizados = horarios.filter(d => d.dia !== dia)
        console.log(diasActualizados)
        setHorarios(diasActualizados)
    }

    const editar = (h) => {
        setShow(true)
        setModif({ flag: true, cambio: h })
    }

    return (
        <>
            <BarraNavegacionAdmin />
            <GridLayoutAdmin>
                <NavegacionAdminLateral></NavegacionAdminLateral>
                <div id="columna-2" className="m-5">
                    <h1 className="display-4 p-3" style={{ borderLeft: "8px solid DarkRed" }}>Administración / <strong>Datos de Negocio</strong></h1>
                    <div className="form-group">
                        <label htmlFor="inputEmail4">Email de local</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail4" placeholder="Email de local" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Telefono</label>
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="form-control" id="inputAddress" placeholder="Telefono de local" />
                    </div>
                    <div className="form-row mt-3">
                        <div className=" form-group col-md-6">
                            <h5>Domicilio</h5>
                            <Table size="sm" className='text-center'>
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Localidad</th>
                                        <th>Calle</th>
                                        <th>Numeracion</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {domicilio.length > 0 ? (
                                        (domicilio.map((d, i) => (
                                            <tr key={i}>
                                                <td className="text-left">{d.nombreLocalidad}</td>
                                                <td>{d.calle}</td>
                                                <td>{d.numeracion}</td>
                                                <td>
                                                    <Button onClick={() => eliminarDom(d.idLocalidad)}
                                                        variant="outline-danger"
                                                        style={{ border: "none" }}
                                                        size="sm" ><i className="fa fa-times"></i></Button>
                                                </td>
                                            </tr>
                                        ))
                                        )
                                    )
                                        :
                                        <tr className="text-center" ><td colSpan="3" >Sin datos</td></tr>
                                    }
                                </tbody>
                                {domicilio.length < 1 &&
                                    <tfoot>
                                        <tr className="text-center" >
                                            <td colSpan="4">
                                                <button onClick={() => setShowModalDom(true)} className="btn btn-secondary">Cargar Domicilio</button>
                                            </td>
                                        </tr>
                                    </tfoot>
                                }

                            </Table>
                        </div>
                        <div className="form-group col-md-6">
                            <h5>Horarios</h5>
                            <Table size="sm" className='text-center' hover>
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Dia</th>
                                        <th>Hora apertura</th>
                                        <th>Hora cierre</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {horarios ?
                                        (horarios.map((h, i) => (
                                            <tr key={i}>
                                                <td onClick={() => editar(h)} className="text-left">{conocerDia(h.dia)}</td>
                                                <td onClick={() => editar(h)}>{h.horarioApertura}</td>
                                                <td onClick={() => editar(h)}>{h.horarioCierre}</td>
                                                <td>
                                                    <Button onClick={() => eliminarDia(parseInt(h.dia))}
                                                        variant="outline-danger"
                                                        style={{ border: "none" }}
                                                        size="sm" ><i className="fa fa-times"></i></Button>
                                                </td>
                                            </tr>
                                        )))
                                        :
                                        <tr><td className="text-center" colpan="3" >Sin datos</td></tr>
                                    }

                                </tbody>
                                <tfoot>
                                    <tr className="text-center" >
                                        <td colSpan="4">
                                            <button onClick={() => setShow(true)}
                                                className="btn btn-primary bg-transparent border-0"
                                                style={{ color: "darkred" }}>+Agregar Horario</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    </div>
                    <div className="form-row justify-content-md-center mt-2">
                        <div className="form-group col-md-3 ">
                            <div className="text-center">
                                <Button variant="info" size="lg" onClick={(e) => handleOnSubmit(e)} >Guardar Datos <i className="fa fa-save"></i></Button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    <ModalHorarios
                        show={show}
                        setShow={setShow}
                        horarios={horarios}
                        setHorarios={setHorarios}
                        modif={modif}
                        setModif={setModif}>
                    </ModalHorarios>

                }
                {
                    <ComponenteFormDomicilio
                        showModalDom={showModalDom}
                        setShowModalDom={setShowModalDom}
                        domicilio={domicilio}
                        setDomicilio={setDomicilio}>
                    </ComponenteFormDomicilio>
                }


            </GridLayoutAdmin>
        </>
    )
}

export default VistaDatosNegocio
