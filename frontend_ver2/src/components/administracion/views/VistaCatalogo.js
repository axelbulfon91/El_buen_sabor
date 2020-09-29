import React, { useState, Fragment, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin'
import NavegacionAdminLateral from '../uso_compartido/NavegacionAdminLateral'
import FiltroPorNombre from '../abm_stock/FiltroPorNombre'
import TablaElaborados from '../abm_catalogo/TablaElaborados'
import FormElaboradoContainer from '../abm_catalogo/FormElaboradoContainer'
import SelectCategorias from '../abm_catalogo/SelectCategorias'
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin'


const VistaCatalogo = () => {
    //Estado inicial de la Vista
    const [refreshKey, setRefreshKey] = useState(0)
    const [data, setData] = useState([])
    const [listaFiltrada, setListaFiltrada] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    //Codigo para manejar modal del Elaborado
    const [modalShowElaborado, setModalShowElaborado] = useState(false);
    const [elaborado, setElaborado] = useState(null);
    //Cuando se completa la carga de data se actualiza la listaFiltrada que se pasa a la tabla
    useEffect(() => {
        const fetchCatalogo = async () => {
            const productosUrl = 'http://localhost:4000/api/productos/elaborados'
            try {
                const catalogoResult = await axios.get(productosUrl);
                const result = catalogoResult.data;
                const ordenados = result.sort((a, b) => {
                    if (a.id < b.id) {
                        return 1;
                    }
                    if (a.id > b.id) {
                        return -1;
                    }
                    return 0;
                })
                setData(ordenados)
                setListaFiltrada(ordenados)
                console.log(ordenados)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCatalogo();
    }, [refreshKey])


    //Manejor del Filtro por Categorías
    const [categoriaElegida, setCategoriaElegida] = useState("todas")

    const filtrarPorCategoria = (categoria) => {
        if (categoria === "todas") {
            setCategoriaElegida(categoria)
            setListaFiltrada(data);
        } else {
            setCategoriaElegida(categoria)
            const listaFiltrada = data.filter(el => el.Categorium.nombre === categoria);
            setListaFiltrada(listaFiltrada);
        }
    }
    //se filtra la lista de los datos originales y se le asigna a listaFiltrada
    const filtrarNombre = (nombre) => {
        setListaFiltrada(prevState => prevState.filter((elab) => {//se filtra la lista de los datos originales y se le asigna a listaFiltrada
            return elab.nombre.toLowerCase().includes(nombre.toLowerCase());
        }))
        if (nombre === "") {
            filtrarPorCategoria(categoriaElegida);
        }
    }


    const abrirFormulario = async (elaboradoElegido) => {
        if (elaboradoElegido) {//El comando viene del botón editar
            setElaborado(elaboradoElegido);
            setModalShowElaborado(true)
        } else {
            setElaborado(null);
            setModalShowElaborado(true)
        }
    }

    return (
        <Fragment>
            <BarraNavegacionAdmin />
            <GridLayoutAdmin>
                {/* COLUMNA 1 */}
                <NavegacionAdminLateral />
                {/* COLUMNA 2 */}
                <div id="columna-2" className="m-5">
                    <h1 className="display-4 p-3" style={{ borderLeft: "8px solid DarkRed" }}>Administración / <strong>Catálogo</strong></h1>
                    <div className='d-flex justify-content-between align-items-center'>
                        <SelectCategorias filtrarPorCategoria={filtrarPorCategoria}></SelectCategorias>
                        <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} variant="info" onClick={() => abrirFormulario()}>
                            <i className='fa fa-plus'></i> Crear Nuevo</Button>
                    </div>
                    <div>
                        <FiltroPorNombre filtrarLista={filtrarNombre}></FiltroPorNombre>
                    </div>
                    <div className="scrollable">
                        {isError && <div>Something went wrong ...</div>}
                        {isLoading && <div>Loading...</div>}
                        {listaFiltrada &&
                            <TablaElaborados
                                elaborados={listaFiltrada}
                                refrescar={setRefreshKey}
                                abrirFormulario={abrirFormulario}
                            ></TablaElaborados>}
                    </div>
                </div>
            </GridLayoutAdmin>
            {/* //RENDERIZACION CONDICIONAL DEL MODAL DE STOCK */}
            {
                <FormElaboradoContainer
                    refrescar={setRefreshKey}
                    elaborado={elaborado}
                    modalShow={modalShowElaborado}
                    setModalShow={setModalShowElaborado}>
                </FormElaboradoContainer>
            }
        </Fragment>
    )
}


export default VistaCatalogo
