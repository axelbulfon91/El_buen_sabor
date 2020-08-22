import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FormSemielaboradosView from './FormSemielaboradosView'

const FormSemielaboradosContainer = ({ refrescar, semielaborado, modalShow, setModalShow }) => {
    const [categorias, setCategorias] = useState('');
    const [insumos, setInsumos] = useState(null);
    useEffect(() => {//Obtengo las Categorias 
        const fetchData = async () => {
            const categoriasResult = await axios('http://localhost:4000/api/productos/categorias');
            const insumosResult = await axios('http://localhost:4000/api/productos/insumos');

            let categoriasFiltradas = categoriasResult.data.filter(categoria => {
                return categoria.tipo === 'semielaborados'
            })

            setCategorias(categoriasFiltradas);
            setInsumos(insumosResult.data);
        };
        fetchData();
        //Verifico si es edicion

    }, [])

    //Manejo del Guardar
    const handleGuardar = async (nombre, nombreImg, categoria, costoFabricacion, stockMaximo, stockMinimo, insumos) => {
        const datosFormulario = new FormData();
        datosFormulario.append('nombre', nombre);
        datosFormulario.append('imagen', nombreImg);
        datosFormulario.append('categoria', categoria);
        datosFormulario.append('costoFabricacion', costoFabricacion);
        datosFormulario.append('stockMaximo', stockMaximo);
        datosFormulario.append('stockMinimo', stockMinimo);
        datosFormulario.append('insumos', JSON.stringify(insumos));//Pasar arreglo a String para enviar por FormData

        if (semielaborado) {
            try {
                const nuevoSemielaborado = await axios.put(`http://localhost:4000/api/productos/semielaborados/${semielaborado.id}`, datosFormulario, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                console.log(nuevoSemielaborado);
                setModalShow(false)
                refrescar(oldKey => oldKey + 1);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const nuevoSemielaborado = await axios.post('http://localhost:4000/api/productos/semielaborados', datosFormulario, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                console.log(nuevoSemielaborado);
                setModalShow(false)
                refrescar(oldKey => oldKey + 1);
            } catch (error) {
                console.log(error);
            }
        }


    }
    return (insumos && categorias && //Solo renderiza despues de obtener las categorias e insumos
        <React.Fragment>
            <FormSemielaboradosView
                show={modalShow}
                handleGuardar={handleGuardar}
                onHide={() => setModalShow(false)}
                categorias={categorias}
                insumos={insumos}
                semielaborado={semielaborado}
            />
        </React.Fragment>
    )
}

export default FormSemielaboradosContainer