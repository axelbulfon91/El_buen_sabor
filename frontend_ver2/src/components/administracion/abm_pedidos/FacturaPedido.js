import React, {createElement, PureComponent} from 'react';

import { jsPDF } from "jspdf";

import axiosAutorizado from '../../../utils/axiosAutorizado';
import jwtDecode from 'jwt-decode';


export default class facturaPDF extends PureComponent{

  constructor(props){
    super(props)

    console.log(props);

    this.state = {
        pedido: props.pedido
    };
  }

  jsPDF = () =>{
    // Default export is a4 paper, portrait, using millimeters for units
    
    let opciones = {
      orientation: 'p',
      unit: 'mm',
      format: [240, 300]
    };
    
    const doc = new jsPDF(opciones);

    // Optional - set properties on the document
    doc.setProperties({
      title: 'Factura del Pedido',
      subject: this.state.pedido.Usuario.nombre,
      author: 'El buen Sabor',
      keywords: 'factura, pedido,El Buen Sabor',
      creator: 'El Buen Sabor'
    });

  
    let HTML = '<html>  \
                <body style="width:100%">  \
                <h4 style="margin:10px; font-size:12px">RECIBO</h4>  \
                <h4 style="margin:10px; font-size:10px">DETALLE&nbsp;RECIBO</h4>  \
                </body>  \
                </html>'

    doc.html(
      HTML,
      {
        callback: function (doc) {
          doc.autoPrint('DOC.pdf')
        }
      });

  }

  generarFactura = async () =>{

    const data = {id_pedido : this.state.pedido.id,
                  id_cajero : JSON.parse(jwtDecode(sessionStorage.getItem("token")).id)}

    const resp = await axiosAutorizado().post('http://localhost:4000/api/facturas/',data);

    console.log(resp.data);

  }



  render(){

    return(<button onClick={this.generarFactura}
      className="d-flex align-items-center justify-content-center"
      style={{ border: "1px solid black", width: "165px", backgroundColor: "#E0C700", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "black", display: "inline-block", fontWeight: "bolder" }}>
      Generar Factura<i className="fa fa-file-upload mr-2"></i>
      </button>)
  }


}