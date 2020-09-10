import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionAdminLateral from '../uso_compartido/NavegacionAdminLateral';
import SelectTipoStock from '../abm_stock/SelectTipoStock'
import CategoriasAltaContainer from '../abm_stock/CategoriasAltaContainer'
import TablaCategorias from '../abm_stock/TablaCategorias'
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin';


const VistaCategorias = () => {
    const [tipoStock, setTipoStock] = useState("todas");
    const [categorias, setCategorias] = useState(null)
    const [categoriasFiltradas, setCategoriasFiltradas] = useState(null)
    const [refreshToken, setRefreshToken] = useState(0)
    const [modalShowAltaCategoria, setModalShowAltaCategoria] = useState(false);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categoriasResult = await axios.get("http://localhost:4000/api/productos/categorias")
                setCategorias(categoriasResult.data)
                setCategoriasFiltradas(categoriasResult.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategorias();
    }, [refreshToken])
    useEffect(() => {
        categorias && filtrarTipoStock(tipoStock)

    }, [categorias])

    const filtrarTipoStock = (tipo) => {
        const categoriasAux = categorias.filter(cat => {
            return cat.tipo === tipo;
        })
        tipo === "todas" ? setCategoriasFiltradas(categorias) : setCategoriasFiltradas(categoriasAux);
        setTipoStock(tipo)
    }
    return (
        <>
            <BarraNavegacionAdmin />
            <GridLayoutAdmin>
                <NavegacionAdminLateral></NavegacionAdminLateral>
                <div id="columna-2" className="m-5">
                    <h1 className="display-4 p-3" style={{ borderLeft: "8px solid DarkRed" }}>Administración / <strong>Categorías</strong></h1>
                    <div className='d-flex justify-content-between align-items-center'>
                        <SelectTipoStock
                            filtrarTipoStock={filtrarTipoStock}
                            conOpcionTodas={true}
                            conElaborados={true}
                        ></SelectTipoStock>
                        <Button style={{ boxShadow: "4px 5px 6px -2px rgba(0,0,0,0.62)" }} variant="info" onClick={() => setModalShowAltaCategoria(true)}>
                            <i className='fa fa-plus'></i> Crear Nueva Categoría
                    </Button>
                    </div>
                    <div className="scrollable">
                        <TablaCategorias categorias={categoriasFiltradas} refrescarCategorias={() => setRefreshToken(prevState => prevState = prevState + 1)}></TablaCategorias>
                    </div>
                </div>
                { //Renderizado Condicional del Modal
                    modalShowAltaCategoria && <CategoriasAltaContainer
                        refrescarCategorias={() => setRefreshToken(prevState => prevState = prevState + 1)}
                        modalShow={modalShowAltaCategoria}
                        setModalShow={setModalShowAltaCategoria}
                    ></CategoriasAltaContainer>
                }
            </GridLayoutAdmin>
        </>
    )
}

export default VistaCategorias
