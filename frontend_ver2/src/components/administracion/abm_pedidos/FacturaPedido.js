import React, {createElement, PureComponent} from 'react';

import { jsPDF } from "jspdf";


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
          doc.save('DOC.pdf')
        }
      });


      //==================================
      
      /*
      doc.setFontSize(30);
      doc.text(90, 20, "RECIBO");
      doc.setFontSize(20);
      doc.text(20, 40, "DETALLE");
      doc.setFontSize(15);
      doc.setDrawColor(0, 0, 0);

      var len = this.state.pedido.Detalle_Pedidos.length;

      var y = 70;
      var total = 0;
      for(var j=0; j<len;++j) {
          var price;
          var quantity;
          var pricequantity = 0;
       
            doc.rect(15, y-8, 200, y+20);

          for(var key in this.state.pedido.Detalle_Pedidos[j]) {

            if(key=="bebida" && this.state.pedido.Detalle_Pedidos[j][key] != null) { 
              doc.text(20, y, "BEBIDA");
              doc.text(55, y, this.state.pedido.Detalle_Pedidos[j][key].Articulo.nombre.toString());
             }

             if(key == "elaborado" && this.state.pedido.Detalle_Pedidos[j][key] !=null){
              doc.text(20, y, "PRODUCTO");
              doc.text(55, y, this.state.pedido.Detalle_Pedidos[j][key].nombre.toString());
             }

             if(key=="cantidad") { 
              doc.text(120, y, "CANTIDAD");
              doc.text(150, y, this.state.pedido.Detalle_Pedidos[j][key].toString());
              quantity = this.state.pedido.Detalle_Pedidos[j][key];
             }

              if(key=="precioDetalle") { 
                doc.text(160, y, "PRECIO/U");
                doc.text(190, y, this.state.pedido.Detalle_Pedidos[j][key].toString());
                price = this.state.pedido.Detalle_Pedidos[j][key];
               }
        
             
          } 

          y = y+7;
          pricequantity = price * quantity;
          doc.text(120, y, "SUBTOTAL");
          doc.text(160, y, (pricequantity).toString());
          total += pricequantity;
          y=y+10;
      }
      
      y = y+10;
      doc.text(120, y, "Total");
      doc.text(160, y, total.toString());
     
      /*
      if (!("details" in dox))
      dox["details"] = {};

      else if (typeof(dox["details"])==="string")
      dox["details"] = JSON.parse(dox["details"]);

      if (!("payment" in dox["details"]))
      dox["details"]["payment"] = {};

      if (!("messages" in dox["details"]["payment"]["messages"]))
      dox["details"]["payment"]["messages"] = {}

      for(var key in dox['details']['payment']['messages']) {
        if(key[0]!=='') {
          doc.text(20, y, key.replace("_", " "));
          doc.text(130, y, dox['details']['payment']['messages'][key].toString());
        }
        y+=10;
      }*/

      //doc.save('factura.pdf');

  }

  render(){

    return(<button onClick={this.jsPDF}
      className="d-flex align-items-center justify-content-center"
      style={{ border: "1px solid black", width: "165px", backgroundColor: "#E0C700", borderRadius: "15px", padding: "6px", margin: "5px 0px", color: "black", display: "inline-block", fontWeight: "bolder" }}>
      Generar Factura<i className="fa fa-file-upload mr-2"></i>
      </button>)
  }


}