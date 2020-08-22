import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'


const SelectCategorias = ({ filtrarPorCategoria }) => {
    //Seteo las categorías de los Elaborados luego del primer render
    const [categorias, setCategorias] = useState(null)
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const catResult = await axios.get("http://localhost:4000/api/productos/categorias");
                const catFiltradas = catResult.data.filter(cat => cat.tipo === "elaborados")
                setCategorias(catFiltradas);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategorias();
    }, [])

    return <Form.Group>
        <Form.Label>Filtrar por Categoría: </Form.Label>
        <Form.Control as="select" onChange={(e) => filtrarPorCategoria(e.target.value)}>
            <option value="todas">Todas</option>
            {categorias && categorias.map(cat => {
                return <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
            })}
        </Form.Control>
    </Form.Group>
}

export default SelectCategorias
