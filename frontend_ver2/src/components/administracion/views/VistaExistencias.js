import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionAdmin from '../uso_compartido/NavegacionAdmin';
import SelectTipoStock from '../abm_stock/SelectTipoStock'
import ExistenciasAltaContainer from '../abm_stock/ExistenciasAltaContainer'
import TablaExistencias from '../abm_stock/TablaExistencias'
import FiltroPorNombre from '../abm_stock/FiltroPorNombre'



const VistaExistencias = () => {
    const [tipoStock, setTipoStock] = useState("todas");
    const [existencias, setExistencias] = useState(null)
    const [existenciasFiltradas, setExistenciasFiltradas] = useState(null)
    const [refreshToken, setRefreshToken] = useState(0)
    const [modalShowAltaExistencia, setModalShowAltaExistencia] = useState(false);


    useEffect(() => {
        const fetchExistencias = async () => {
            try {
                const existenciasResult = await axios.get("http://localhost:4000/api/productos/existencias")
                const result = existenciasResult.data;
                const ordenados = result.sort((a,b) => {                
                        if (a.id < b.id) {
                          return 1;
                        }
                        if (a.id > b.id) {
                          return -1;
                        }
                        return 0;
                })
                setExistencias(ordenados)
                setExistenciasFiltradas(ordenados)

            } catch (error) {
                console.log(error);
            }
        }
        fetchExistencias();
    }, [refreshToken])
    useEffect(() => {
        existencias && filtrarTipoStock(tipoStock)

    }, [existencias])

    const filtrarTipoStock = (tipo) => {
        const existenciasAux = existencias.filter(ex => {
            return ex.Articulo.Categorium.tipo === tipo;
        })
        tipo === "todas" ? setExistenciasFiltradas(existencias) : setExistenciasFiltradas(existenciasAux);
        setTipoStock(tipo)
    }
    const filtrarPorNombre = (nombre) => {
        setExistenciasFiltradas(prevState => prevState.filter((ex) => {//se filtra la lista de los datos originales y se le asigna a listaFiltrada
            return ex.Articulo.nombre.toLowerCase().includes(nombre.toLowerCase());
        }))
        if (nombre === "") {
            filtrarTipoStock(tipoStock);
        }
    }
    return (
        <GridLayoutAdmin>
            <NavegacionAdmin></NavegacionAdmin>
            <div id="columna-2" className="m-5">
                <h1 className="display-4 p-3" style={{borderLeft: "8px solid DarkRed"}}>Administración / <strong>Existencias</strong></h1>
                <div className='d-flex justify-content-between align-items-center'>
                    <SelectTipoStock
                        filtrarTipoStock={filtrarTipoStock}
                        conOpcionTodas={true}
                    ></SelectTipoStock>
                    <Button style={{boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)"}} variant="info" onClick={() => setModalShowAltaExistencia(true)}>
                        <i className='fa fa-plus'></i> Crear Nueva Existencia
                    </Button>
                </div>
                <div>
                    <FiltroPorNombre filtrarLista={filtrarPorNombre}></FiltroPorNombre>
                </div>
                <div className="scrollable">
                    <TablaExistencias 
                    existencias={existenciasFiltradas} 
                    conNombre={true} 
                    conEliminar={true}
                    refrescarExistencias={() => setRefreshToken(prevState => prevState = prevState + 1)}
                    ></TablaExistencias>
                </div>
            </div>
            { //Renderizado Condicional del Modal
                modalShowAltaExistencia && <ExistenciasAltaContainer
                    refrescarExistencias={() => setRefreshToken(prevState => prevState = prevState + 1)}
                    modalShow={modalShowAltaExistencia}
                    setModalShow={setModalShowAltaExistencia}
                ></ExistenciasAltaContainer>
            }

        </GridLayoutAdmin>
    )
}

export default VistaExistencias
