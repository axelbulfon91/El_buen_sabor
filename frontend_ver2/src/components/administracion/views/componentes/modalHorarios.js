import React from 'react'
import { useEffect, useState } from 'react'
import { Modal, Button, Row } from 'react-bootstrap'

function ModalHorarios({ show, setShow, horarios, setHorarios, modif, setModif }) {

    const [horarioApertura, setHorarioApertura] = useState("")
    const [horarioCierre, setHorarioCierre] = useState("")
    const [dia, setDia] = useState(0)

    const guardarHorario = () => {

        if (modif.flag) {

            var i = horarios.findIndex(h => h.dia === modif.cambio.dia)
            const nuevoDia = {
                dia: modif.cambio.dia,
                horarioApertura: horarioApertura,
                horarioCierre: horarioCierre
            }
            horarios.splice(i, 1, nuevoDia)
            setHorarios(horarios)
            setModif({ flag: false })


        } else {
            var nuevoHorario = {
                dia: dia,
                horarioApertura: horarioApertura,
                horarioCierre: horarioCierre
            }

            if (horarios.some(h => h.dia === dia)) { // Validacion de Formulario cargado
                alert("El dia ingresado ya se encuentra cargado")
            } else if (horarioApertura === "" || horarioCierre === "") {
                alert("Los horarios no pueden estar en blanco")
            } else {
                horarios.push(nuevoHorario)
                setHorarios(horarios)

            }
        }
        setModif({ flag: false })
        setShow(false)


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



    return (
        <Modal show={show} onHide={() => { setShow(false); setModif({ flag: false }); }} size="md">
            <Modal.Header closeButton>
                <Modal.Title>Horarios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">Dia</label>
                        {modif.flag ? <select className="form-control">
                            <option disabled selected value={modif.cambio.dia}>{conocerDia(modif.cambio.dia)}</option>
                        </select>
                            :
                            <select id="inputState" className="form-control" onChange={(e) => setDia(parseInt(e.target.value))}>

                                <option hidden value="Elija Dia">Elija Dia</option>
                                <option value={1}>Lunes</option>
                                <option value={2}>Martes</option>
                                <option value={3}>Miercoles</option>
                                <option value={4}>Jueves</option>
                                <option value={5}>Viernes</option>
                                <option value={6}>Sabado</option>
                                <option value={0}>Domingo</option>
                            </select>
                        }


                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">Horario Apertura</label>
                        <input type="time" value={horarioApertura || modif.horarioApertura} onChange={(e) => setHorarioApertura(e.target.value)} className="form-control" id="inputAddress" datatype="hh:mm" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">Horario Cierre</label>
                        <input type="time" value={horarioCierre || modif.horarioCierre} onChange={(e) => setHorarioCierre(e.target.value)} className="form-control" id="inputAddress" datatype="hh:mm" />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => guardarHorario()}>
                    Guardar Horario
            </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ModalHorarios
