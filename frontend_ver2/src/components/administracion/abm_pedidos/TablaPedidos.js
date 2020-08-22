import React, {Fragment, useState} from 'react'
import {Table} from 'react-bootstrap'
import {format} from 'date-fns'


const TablaPedidos = ({pedidos}) => {


    const devolverEstado = (estado) => {
      switch (estado) {
          case "pendiente":
              return <span style={{border: "1px solid black", width: "135px" ,backgroundColor:"DarkSalmon", borderRadius: "15px", padding: "6px", margin: "5px 0px", color:"white",  display:"inline-block", fontWeight:"bolder"}}>Pendiente</span>
          case "confirmado":
              return <span style={{border: "1px solid black",width: "135px", backgroundColor:"DarkTurquoise", borderRadius: "15px", padding: "6px", margin: "5px 0px", color:"white",  display:"inline-block", fontWeight:"bolder"}}>Confirmado</span>
          case "demorado":
              return <span style={{border: "1px solid black",width: "135px", backgroundColor:"DarkOrchid", borderRadius: "15px", padding: "6px", margin: "5px 0px", color:"white",  display:"inline-block", fontWeight:"bolder"}}>Demorado</span>
          case "listo":
              return <span style={{border: "1px solid black",width: "135px", backgroundColor:"DarkSeaGreen", borderRadius: "15px", padding: "6px", margin: "5px 0px", color:"white",  display:"inline-block", fontWeight:"bolder"}}>Listo</span>
          case "entregado":
              return <span style={{border: "1px solid black",width: "135px", backgroundColor:"DeepSkyBlue", borderRadius: "15px", padding: "6px", margin: "5px 0px", color:"white",  display:"inline-block", fontWeight:"bolder"}}>Entregado</span>
          case "cancelado":
              return <span style={{border: "1px solid black",width: "135px", backgroundColor:"Crimson", borderRadius: "15px", padding: "6px", margin: "5px 0px", color:"white",  display:"inline-block", fontWeight:"bolder"}}>Cancelado</span>
      
          default:
              break;
      }
    }
    return (
        <Fragment>
            <Table className="text-center lead" striped hover size="sm">
                <thead className="thead-dark">
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Id Pedido</th>
                    <th>Cliente</th>
                    <th>Tipo de Retiro</th>
                    <th>Estado</th>
                </thead>
                <tbody>
                     {pedidos && pedidos.map(pedido => {
                         return <tr key={pedido.id}>
                                <td>{format(new Date(pedido.createdAt), "dd/MM/yy")}</td>
                                <td>{format(new Date(pedido.createdAt), "hh:mm")}</td>
                                <td>{pedido.id}</td>
                                <td>{pedido.Usuario.nombre}</td>
                                <td>{pedido.tipoRetiro===0?"Delivery":"Retiro Por Local"}</td>
                                <td>{devolverEstado(pedido.estado)}</td>
                         </tr>
                     })}
                </tbody>
            </Table>
        </Fragment>
    )
}

export default TablaPedidos
