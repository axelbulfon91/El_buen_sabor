import React, { useState, useEffect } from 'react'
import DetalleSemielaboradoView from './DetalleSemielaboradoView'
import axios from 'axios'


const DetalleSemielaboradoContainer = ({ producto, showModalDetalleSemielaborado, setShowModalDetalleSemielaborado}) => {
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
            <DetalleSemielaboradoView
                show={showModalDetalleSemielaborado}
                producto={producto}
                onHide={() => setShowModalDetalleSemielaborado(false)}
                existencias={existencias}
            />
        </React.Fragment>
    )
}

export default DetalleSemielaboradoContainer

