import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'

const NavegacionPestanias = ({filtrarTipoStock}) => {
    return (
        <Tabs variant="tabs" defaultActiveKey="insumos" onSelect={(e)=> filtrarTipoStock(e)}>
            <Tab eventKey="insumos" title="Insumos" className="text-decoration-none">              
            </Tab>
            <Tab eventKey="bebidas" title="Bebidas">             
            </Tab>
            <Tab eventKey="semielaborados" title="Semielaborados">              
            </Tab>

        </Tabs>
    )
}
export default NavegacionPestanias
