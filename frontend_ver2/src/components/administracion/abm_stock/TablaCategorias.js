import React, { Fragment, useState } from 'react'
import { Button, Table, Image, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import ModalBotonEliminar from './ModalBotonEliminar'


const TablaCategorias = ({ categorias, refrescarCategorias }) => {
    const [idCategoria, setidCategoria] = useState(null)
    //Estado Modal Eliminar
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const handleCloseModalEliminar = () => setShowModalEliminar(false);
    const handleShowModalEliminar = async (id) => {
        await setidCategoria(id)
        setShowModalEliminar(true);
    };
    const handleEliminar = async (id) => {
        let url = `http://localhost:4000/api/productos/categorias/${id}`;
        try {
            const borrada = await axios.delete(url);
            refrescarCategorias();
            console.log(borrada.data);
        } catch (e) {
            console.log(e);
        }
        handleCloseModalEliminar();
    }
    const devolverImagen = (tipo) => {
        if (tipo === "insumos") {
            return <Image thumbnail style={{maxHeight: "70px"}}  src={`http://localhost:4000/imgs/insumos2.jpg`}></Image>
        } else if (tipo === "semielaborados") {
            return <Image  thumbnail style={{maxHeight: "70px"}} src={`http://localhost:4000/imgs/semielaborados1.jpg`}></Image>
        } else if (tipo === "elaborados"){
            return <Image thumbnail style={{maxHeight: "70px"}} src={`http://localhost:4000/imgs/elaborados1.jpg`}></Image>
        }else{
            return <Image thumbnail style={{maxHeight: "70px"}} src={`http://localhost:4000/imgs/bebidas1.jpg`}></Image>
        }
    }
    const devolverCategoria = (categoria) => {
        switch (categoria.tipo) {
            case "insumos":
                return <span className="badge" style={{backgroundColor: "DarkMagenta", color: "white"}}>{categoria.nombre}</span>
            case "semielaborados":
                return <span className="badge" style={{backgroundColor: "DarkOliveGreen", color: "white"}}>{categoria.nombre}</span>
            case "bebidas":
                return <span className="badge" style={{backgroundColor: "DarkSalmon", color: "white"}}> {categoria.nombre}</span>
            case "elaborados":
                return <span className="badge" style={{backgroundColor: "DarkGoldenRod", color: "white"}}>{categoria.nombre}</span>
            default:
                return
        }
    }

    return (
        <Fragment>

            <Table bordered size="sm" striped variant='' hover className='text-center mt-2 lead'>
                <thead className="thead-dark">
                    <tr >
                        <th>#</th>
                        <th>Tipo</th>
                        <th>Nombre</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias && categorias.map((cat,index) => {
                            return <tr key={cat.id} >
                                <td>{index+1}</td>
                                <td >
                                    <Row>
                                        <Col sm={3}>{devolverImagen(cat.tipo)}</Col>
                                        <Col className="align-self-center">{cat.tipo}</Col>
                                    </Row>
                                </td>
                                <td>{devolverCategoria(cat)}</td>
                                <td> <Button size='lg' variant="outline-danger" onClick={(e) => {
                                    handleShowModalEliminar(cat.id)
                                }}><i className='fa fa-times'></i></Button></td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
            {/* MODAL ELIMINAR */}
            {
                showModalEliminar && <ModalBotonEliminar
                    id={idCategoria}
                    handleCloseModalEliminar={handleCloseModalEliminar}
                    showModalEliminar={showModalEliminar}
                    handleEliminar={handleEliminar}
                >
                </ModalBotonEliminar>
            }
        </Fragment>
    )
}

export default TablaCategorias
