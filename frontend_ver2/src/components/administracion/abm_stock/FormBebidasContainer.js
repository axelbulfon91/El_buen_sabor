import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FormBebidasView from './FormBebidasView'

const FormBebidasContainer = ({ refrescar, bebida, modalShow, setModalShow }) => {

    const [categorias, setCategorias] = useState('');
    useEffect(() => {//Obtengo las Categorias 
        const fetchData = async () => {
            const result = await axios('http://localhost:4000/api/productos/categorias');
            let categoriasFiltradas = result.data.filter(categoria => {
                return categoria.tipo === 'bebidas'
            })

            setCategorias(categoriasFiltradas);
        };
        fetchData();
        //Verifico si es edicion

    }, [])

    //Manejo del Guardar
    const handleGuardar = async (nombre, nombreImg, categoria, unidadMedida, stockMaximo, stockMinimo, precio) => {
        const datosFormulario = new FormData();
        datosFormulario.append('nombre', nombre);
        datosFormulario.append('imagen', nombreImg);
        datosFormulario.append('categoria', categoria);
        datosFormulario.append('unidadMedida', unidadMedida);
        datosFormulario.append('stockMaximo', stockMaximo);
        datosFormulario.append('stockMinimo', stockMinimo);
        datosFormulario.append('precio', precio);
        if (bebida) {//Si es una edicion
            try {
                const nuevaBebida = await axios.put(`http://localhost:4000/api/productos/bebidas/${bebida.id}`, datosFormulario, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                console.log(nuevaBebida);
                setModalShow(false)
                refrescar(oldKey => oldKey + 1);
            } catch (error) {
                console.log(error);
            }

        } else {
            try {
                const nuevaBebida = await axios.post('http://localhost:4000/api/productos/bebidas', datosFormulario, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                console.log(nuevaBebida);
                setModalShow(false)
                refrescar(oldKey => oldKey + 1);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (categorias && //Solo renderiza despues de obtener las categorias
        <React.Fragment>
            <FormBebidasView
                show={modalShow}
                handleGuardar={handleGuardar}
                onHide={() => setModalShow(false)}
                categorias={categorias}
                bebida={bebida}
            />
        </React.Fragment>

    )
}
export default FormBebidasContainer
