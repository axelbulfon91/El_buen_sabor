import React from 'react'
import { Line } from 'react-chartjs-2'


const PedidosPorMes = ({ pedidosPorMes, meses }) => {
    const data = {
        labels: meses,
        datasets: [{
            label: "Pedidos del 2020 (uni.)",
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
            text: "Distribución de pedidos realizados en 2020"
        }
    }
    return <Line data={data} options={options} />
}

export default PedidosPorMes
