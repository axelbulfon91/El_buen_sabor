import React, { useEffect } from 'react'
import BarraNavegacion from '../uso_compartido/BarraNavegacion'
import estilos from '../../../assets/css/VistaPerfil.module.css'
import { Button, Container, Table, OverlayTrigger, Popover } from 'react-bootstrap';
import { useState } from 'react';
import axiosAutorizado from '../../../utils/axiosAutorizado';
import jwtDecode from 'jwt-decode';
import ComponenteFormDomicilio from '../../administracion/views/componentes/ComponenteFormDomicilio';
import mensaje from '../../../utils/Toast';
import Footer from '../uso_compartido/Footer';
import SeccionContacto from '../SeccionContacto';

const Perfil = () => {

    const [telefono, setTelefono] = useState("")
    const [actualizacion, setActualizacion] = useState(false)
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [domicilios, setDomicilios] = useState([])
    const [showModalDom, setShowModalDom] = useState(false);
    const idUsuario = jwtDecode(window.sessionStorage.getItem('token')).id

    useEffect(() => {
        traerDatos()
    }, [actualizacion])

    const traerDatos = async () => {
        const resp = await axiosAutorizado().get('http://localhost:4000/api/usuarios/' + idUsuario);
        setTelefono(resp.data.telefono)
        setNombre(resp.data.nombre)
        setEmail(resp.data.email)
        traerDomicilios().then(doms => setDomicilios(doms))

    }

    const eliminarDom = async (d, i) => {
        const domAEliminar = domicilios.find((dom) => dom.id === d.id)
        if (domAEliminar.id !== undefined) {
            const aux = {
                id_domicilio: domAEliminar.id
            }
            const conf = window.confirm("Seguro desea eliminar el domicilio?")
            if (conf) {
                const resp = await axiosAutorizado().post('http://localhost:4000/api/usuarios/domicilios/eliminar/' + idUsuario, aux)

                setActualizacion(!actualizacion)
            }
        } else {
            var domiciliosActualizados = domicilios.filter((dom, idx) => {
                if (idx !== i) return dom
            })
            setDomicilios(domiciliosActualizados)
        }

    }

    const actualizarDatos = async () => {
        const datos = {
            nombre,
            telefono,
            email
        }
        try {
            const resp = await axiosAutorizado().put('http://localhost:4000/api/usuarios/' + idUsuario, datos)
            if (domicilios && domicilios.length) { // Guarda en BD todos los domicilios de la pantalla de edicion de datos
                domicilios.map(async (d) => {
                    var dom = {
                        id_domicilio: d.id,
                        calle: d.calle,
                        numeracion: d.numeracion,
                        detalle_adicional: d.detalle,
                        id_localidad: d.idLocalidad
                    }
                    const respAct = await axiosAutorizado().put('http://localhost:4000/api/usuarios/domicilios/' + idUsuario, dom)
                    console.log(respAct.data)
                })
            } else {
                console.log("Sin domicilios a cargar")
            }
            mensaje("exito", "Datos Actualizados Exitosamente")
        } catch (error) {
            mensaje("error", "No se pudo actualizar los Datos")
            console.log(error);
        }


    }

    return (
        <React.Fragment>
            <div className={estilos.fondo}>
            <div className={estilos.fondoBarra}></div>
                <BarraNavegacion></BarraNavegacion>
                <Container className="mt-5">
                    <h1>Datos de perfil</h1>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label>Nombre</label>
                                <input type="text" onChange={(e) => setNombre(e.target.value)} className="form-control" placeholder="Nombre" value={nombre} />
                            </div>
                            <div className="mb-3">
                                <label>E-mail</label>
                                <div className="input-group">
                                    <input type="email" className="form-control" value={email} required disabled />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Telefono</label>
                                <input type="text" onChange={(e) => setTelefono(e.target.value)} className="form-control" placeholder="Telefono" value={telefono} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>Domicilios</label>
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
                                    {domicilios.length > 0 ? (
                                        (domicilios.map((d, i) => (
                                            <tr key={i}>
                                                <td className="text-left">{d.nombreLocalidad}</td>
                                                <td>{d.calle}</td>
                                                <td>{d.numeracion}</td>
                                                <td>
                                                    <OverlayTrigger
                                                        trigger={"focus"}
                                                        key={i}
                                                        placement="left"
                                                        overlay={
                                                            <Popover id={`popover-positioned-${i}`}>
                                                                <Popover.Content>
                                                                    {d.detalle_adicional}
                                                                </Popover.Content>
                                                            </Popover>
                                                        }
                                                    >
                                                        <Button className="btn btn-info btn-sm">?</Button>
                                                    </OverlayTrigger>
                                                    <button onClick={() => eliminarDom(d, i)} className="ml-1 btn btn-danger btn-sm">X</button>
                                                </td>
                                            </tr>
                                        ))
                                        )
                                    )
                                        :
                                        <tr className="text-center" ><td colSpan="3" >Sin datos</td></tr>
                                    }
                                </tbody>
                                <tfoot>
                                    <tr className="text-center" >
                                        <td colSpan="4">
                                            <button onClick={() => setShowModalDom(true)} className="btn btn-secondary">Cargar Domicilio</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    </div>
                    <button className="btn btn-primary">Cambiar Password</button>

                    <div className="row justify-content-md-center mt-4">
                        <button className="btn btn-primary" onClick={() => actualizarDatos()}>Actualizar datos</button>
                    </div>
                </Container>
            </div>
            {
                <ComponenteFormDomicilio
                    showModalDom={showModalDom}
                    setShowModalDom={setShowModalDom}
                    domicilio={domicilios}
                    setDomicilio={setDomicilios}>
                </ComponenteFormDomicilio>
            }
            <SeccionContacto></SeccionContacto>
            <Footer></Footer>
        </React.Fragment>
    )
}

export const traerDomicilios = async () => {
    const idUsuario = jwtDecode(sessionStorage.getItem('token')).id;
    var doms = []
    const resp = await axiosAutorizado().get('http://localhost:4000/api/usuarios/' + idUsuario);
    if (resp.data.Domicilios) {
        resp.data.Domicilios.map(d => {
            var dom = {
                id: d.id,
                idLocalidad: d.Localidad.id,
                nombreLocalidad: d.Localidad.nombre,
                calle: d.calle,
                detalle_adicional: d.detalle_adicional,
                numeracion: d.numeracion
            }
            doms.push(dom)
        })
    }
    return doms
}

export default Perfil
