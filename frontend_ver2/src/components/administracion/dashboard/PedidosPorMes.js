import React from 'react'
import { Line } from 'react-chartjs-2'


const PedidosPorMes = ({ pedidosPorMes, meses }) => {
    const data = {
        labels: meses,
        datasets: [{
            label: "Datos de Pedidos del 2020",
            data: pedidosPorMes,
            borderColor: ["darkslategray"],
            backgroundColor: [" rgb(48, 80, 80, 0.5)"],
            pointBorderColor: "darkslategray",
            pointBackgroundColor: " rgb(48, 80, 80, 0.5)"
        }],

    }
    const options = {
        title: {
            display: true,
            text: "Distribución de pedidos realizados en 2020 (Unidades)"
        }
    }
    return <Line data={data} options={options} />
}

export default PedidosPorMes
