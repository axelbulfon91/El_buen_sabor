import React, { useState, useEffect } from 'react'
import DetalleBebidaView from './DetalleBebidaView'
import axios from 'axios'


const DetalleBebidaContainer = ({ producto, showModalDetalleBebida, setShowModalDetalleBebida}) => {
    
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
            <DetalleBebidaView
                show={showModalDetalleBebida}
                producto={producto}
                onHide={() => setShowModalDetalleBebida(false)}
                existencias={existencias}
            />
        </React.Fragment>
    )
}

export default DetalleBebidaContainer

