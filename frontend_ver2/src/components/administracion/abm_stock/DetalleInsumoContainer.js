import React, { useState, useEffect } from 'react'
import DetalleInsumoView from './DetalleInsumoView'
import axios from 'axios'


const DetalleInsumoContainer = ({ producto, showModalDetalleInsumo, setShowModalDetalleInsumo }) => {

    const [existencias, setExistencias] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            const resultExistencias = await axios.get(`http://localhost:4000/api/productos/existencias/${producto.Articulo.id}`);
            if (resultExistencias.data[0]) {
                setExistencias(resultExistencias.data.slice(-10));
            }
        }
        fetchData();
    }, [producto])
    return (
        <React.Fragment>
            <DetalleInsumoView
                show={showModalDetalleInsumo}
                producto={producto}
                onHide={() => setShowModalDetalleInsumo(false)}
                existencias={existencias}
            />
        </React.Fragment>
    )
}

export default DetalleInsumoContainer

