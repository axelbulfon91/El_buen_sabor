import React, { useEffect, useState } from "react"
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap'

function ComponenteFormDomicilio({ showModalDom, setShowModalDom, domicilio, setDomicilio}) {

    const [calle, setCalle] = useState("")
    const [numeracion, setNumeracion] = useState("")
    const [detalle, setDetalle] = useState("")
    const [localidades, setLocalidades] = useState([])
    const [provincias, setProvincias] = useState([])
    const [localidad, setLocalidad] = useState("")

    useEffect(() => {
        async function traerDatos() {
            const respProv = await Axios.get('http://localhost:4000/api/usuarios/domicilios/provincias')
            setProvincias(respProv.data.provincias)            
        }
        traerDatos()
    }, [])

    const handlerProvincias = async (i) => {
        const respLoc = await Axios.get('http://localhost:4000/api/usuarios/domicilios/localidades/' + i)
        setLocalidades(respLoc.data.localidades)

    }

    const cambiarLocalidad = async (i) => {
        setLocalidad(i)
    }

    const guardarDomicilio = async (e) => {
        e.preventDefault();        
        let combo = document.getElementById("selectLocalidad");
        let nombreLocalidad = combo.options[combo.selectedIndex].text;
        if (localidad !== "") {
            if (calle !== "" && numeracion !== "") {
                let dom = {
                    idLocalidad: localidad,
                    nombreLocalidad: nombreLocalidad,
                    calle: calle,
                    numeracion: numeracion,
                    detalle: detalle
                }
                let domicilios = domicilio
                domicilios.push(dom)
                setDomicilio(domicilios)
                cerrarModal()
            } else {
                alert("Debe especificar nombre de calle y numeracion")
            }
        } else {
            alert("Debe especificar Provincia y localidad")
        }

    }
    const cerrarModal = () => {     // Clarea campos
        setLocalidades([])
        setLocalidad("")
        setCalle("")
        setDetalle("")
        setNumeracion("")
        setShowModalDom(false)
    }

    return (

        <Modal show={showModalDom} onHide={() => cerrarModal()} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Domicilio</Modal.Title>
            </Modal.Header>
            <form onSubmit={guardarDomicilio}>
                <Modal.Body>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputState">Provincia</label>
                            <select id="inputState" onChange={(e) => handlerProvincias(e.target.value)} className="form-control">
                                <option hidden value="Elija Provincia">Elija Provincia</option>
                                {provincias.length >= 0 ?
                                    provincias.map(p => (
                                        <option key={p.id} value={p.id}>{p.nombre}</option>
                                    ))
                                    : <option>Elija Provincia</option>
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputState">Localidad</label>
                            <select id="selectLocalidad" className="form-control" onChange={(e) => cambiarLocalidad(e.target.value)}>
                                <option hidden value="">Elija localidad</option>
                                {localidades.length >= 0 ?
                                    localidades.map(l => (
                                        <option key={l.id} value={l.id}>{l.nombre}</option>
                                    ))
                                    : <option>Elija Localidad</option>
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputState">Calle</label>
                            <input type="text" value={calle} onChange={(e) => setCalle(e.target.value)} className="form-control" id="inputAddress" placeholder="Calle" />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputState">Numero</label>
                            <input type="number" value={numeracion} onChange={(e) => setNumeracion(e.target.value)} className="form-control" id="inputAddress" placeholder="Numero" />
                        </div>
                    </div>
                    <div className="form row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputState">Detalle</label>
                            <input type="text" value={detalle} onChange={(e) => setDetalle(e.target.value)} className="form-control" id="inputAddress" placeholder="Detalle" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Guardar domicilio
                </Button>
                </Modal.Footer>
            </form>
        </Modal>



    )
}

export default ComponenteFormDomicilio