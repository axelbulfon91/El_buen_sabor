import React, { createElement, PureComponent } from 'react';

import { jsPDF } from "jspdf";

import axiosAutorizado from '../../../utils/axiosAutorizado';
import jwtDecode from 'jwt-decode';


export default class facturaPDF extends PureComponent {

  constructor(props) {
    super(props)

    console.log(props);

    this.state = {
      pedido: props.pedido
    };
  }

  jsPDF = (Factura) => {


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

    let date = new Date(Factura.createdAt);
    let fecha_factura = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();//prints expected format.

    let HTML = '<html>  \
                <body style="margin: 30px;\
                background-color: #eaeaea;\
                color: #555555;">  \
                <div style="margin: 0 auto 30px;\
                width: 240px;\
                padding-bottom: 30px;  border-radius:5px;">\
                <table style="background-color:#9ACD32; width: 100%;">\
                <tr>\
                    <td width="50%" nowrap rowspan="4">\
                        <h3 style="font-size: 9px; color:#fff; padding-left:15px;">EL BUEN SABOR</h3>\
                    </td>\
                </tr>\
                <tr>\
                    <td align="right" style="padding-right:15px;">\
                        <span style="font-size: 6px;\
                        font-weight: normal;\
                        color: #fff;\
                        text-transform: uppercase;">Factura&nbsp;nº'+ Factura.id + '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td align="right" style="padding-right:15px;">\
                        <span style="font-size: 6px;\
                        font-weight: normal;\
                        color: #fff;\
                        text-transform: uppercase;">'+ fecha_factura + '</span>\
                    </td>\
                </tr>\
            </table>\
            <table style="width: 100%; margin: 0 10px 10px; float: left;" cellspacing="0">\
                <tr>\
                    <td>\
                        <div style="font-size: 6px;\
                        font-weight: normal;\
                        color: #000;">\
                            &nbsp;<br />\
                            <strong>Nombre de Cliente</strong><br />\
                            '+ this.state.pedido.Usuario.nombre.replace(" ", "&nbsp;") + '<br />\
                            Cliente n°'+ this.state.pedido.Usuario.id + '<br />\
                            &nbsp;<br />';

    if (this.state.pedido.tipo_retiro == 0) {
      let domicilio = JSON.parse(this.state.pedido.domElegido);
      HTML = HTML + '<strong>Dirección</strong><br />\
                              '+ domicilio.calle.replace(" ", "&nbsp;") + '&nbsp;' + domicilio.numeracion + '<br />\
                              '+ domicilio.nombreLocalidad + ', Mendoza<br />\
                              Detalle:&nbsp; '+ domicilio.detalle_adicional.replace(" ", "&nbsp;") + '<br />\
                              &nbsp;<br />';
    } else {
      HTML = HTML + '<strong>Dirección</strong><br />\
                              RETIRA &nbsp; POR &nbsp; LOCAL<br />';
    }

    HTML = HTML + '</div>\
                    </td>\
                </tr>\
            </table>\
            <table style="width: 100%;\
            border-spacing: 0;\
            border: 0 none;\
            padding-top:20px;\
            background-color:#e8e1e1">\
                <tr>\
                    <td width="50%" style="font-size: 6px;\
                    font-weight: normal;\
                    color: #000;">Descripción</td>\
                    <td width="25%" style="text-align: center; font-size: 6px;\
                    font-weight: normal;\
                    color: #000;">Cantidad</td>\
                    <td width="25%" style="text-align: center; font-size: 6px;\
                    font-weight: normal;\
                    color: #000;">Importe</td>\
                </tr>';

    let detalle = this.state.pedido.Detalle_Pedidos;
    let total = 0;
    detalle.forEach(function (valor, indice) {

      let producto = "";

      if (valor.elaborado) { producto = valor.elaborado.nombre; }
      else { producto = valor.bebida.Articulo.nombre; }

      HTML = HTML + '<tr>\
                                    <td style="border-right: 1px solid #ccc; margin: 0;\
                                    padding: 2px;\
                                    line-height: 10px;\
                                    background-color: #fff;\
                                    border-bottom: 1px solid #ccc;\
                                    font-size: 6px;\
                                    color: #666;">\
                                         '+ producto + '\
                                    </td>\
                                    <td style="border-right: 1px solid #ccc; margin: 0;\
                                    padding: 2px;\
                                    line-height: 10px;\
                                    background-color: #fff;\
                                    border-bottom: 1px solid #ccc;\
                                    font-size: 6px;\
                                    color: #666;">\
                                            '+ valor.cantidad + '\
                                    </td>\
                                    <td style="text-align: center;\
                                    margin: 0;\
                                    padding: 2px;\
                                    line-height: 10px;\
                                    background-color: #fff;\
                                    border-bottom: 1px solid #ccc;\
                                    font-size: 6px;\
                                    color: #666;">\
                                          $'+ valor.precioDetalle + 'ARS\
                                    </td>\
                                </tr>';

      total = total + valor.precioDetalle;

    });


    HTML = HTML + '<tr style="font-size: 6px;\
                font-weight: normal;\
                line-height: 15px;\
                text-transform: uppercase;">\
                    <td colspan="2" style="text-align: right;\
                    border-right: 1px solid #ccc;  padding-right:10px;">Sub Total:</td>\
                    <td style="text-align: center;">$'+ total + 'ARS</td>\
                </tr>\
                <tr style="font-size: 6px;\
                font-weight: normal;\
                line-height: 15px;\
                text-transform: uppercase;">\
                    <td colspan="2" style="text-align: right;\
                    border-right: 1px solid #ccc; padding-right:10px;">Crédito:</td>\
                    <td style="text-align: center;"><b>$0,00ARS</b></td>\
                </tr>\
                <tr style="font-size: 6px;\
                font-weight: normal;\
                line-height: 15px;\
                text-transform: uppercase;">\
                    <td colspan="2" style="text-align: right;\
                    border-right: 1px solid #ccc; padding-right:10px;">Total:</td>\
                    <td style="text-align: center;">$'+ total + 'ARS</td>\
                </tr>\
            </table>\
            </div>\
          </body>\
        </html>';


    var binary = doc.output('Factura');

    const data = {
      email: this.state.pedido.Usuario.email,
      factura: binary
    }

    const resp = axiosAutorizado().post('http://localhost:4000/api/enviarEmail/envioFactura/', data);

    console.log(resp);

    doc.html(
      HTML,
      {
        callback: function (doc) {
          doc.save('DOC.pdf')
        }
      });




  }

  generarFactura = async () => {

    const data = {
      id_pedido: this.state.pedido.id,
      id_cajero: JSON.parse(jwtDecode(sessionStorage.getItem("token")).id)
    }

    const resp = await axiosAutorizado().post('http://localhost:4000/api/facturas/', data);


    this.jsPDF(resp.data.Detalle);

  }



  render() {

    return (<button onClick={this.generarFactura}
      className="d-flex align-items-center justify-content-center"
      style={{ border: "1px solid black", width: "165px", backgroundColor: "#E0C700", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "black", display: "inline-block", fontWeight: "bolder" }}>
      Generar Factura<i className="fa fa-file-upload mr-2"></i>
    </button>)
  }


}