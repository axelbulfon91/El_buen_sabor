import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import estilos from '../../assets/css/SeccionProductos.module.css'
import axios from 'axios';
import TarjetaCatalogo from './TarjetaCatalogo';
import ModalDetalleCatalogo from './ModalDetalleCatalogo';



const SeccionProductos = () => {

    const [bebidas, setBebidas] = useState(null);
    const [elaborados, setElaborados] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [ofertas, setOfertas] = useState(null);
    //Manejo Modal Detalle
    const [showModalDetalle, setShowModalDetalle] = useState(false)
    const [tipoProductoSeleccionado, setTipoProductoSeleccionado] = useState(null);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null)
    useEffect(() => {
        const traerDatos = async () => {
            const resultElaborados = await axios.get("http://localhost:4000/api/productos/elaborados");
            const resultBebidas = await axios.get("http://localhost:4000/api/productos/bebidas");
            const resultCategorias = await axios.get("http://localhost:4000/api/productos/categorias");
            const resultOfertas = await axios.get("http://localhost:4000/api/productos/ofertas");
            setElaborados(resultElaborados.data);
            setBebidas(resultBebidas.data);
            setOfertas(resultOfertas.data);
            const categoriasFiltradas = [];
            resultCategorias.data.forEach(cat => {
                if (cat.tipo === "elaborados") {
                    categoriasFiltradas.push(cat);
                }
            })
            resultCategorias.data.forEach(cat => {
                if (cat.tipo === "bebidas") {
                    categoriasFiltradas.push(cat);
                }
            })
            setCategorias(categoriasFiltradas);
        }
        traerDatos();
    }, [])
    const handleShowModalDetalle = async (tipoProducto, producto, oferta) => {
        setTipoProductoSeleccionado(tipoProducto);
        setProductoSeleccionado(producto);
        setOfertaSeleccionada(oferta);
        setShowModalDetalle(true);
    }

    return (
        <>
            <div className={estilos.fondo}>
                <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                    <nav className={estilos.nav}>
                        <ul>
                            {categorias && categorias.map(cat => {
                                return <li key={cat.id}><a href={"#" + cat.nombre}>{cat.nombre}</a></li>
                            })}
                        </ul>
                    </nav>
                    {categorias.map(cat => {
                        if (cat.tipo === "elaborados") {
                            return <div key={cat.id} style={{ marginBottom: "40px" }}>
                                <h3 className={classnames("display-5", estilos.titulo)} id={cat.nombre}>{cat.nombre}</h3>
                                <div className="d-flex justify-content-start flex-wrap mb-3 mt-3">
                                    {elaborados && elaborados.map(el => {
                                        if (el.Categorium.id === cat.id) {
                                            let oferta = null;
                                            ofertas && ofertas.forEach(of => {
                                                if (of.elaborado) {
                                                    if (of.elaborado.id === el.id) {
                                                        oferta = of;
                                                    }
                                                }
                                            })
                                            return <TarjetaCatalogo key={el.id} elaborado={el} oferta={oferta} handleShowModalDetalle={handleShowModalDetalle} />
                                        }
                                    })}
                                </div>
                            </div>
                        }
                    })}
                    {categorias.map(cat => {
                        if (cat.tipo === "bebidas") {
                            return <div key={cat.id}>
                                <h3 className={classnames("display-5", estilos.titulo)} id={cat.nombre}>{cat.nombre}</h3>
                                <div className="d-flex justify-content-start flex-wrap mb-3 mt-3">
                                    {bebidas && bebidas.map(beb => {
                                        if (beb.Articulo.Categorium.id === cat.id) {
                                            let oferta = null;
                                            ofertas && ofertas.forEach(of => {
                                                if (of.bebida) {
                                                    if (of.bebida.id === beb.id) {
                                                        oferta = of;
                                                    }
                                                }
                                            })
                                            return <TarjetaCatalogo key={beb.id} bebida={beb} oferta={oferta} handleShowModalDetalle={handleShowModalDetalle} />
                                        }
                                    })}
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
            {showModalDetalle && <ModalDetalleCatalogo
                tipoProducto={tipoProductoSeleccionado}
                producto={productoSeleccionado}
                oferta={ofertaSeleccionada}
                onHide={() => setShowModalDetalle(false)}
                show={showModalDetalle}
            ></ModalDetalleCatalogo>}
        </>
    )
}

export default SeccionProductos