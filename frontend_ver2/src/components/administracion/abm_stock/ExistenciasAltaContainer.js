import React, { useState } from 'react'
import ExistenciasAltaView from './ExistenciasAltaView'
import axios from 'axios'
import {TIPOS_CON_STOCK} from '../uso_compartido/valoresHardCoded'




const ExistenciasAltaContainer = ({ refrescarExistencias, modalShow, setModalShow }) => {


    const handleGuardar = async (tipoStock, idArt, cantidad, costoPorUnidad, fechaVencimiento) => {//Maneja el guardado de la nueva existencia
        let url = `http://localhost:4000/api/productos/existencias/${tipoStock}`;

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
