import React from 'react'
import ExportExcel from 'react-export-excel';

const BotonExportarExcel = (props) => {

    const { pedidosPorMesJson } = props
    const { prodPorCatPedidaJson } = props
    const { pedidosPorEstadoJson } = props
    const { ingresosPorMesJson } = props

    const ExcelFile = ExportExcel.ExcelFile;
    const ExcelSheet = ExportExcel.ExcelFile.ExcelSheet;
    const ExcelColumn = ExportExcel.ExcelFile.ExcelColumn;


    return (
        <ExcelFile element=
            {<button className="btn btn-success btn-lg">Exportar a Excel <i className="fa fa-upload"></i></button>
            } filename={"Reporte"}>
            <ExcelSheet data={ingresosPorMesJson} name="Ingresos Por Mes">
                <ExcelColumn label="Mes" value="mes" />
                <ExcelColumn label="Ingresos" value="ingresosPorMes" />
            </ExcelSheet>
            <ExcelSheet data={pedidosPorMesJson} name="Pedidos Por Mes">
                <ExcelColumn label="Mes" value="mes" />
                <ExcelColumn label="Cantidad de Pedidos" value="cantidadPedidos" />
            </ExcelSheet>
            <ExcelSheet data={prodPorCatPedidaJson} name="Productos Pedidos por Categoría">
                <ExcelColumn label="Categoría" value="categoria" />
                <ExcelColumn label="Productos Pedidos" value="prodPorCatPedida" />
            </ExcelSheet>
            <ExcelSheet data={pedidosPorEstadoJson} name="Pedidos por Estado">
                <ExcelColumn label="Estado" value="estado" />
                <ExcelColumn label="Cantidad de Pedidos" value="pedidosPorEstado" />
            </ExcelSheet>

        </ExcelFile>
    )
}

export default BotonExportarExcel
