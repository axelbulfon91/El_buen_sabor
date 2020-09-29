import React, { useState } from 'react'
import ExistenciasAltaView from './ExistenciasAltaView'
import axios from 'axios'
import { TIPOS_CON_STOCK } from '../uso_compartido/valoresHardCoded'
import mensaje from '../../../utils/Toast'




const ExistenciasAltaContainer = ({ refrescarExistencias, modalShow, setModalShow }) => {


    const handleGuardar = async (tipoStock, idArt, cantidad, costoPorUnidad, fechaVencimiento) => {//Maneja el guardado de la nueva existencia
        let url = `http://localhost:4000/api/productos/existencias/${tipoStock}`;
        try {
            const nuevaExistencia = await axios({
                method: 'post',
                url: url,
                data: {
                    idArt,
                    cantidad,
                    costoPorUnidad,
                    fechaVencimiento
                }
            });
            mensaje("exito", "Nueva Existencia añadida")
        } catch (error) {
            mensaje("error", "No se pudo generar la nueva existencia")
        }
        setModalShow(false)
        refrescarExistencias()
    }


    return (
        <React.Fragment>
            <ExistenciasAltaView
                show={modalShow}
                handleGuardar={handleGuardar}
                onHide={() => setModalShow(false)}
                tiposExistencias={TIPOS_CON_STOCK}
                refrescarExistencias={refrescarExistencias}
            />
        </React.Fragment>
    )
}

export default ExistenciasAltaContainer
