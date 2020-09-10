import React from 'react'
import DetallePedidoView from './DetallePedidoView'


const DetallePedidoContainer = (props) => {
    const { pedido, showModal, closeModal } = props

    console.log(pedido);
    return (
        <DetallePedidoView
            show={showModal}
            pedido={pedido}
            onHide={() => closeModal()}
        />
    )
}

export default DetallePedidoContainer
