
import React, { useEffect, useState, useContext } from "react";

import TarjetaProducto from './TarjetaProducto';
import { UserContext } from '../../../UserContext';

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import Axios from "axios";

// core components

function SectionCatalogo() {

	const [productos, setProductos] = useState([]);
	const [productosFiltrados, setProductosFiltrados] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [categoriasBebidas, setCategoriasBebidas] = useState([]);
	const { carrito, setCarrito } = useContext(UserContext)
	const [textoFiltrado, setTextoFiltrado] = useState("")


	useEffect(() => {
		obtenerProductos()
		setCarrito(JSON.parse(window.sessionStorage.getItem('carrito')) || [])
	}, [])


	async function obtenerProductos() {

		const resp = await Axios.get("http://localhost:4000/api/productos/elaborados")
		setProductos(resp.data)
		setProductosFiltrados(resp.data)

		const respCat = await Axios.get("http://localhost:4000/api/productos/categorias/catalogo")
		setCategorias(respCat.data.filter(c => c.tipo !== 'bebidas'))
		setCategoriasBebidas(respCat.data.filter(c => c.tipo === 'bebidas'))

	}

	function filtrar(val) {
		if (val === "Todo") {
			setProductosFiltrados(productos)
		} else {
			setProductosFiltrados(productos.filter(p => p.Categorium.nombre === val))
		}

	}

	function buscarPorNombre(val){
		setTextoFiltrado(val)
		setProductosFiltrados(productos.filter(p => p.nombre.toLowerCase().includes(val.toLowerCase())))
	}


	return (
		<>
			<section className="hero-wrap hero-wrap-2"
				style={{ backgroundImage: "url(" + require("assets/img/images/bg_2.jpg") + ")" }}
				data-stellar-background-ratio="0.5">
				<Container >
					<Row className="no-gutters slider-text align-items-end justify-content-center">
						<div className="col-md-9 ftco-animate text-center">
							<h1 className="mb-2 bread text-center">Menú</h1>
						</div>
						<div
							className="moving-clouds"
							style={{
								backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
								backgroundColor: "rgba(0,0,0,0.5)"
							}}
						/>
					</Row>
				</Container>
			</section>

			<section className="ftco-section">
				<Container>
					<div className="ftco-search">
						<Row>
							
						</Row>
						<Row>
						<input value={textoFiltrado} onChange={(e)=> buscarPorNombre(e.target.value)} className="form-control mb-3" type="text" placeholder="Buscar por nombre"/>
							<Col md="12" className="nav-link-wrap">
								<div className="d-flex text-center">
									<button onClick={(e) => filtrar(e.target.value)} value={'Todo'} className="btn btn-primary ftco-animate mr-2">Todo</button>
									{categorias.map(cat => {
										return <button key={cat.id} onClick={(e) => filtrar(e.target.value)} value={cat.nombre} className="mx-2 btn btn-primary ftco-animate">{cat.nombre}</button>
									})}

									<select id="SelectBebidas" onChange={(e) => filtrar(e.target.value)} className="btn btn-primary ml-2 ftco-animate">
										<option hidden defaultValue="" className="mx-2 btn btn-primary">Bebidas</option>
										{categoriasBebidas.map(catB => {
											return <option key={catB.id} className="mx-2 btn btn-primary ftco-animate" value={catB.nombre}>{catB.nombre}</option>
										})}
									</select>
								</div>
							</Col>
						</Row>
						<Row>
							{productosFiltrados.length !== 0 ?

								<div className="card-columns">

									{productosFiltrados.map(producto => {

										return <TarjetaProducto

											key={producto.id}
											id={producto.id}
											nombre={producto.nombre}
											detalle={producto.detalle}
											nombreImg={producto.nombreImg}
											precio={producto.precio}
											tiempoElaboracion={producto.tiempoElaboracion}

										/>
									})}

								</div>

								:
								<h1>Sin productos que mostrar</h1>
							}
						</Row>
					</div>
				</Container>
			</section>
		</>
	);
}

export default SectionCatalogo;
