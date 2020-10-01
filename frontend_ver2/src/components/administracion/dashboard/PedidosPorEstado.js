import React from 'react'
import { Bar } from 'react-chartjs-2'


const PedidosPorEstado = ({ pedidosPorEstado, estados }) => {
    const data = {
        labels: estados,
        datasets: [{
            label: "Pedidos del 2020 (uni.)",
            data: pedidosPorEstado,
            backgroundColor: [
                "DarkSalmon",
                "DarkTurquoise",
                "DarkOrchid",
                "DarkSeaGreen",
                "DeepSkyBlue",
                "Crimson"],
            hoverBackgroundColor: ["rgb(233, 150, 122,0.5)",
                "rgb(0, 206, 209, 0.5)",
                "rgb(153, 50, 204, 0.5)",
                "rgb(143, 188, 143,0.5)",
                "rgb(0, 191, 255,0.5)",
                "rgb(220, 20, 60,0.5)",]
        }],

    }
    const options = {
        title: {
            display: true,
            text: "Distribución de pedidos según su estado"
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0
                }
            }]
        }
    }
    return <Bar data={data} options={options} />
}

export default PedidosPorEstado
