import React, { useState } from 'react'
import CategoriaAltaView from './CategoriaAltaView'
import axios from 'axios'
import {TIPOS_DE_CATEGORIAS as tiposCategorias} from '../uso_compartido/valoresHardCoded'


const CategoriasAltaContainer = ({refrescarCategorias, modalShow, setModalShow}) => {

    
    const handleGuardar = async (nombre, tipo) => {//Maneja el guardado de la nueva categoria
        const nuevaCategoria = await axios({
            method: 'post',
            url: 'http://localhost:4000/api/productos/categorias',
            data: {
              nombre: nombre,
              tipo: tipo
            }
          });
          console.log(nuevaCategoria.data);
          setModalShow(false)
          refrescarCategorias()
    }
    return (
        <React.Fragment>


            <CategoriaAltaView
                show={modalShow}
                handleGuardar={handleGuardar}
                onHide={() => setModalShow(false)}
                tiposCategorias={tiposCategorias}
                refrescarCategorias={refrescarCategorias}
            />
        </React.Fragment>
    )
}

export default CategoriasAltaContainer
