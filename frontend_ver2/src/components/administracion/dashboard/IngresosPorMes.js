import React from 'react'
import { Line } from 'react-chartjs-2'


const IngresosPorMes = ({ ingresosPorMes, meses }) => {
    const data = {
        labels: meses,
        datasets: [{
            label: "Datos de Pedidos del 2020",
            data: ingresosPorMes,
            borderColor: ["DarkGoldenRod"],
            backgroundColor: [" rgb(184, 134, 11, 0.5)"],
            pointBorderColor: "DarkGoldenRod",
            pointBackgroundColor: "rgb(184, 134, 11, 0.5)"
        }],

    }
    const options = {
        title: {
            display: true,
            text: "Distribución de ingresos obtenidos en 2020 ($)"
        }
    }
    return <Line data={data} options={options} />
}

export default IngresosPorMes
