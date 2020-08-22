import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FormElaboradoView from './FormElaboradoView'


const FormElaboradoContainer = ({ refrescar, elaborado, modalShow, setModalShow }) => {
    const [categorias, setCategorias] = useState('');
    const [ingredientes, setIngredientes] = useState(null);
  
    useEffect(() => {//Obtengo las Categorias 
        const fetchData = async () => {
            const categoriasResult = await axios('http://localhost:4000/api/productos/categorias');
            const insumosResult = await axios('http://localhost:4000/api/productos/insumos');
            const semielaboradosResult = await axios('http://localhost:4000/api/productos/semielaborados');

            let categoriasFiltradas = categoriasResult.data.filter(categoria => {
                return categoria.tipo === 'elaborados'
            })
            setCategorias(categoriasFiltradas);
            let ingredientesResult = []
            await insumosResult.data.forEach(ins => ingredientesResult.push(ins));
            await semielaboradosResult.data.forEach(sem => ingredientesResult.push(sem));
            setIngredientes(ingredientesResult)
        };
        fetchData();
        //Verifico si es edicion

    }, [])

    //Manejo del Guardar
    const handleGuardar = async (nombre, nombreImg, categoria, precio, tiempoElaboracion, detalle, esCatalogo, ingredientes) => {
        const datosFormulario = new FormData();
        datosFormulario.append('nombre', nombre);
        datosFormulario.append('imagen', nombreImg);
        datosFormulario.append('categoria', categoria);
        datosFormulario.append('precio', precio);
        datosFormulario.append('tiempoElaboracion', tiempoElaboracion);
        datosFormulario.append('esCatalogo', esCatalogo);
        datosFormulario.append('detalle', detalle);
        datosFormulario.append('detalles', JSON.stringify(ingredientes));//Pasar arreglo a String para enviar por FormData
        console.log(JSON.stringify(ingredientes));
        if (elaborado) {
            try {
                const nuevoElaborado = await axios.put(`http://localhost:4000/api/productos/elaborados/${elaborado.id}`, datosFormulario, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                console.log(nuevoElaborado);
                setModalShow(false)
                refrescar(oldKey => oldKey + 1);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const nuevoElaborado = await axios.post('http://localhost:4000/api/productos/elaborados', datosFormulario, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                console.log(nuevoElaborado);
                setModalShow(false)
                refrescar(oldKey => oldKey + 1);
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (ingredientes && categorias &&//Solo renderiza despues de obtener las categorias, insumos y semielaborados
        <React.Fragment>
            <FormElaboradoView
                show={modalShow}
                handleGuardar={handleGuardar}
                onHide={() => setModalShow(false)}
                categorias={categorias}
                ingredientes={ingredientes}
                elaborado={elaborado}
                setIngredientes={setIngredientes}
            />
        </React.Fragment>
    )
}

export default FormElaboradoContainer
