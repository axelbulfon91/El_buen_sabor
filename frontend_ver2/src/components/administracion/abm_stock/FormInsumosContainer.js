import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UNIDADES_DE_MEDIDA as unidadesDeMedida } from '../uso_compartido/valoresHardCoded'
import FormInsumosView from './FormInsumosView'

const FormInsumosContainer = ({ refrescar, insumo, modalShow, setModalShow }) => {

    const [categorias, setCategorias] = useState('');
    
    useEffect(() => {//Obtengo las Categorias 
        const fetchData = async () => {
            const result = await axios('http://localhost:4000/api/productos/categorias');
            let categoriasFiltradas = result.data.filter(categoria => {
                return categoria.tipo === 'insumos'
            })
            setCategorias(categoriasFiltradas);
        };
        fetchData();
    }, [])

    //Manejo del Guardar
    const handleGuardar = async (nombre, nombreImg, categoria, unidadMedida, stockMaximo, stockMinimo) => {
        const datosFormulario = new FormData();
        datosFormulario.append('nombre', nombre);
        datosFormulario.append('imagen', nombreImg);
        datosFormulario.append('categoria', categoria);
        datosFormulario.append('unidadMedida', unidadMedida);
        datosFormulario.append('stockMaximo', stockMaximo);
        datosFormulario.append('stockMinimo', stockMinimo);
        if(insumo){//Si es una edicion
            try {
                const nuevoInsumo = await axios.put(`http://localhost:4000/api/productos/insumos/${insumo.id}`, datosFormulario, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                console.log(nuevoInsumo);
                setModalShow(false)
                refrescar(oldKey => oldKey + 1);
            } catch (error) {
                console.log(error);
            }
        }else{//Sino es un insumo nuevo
            try {
                const nuevoInsumo = await axios.post('http://localhost:4000/api/productos/insumos', datosFormulario, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                console.log(nuevoInsumo);
                setModalShow(false)
                refrescar(oldKey => oldKey + 1);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (categorias && //Solo renderiza despues de obtener las categorias
        <React.Fragment>   
             <FormInsumosView
                show={modalShow}
                handleGuardar={handleGuardar}
                onHide={() => setModalShow(false)}
                categorias={categorias}
                unidadesDeMedida={unidadesDeMedida}
                insumo={insumo}
            />        
        </React.Fragment>
    )
}

export default FormInsumosContainer
