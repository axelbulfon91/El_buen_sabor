import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { traerDomicilios } from './VistaPerfil';

function ModalEleccionDomicilio({ showModal, setShowModal, domElegido, setDomElegido }) {

    const [doms, setDoms] = useState([])
    const [dom, setDom] = useState(null)

    useEffect(() => {
        traerDomicilios().then(resp => {
            setDoms(resp)
        })
    }, [])

    const handlerProvincias = (e) => {
        setDom(parseInt(e))
    }

    const confirmar = () => {


        if (dom === null) {
            alert("Debe seleccionar un domicilio")
        } else {            
            const domicilio = doms.find((d) => d.id === dom)
            setDomElegido(domicilio)
            setShowModal(false)   
            setDom(null)         
        }
        

    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Elija Domicilio</Modal.Title>
            </Modal.Header>
            {doms.length ?
                <Modal.Body>
                    <select defaultValue={null} onChange={(e) => handlerProvincias(e.target.value)} className="form-control">
                        <option hidden value={null}>Elija Domicilio</option>
                        {doms.length >= 0 ?
                            doms.map(dom => (
                                <option key={dom.id} value={dom.id}>{dom.calle + " " + dom.numeracion +
                                    " en " + dom.nombreLocalidad +
                                    " ( " + dom.detalle_adicional + " )"}</option>
                            ))
                            : <option>Elija Domicilio</option>
                        }
                    </select>
                </Modal.Body>
                :
                <h2>Cargando domicilios...</h2>
            }
            <Modal.Footer>
                <Button variant="primary" onClick={() => confirmar()}>
                    Confirmar
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEleccionDomicilio
