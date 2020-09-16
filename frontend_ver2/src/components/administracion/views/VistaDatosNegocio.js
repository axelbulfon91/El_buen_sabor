import React, { useState, useEffect } from 'react'
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionAdminLateral from '../uso_compartido/NavegacionAdminLateral';
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin';
import { Table, Modal, Button, Row } from 'react-bootstrap'
import Axios from 'axios';
import ModalHorarios from './componentes/modalHorarios';
import ComponenteFormDomicilio from './componentes/ComponenteFormDomicilio';

const VistaDatosNegocio = () => {

    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [domicilio, setDomicilio] = useState([]);
    const [show, setShow] = useState(false);
    const [showModalDom, setShowModalDom] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [modif, setModif] = useState({ flag: false, cambio: {} });
    var domicilios = []

    useEffect(() => {
        const traerDatos = async () => {
            const resp = await Axios.get('http://localhost:4000/api/datosGenerales/1')
            setEmail(resp.data.email)   
            if(resp.data.horarios){
                setHorarios(resp.data.horarios)
            }else{
                setHorarios([])
            }       
            
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
        traerDatos()

    }, [])

    const handleOnSubmit = async () => {
        var datosAGuardar = {
            email: email,
            telefono: telefono,
            horarios: horarios,
            calle: domicilio[0].calle,
            numeracion: domicilio[0].numeracion,
            id_localidad: domicilio[0].idLocalidad
        }
        const resp = await Axios.put('http://localhost:4000/api/datosGenerales/1', datosAGuardar)
        console.log(resp.data)


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
                            <Table size="sm" className='text-center' bordered>
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
                                        (domicilio.map((d) => (
                                            <tr>
                                                <td className="text-left">{d.nombreLocalidad}</td>
                                                <td>{d.calle}</td>
                                                <td>{d.numeracion}</td>
                                                <td><button onClick={() => eliminarDom(d.idLocalidad)} className="btn btn-danger btn-sm">X</button></td>
                                            </tr>
                                        ))
                                        )
                                    )
                                        :
                                        <tr className="text-center" ><td colspan="3" >Sin datos</td></tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className="form-group col-md-3">
                            {domicilio.length < 1 &&
                                <div>
                                    <button onClick={() => setShowModalDom(true)} className="btn btn-secondary">Cargar Domicilio</button>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="form-row mt-3">
                        <div className=" form-group col-md-6">
                            <Table size="sm" className='text-center' hover bordered>
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
                                                    <button onClick={() => eliminarDia(parseInt(h.dia))} className="btn btn-danger btn-sm">X</button>
                                                </td>
                                            </tr>
                                        )))
                                        :
                                        <tr><td className="text-center" colpan="3" >Sin datos</td></tr>
                                    }
                                    <tr className="text-center" ><td colspan="4">
                                        <button onClick={() => setShow(true)} className="btn btn-success btn-sm">Agregar horario</button>
                                    </td></tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="text-center">
                                <button onClick={(e) => handleOnSubmit(e)} className="btn btn-primary float-right">Guardar datos</button>
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
