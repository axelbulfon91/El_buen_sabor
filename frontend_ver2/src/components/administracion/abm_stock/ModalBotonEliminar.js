import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const ModalBotonEliminar = ({id, handleEliminar,handleCloseModalEliminar, showModalEliminar}) => {

    return (
        <>
            <Modal
                show={showModalEliminar}
                onHide={handleCloseModalEliminar}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminar Elemento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Está seguro de querer eliminar este elemento?
          </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalEliminar}>
                        Cancelar
            </Button>
                    <Button variant="danger" onClick={() => handleEliminar(id)}>Elimnar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBotonEliminar
