import React from 'react'
import { Doughnut } from 'react-chartjs-2'


const CategDeProductosPedidos = ({ prodPorCatPedida, categorias }) => {
    // function randomInt(min, max) {
    //     return min + Math.floor((max - min) * Math.random());
    // }
    // const colorAleatorio = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
    const generarColoresFondo = () => {
        const numeroInicial = 255
        let colores = categorias.map((cat, i) => {
            return `rgb(${numeroInicial - 150 - ((i + 1) * 5)}, ${numeroInicial - ((i + 1) * 20)} , ${numeroInicial - ((i + 1) * 30)})`
        })
        return colores
    }
    const generarColoresFondoHover = () => {
        const numeroInicial = 255
        let colores = categorias.map((cat, i) => {
            return `rgb(${numeroInicial - 150 - ((i + 1) * 5)}, ${numeroInicial - ((i + 1) * 20)} , ${numeroInicial - ((i + 1) * 30)},0.5)`
        })
        return colores
    }
    const coloresFondo = generarColoresFondo();
    const coloresFondoHover = generarColoresFondoHover();

    const data = {
        labels: categorias,
        datasets: [{
            label: "Datos de Pedidos del 2020",
            data: prodPorCatPedida,
            backgroundColor: coloresFondo,
            hoverBackgroundColor: coloresFondoHover
        }],

    }
    const options = {
        title: {
            display: true,
            text: "Distribución productos pedidos según su categoría (Unidades)"
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                }
            }]
        }
    }
    return <Doughnut data={data} options={options} />
}

export default CategDeProductosPedidos