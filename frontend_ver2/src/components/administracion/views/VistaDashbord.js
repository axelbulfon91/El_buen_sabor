import React from 'react'
import BarraNavegacionAdmin from '../uso_compartido/BarraNavegacionAdmin'
import { GridLayoutAdmin } from '../uso_compartido/GridLayoutAdmin';
import NavegacionAdminLateral from '../uso_compartido/NavegacionAdminLateral';


const VistaDashbord = () => {
    return (
        <>
            <BarraNavegacionAdmin />
            <GridLayoutAdmin>
                {/* COLUMNA 1 */}
                <NavegacionAdminLateral />
                {/* COLUMNA 2 */}

                <div id="columna-2" className="m-5">
                    <h1>Dashborad </h1>
                </div>
            </GridLayoutAdmin>
        </>

    )
}

export default VistaDashbord
