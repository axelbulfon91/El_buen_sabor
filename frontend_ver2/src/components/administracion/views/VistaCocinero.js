import React, { useState } from 'react'
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin';
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionCocineroLateral from '../uso_compartido/NavegacionCocineroLateral';
import PedidosCocinero from './componentes/PedidosCocinero';
import CatalogoCocinero from './componentes/CatalogoCocinero';




const VistaCocinero = () => {
    const [vistaRenderizada, setVistaRenderizada] = useState("pedidos")

    const devolverVistaRenderizada = (vistaRenderizada) => {
        switch (vistaRenderizada) {
            case "pedidos":
                return <PedidosCocinero />
                break;
            case "catalogo":
                return <CatalogoCocinero />
                break;

            default:
                break;
        }
    }

    return (
        <>
            <BarraNavegacionAdmin />
            <GridLayoutAdmin>
                {/* COLUMNA 1 */}
                <NavegacionCocineroLateral setVistaRenderizada={setVistaRenderizada} />
                {/* COLUMNA 2 */}
                {devolverVistaRenderizada(vistaRenderizada)}
            </GridLayoutAdmin>
        </>
    )
}

export default VistaCocinero
