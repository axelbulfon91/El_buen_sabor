import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../../../UserContext";
import Axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
// toast.configure()
function TarjetaProducto(props) {

    const { carrito, setCarrito } = useContext(UserContext);
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [cant, setCant] = useState(1)
    var carritoAux = carrito   
    

    async function agregarProducto(id) {
        const resp = await Axios.get("http://localhost:4000/api/productos/elaborados/" + id)        
        resp.data.precio = resp.data.precio.toFixed(2)
        setModal(!modal)
        setProducto(resp.data)
    }    

    const toggle = () => setModal(!modal);

    function mensaje() {
        toast.success('Producto agregado al carrito', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    const confirmarCantidad = valor => {
        
        setCant(parseInt(valor))
        
    }

    function confirmar(){
        console.log(carrito)
        const productoAgregado = {
            producto: producto,
            cantidad: cant
        }
        carritoAux.push(productoAgregado)
        setCarrito(carritoAux)
        toggle()
        window.sessionStorage.setItem('carrito', JSON.stringify(carrito));
        mensaje();
        
    }


    return (

        <React.Fragment>

            <div className="card" style={{ width: '20rem' }}>
                <img className="card-img-top img-fluid" src={"http://localhost:4000/imgs/1590273014178.jpg"} alt="Card image cap"></img>
                <div className="card-body text-center">
                    <h4 className="card-title">{props.nombre}</h4>
                    <p className="card-text mt-2" style={{ color: 'black' }}>
                        Ingredientes: <br />
                        {props.detalle}</p>
                    <Link to={"/Detalle/" + props.id} className="btn btn-outline-secondary mb-2">Ver detalle</Link>
                    <br />
                    <button onClick={() => agregarProducto(props.id)} className="btn btn-success">Pedir<span><h4 className="mx-auto text-light"><b>$ {props.precio.toFixed(2)}</b></h4></span></button>

                </div>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Indique cantidad y confirme</ModalHeader>
                <ModalBody>
                    Ingrese la cantidad deseada:
                     <input value={cant} onChange={e => confirmarCantidad(e.target.value)} className="ml-2" type="number" placeholder="1"/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={confirmar}>Confirmar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>


    )
}

export default TarjetaProducto
