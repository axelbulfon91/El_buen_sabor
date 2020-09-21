import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import TablaDetallesPedido from './TablaDetallesPedido';

    

// Create Document Component
const FacturaPedido = (props) => {

    const { pedido } = props;

    // Create styles
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
      }
    });


    return (

  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
         <TablaDetallesPedido productos={pedido.Detalle_Pedidos} />
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>

    )
}

export default FacturaPedido