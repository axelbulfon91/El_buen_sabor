import React, { Fragment, useState, useEffect } from 'react'
import TablaProductos from '../abm_stock/TablaProductos'
import useDataApi from '../uso_compartido/useDataApi'
import FormInsumosContainer from '../abm_stock/FormInsumosContainer';
import FormBebidasContainer from '../abm_stock/FormBebidasContainer';
import FormSemielaboradosContainer from '../abm_stock/FormSemielaboradosContainer';
import { Button } from 'react-bootstrap';
import FiltroPorNombre from '../abm_stock/FiltroPorNombre'
import NavegacionAdmin from '../uso_compartido/NavegacionAdmin';
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionPestanias from '../abm_stock/NavegacionPestanias';


const VistaStock = () => {
    //Estado inicial de la Vista
    const [productosUrl] = useState('http://localhost:4000/api/productos/insumos')
    const [{ data, isLoading, isError }, setUrl, setRefreshKey] = useDataApi(productosUrl)
    const [listaFiltrada, setListaFiltrada] = useState(null)
    //Codigo para manejar modal del Insumo
    const [modalShowInsumo, setModalShowInsumo] = useState(false);
    const [insumo, setInsumo] = useState(null);
    //Codigo para manjear modal del Bebidas
    const [modalShowBebida, setModalShowBebida] = useState(false);
    const [bebida, setBebida] = useState(null);
    //Codigo para manjear modal del Semielaborados
    const [modalShowSemielaborado, setModalShowSemielaborado] = useState(false);
    const [semielaborado, setSemielaborado] = useState(null);

    ///////////RENDERIZACION CONDICIONAL POR TIPO DE STOCK ////////////////
    useEffect(() => {
        document.title = "GT/BackOffice"//Cuando se completa la carga de data se actualiza la listaFiltrada que se pasa a la tabla
        setListaFiltrada(data)
    }, [data])

    const [tipoStock, setTipoStock] = useState('insumos');

    const filtrarNombre = (nombre) => {
        setListaFiltrada(data.filter((prod) => {//se filtra la lista de los datos originales y se le asigna a listaFiltrada
            return prod.Articulo.nombre.toLowerCase().includes(nombre.toLowerCase());
        }))
    }
    const filtrarTipoStock = (tipo) => {
        switch (tipo) {
            case "insumos":
                setUrl('http://localhost:4000/api/productos/insumos')
                setTipoStock('insumos');
                break;
            case "semielaborados":
                setUrl('http://localhost:4000/api/productos/semielaborados')
                setTipoStock('semielaborados');
                break;
            case "bebidas":
                setUrl('http://localhost:4000/api/productos/bebidas')
                setTipoStock('bebidas');
                break;
            default:
                break;
        }
    }

    const abrirFormulario = async (producto) => {
        switch (tipoStock) {
            case "insumos":
                if (!producto) {
                    await setInsumo(null);
                    setModalShowInsumo(true);
                } else {
                    await setInsumo(producto);
                    setModalShowInsumo(true);
                }
                break;
            case "semielaborados":
                if (!producto) {
                    await setSemielaborado(null);
                    setModalShowSemielaborado(true);
                } else {
                    await setSemielaborado(producto);
                    setModalShowSemielaborado(true);
                }
                break;
            case "bebidas":
                if (!producto) {
                    await setBebida(null);
                    setModalShowBebida(true);
                } else {
                    await setBebida(producto);
                    setModalShowBebida(true);
                }
                break;
            default:
                break;
        }
    }
    let FormularioModal = null;
    if (tipoStock === 'insumos') {
        FormularioModal = <FormInsumosContainer
            refrescar={setRefreshKey}
            insumo={insumo}
            modalShow={modalShowInsumo}
            setModalShow={setModalShowInsumo}>
        </FormInsumosContainer>
    } else if (tipoStock === 'bebidas') {
        FormularioModal = <FormBebidasContainer
            refrescar={setRefreshKey}
            bebida={bebida}
            modalShow={modalShowBebida}
            setModalShow={setModalShowBebida}>
        </FormBebidasContainer>
    } else {
        FormularioModal = <FormSemielaboradosContainer
            refrescar={setRefreshKey}
            semielaborado={semielaborado}
            modalShow={modalShowSemielaborado}
            setModalShow={setModalShowSemielaborado}>
        </FormSemielaboradosContainer>
    }
    return (
        <Fragment>
            <GridLayoutAdmin>
                {/* COLUMNA 1 */}
                <NavegacionAdmin />
                {/* COLUMNA 2 */}

                <div id="columna-2" className="m-5">
                    <h1 className="display-4 p-3" style={{ borderLeft: "8px solid DarkRed" }}>Administración / <strong>Stock</strong></h1>
                    <div className='d-flex justify-content-between align-items-center'>

                        <FiltroPorNombre filtrarLista={filtrarNombre}></FiltroPorNombre>
                        <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)", width: "14%", marginBottom: "9px" }} variant="info" onClick={() => abrirFormulario()}>
                            <i className='fa fa-plus'></i> Crear Nuevo</Button>
                    </div>
                    <div className='d-flex justify-content-between align-items-'>
                        <NavegacionPestanias filtrarTipoStock={filtrarTipoStock}></NavegacionPestanias>
                    </div>
                    <div className="scrollable">
                        {isError && <div>Something went wrong ...</div>}
                        {isLoading && <div>Loading...</div>}
                        {listaFiltrada &&
                            <TablaProductos
                                productos={listaFiltrada}
                                refrescar={setRefreshKey}
                                tipoStock={tipoStock}
                                abrirFormulario={abrirFormulario}
                            ></TablaProductos>}
                    </div>
                </div>
            </GridLayoutAdmin>
            {/* //RENDERIZACION CONDICIONAL DEL MODAL DE STOCK */}
            {FormularioModal}
        </Fragment>
    )
}

export default VistaStock
