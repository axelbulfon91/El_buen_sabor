import React from 'react'
import DetalleElaboradoView from './DetalleElaboradoView'


const DetalleElaboradoContainer = ({ elaborado, showModalDetalleElaborado, setShowModalDetalleElaborado}) => {
    return (
        <React.Fragment>
            <DetalleElaboradoView
                show={showModalDetalleElaborado}
                elaborado={elaborado}
                onHide={() => setShowModalDetalleElaborado(false)}
            />
        </React.Fragment>
    )
}

export default DetalleElaboradoContainer
