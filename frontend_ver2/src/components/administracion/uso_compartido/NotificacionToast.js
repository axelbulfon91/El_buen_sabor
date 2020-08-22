import React from 'react'
import { Toast } from 'react-bootstrap'

const NotificacionToast = ({ showToast, setShowToast, mensaje }) => {
    return (
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{mensaje}</Toast.Body>
        </Toast>
    )
}

export default NotificacionToast
