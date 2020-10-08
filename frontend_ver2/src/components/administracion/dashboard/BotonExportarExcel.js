import React from 'react'
import ExportExcel from 'react-export-excel';

const BotonExportarExcel = (props) => {

    const { pedidosPorMesJson } = props
    const ExcelFile = ExportExcel.ExcelFile;
    const ExcelSheet = ExportExcel.ExcelFile.ExcelSheet;
    const ExcelColumn = ExportExcel.ExcelFile.ExcelColumn;


    return (
        <ExcelFile element=
            {<button className="btn btn-success btn-lg">Exportar a Excel <i className="fa fa-upload"></i></button>
            } filename={"Reporte"}>
            <ExcelSheet data={pedidosPorMesJson} name="Pedidos Por Meses">
                <ExcelColumn label="Mes" value="mes" />
                <ExcelColumn label="Cantidad de Pedidos" value="cantidadPedidos" />
            </ExcelSheet>

        </ExcelFile>
    )
}

export default BotonExportarExcel
