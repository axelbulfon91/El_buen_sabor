import React from 'react'
import DetallePedidoView from './DetallePedidoView'


const DetallePedidoContainer = (props) => {
    const { pedido, showModal, closeModal } = props
    return (
        <DetallePedidoView
            show={showModal}
            pedido={pedido}
            onHide={() => closeModal()}
            setRefreshToken={props.setRefreshToken}
        />
    )
}

export default DetallePedidoContainer
