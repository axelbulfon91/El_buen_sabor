const { Router } = require('express');
const articuloModel = require('../models/articulo');
const semielaboradoModel = require('../models/semielaborado');
const insumoModel = require('../models/insumo');
const existenciaModel = require('../models/existencia');
const categorieModel = require('../models/categorie');
const detalleSemielaboradoModel = require('../models/detalle_semielaborado');

const router = Router();
//Trae todas las existencias
router.get('/', async (req, res) => {
    try {
        const existencias = await existenciaModel.findAll({
            include: {
                model: articuloModel,
                attributes: ['id','nombre', 'stockActual', 'unidadMedida'],
                include: {
                    model: categorieModel,
                    attributes: ["tipo"]
                }
            }
        })

        res.json(existencias)
    } catch (error) {
        res.json(error)
    }
})
//Trae todas las existencias de un articulo especifico
router.get('/:id', async (req, res) => {
    try {
        const existencias = await existenciaModel.findAll({
            where: { articulo_id: req.params.id},
            include: {
                model: articuloModel,
                attributes: ['id','nombre', 'stockActual', 'unidadMedida']
            }
        })

        res.json(existencias)
    } catch (error) {
        res.json(error)
    }
})

//Existencias para Insumos
router.post('/insumos', async (req, res) => {
    try {
        let articulo = await obtenerArticulo(req.body.idArt);
        let existencia = await crearNuevaExistencia(req);
        actualizado = await actualizarStock('sumar', articulo, req.body.cantidad);

        res.json(articulo)
    } catch (error) {
        res.json(error)
    }
})

router.delete('/insumos/:id', async (req, res) => {
    try {
        let existencia = await obtenerExistencia(req.params.id)
        let articulo = await obtenerArticulo(existencia.dataValues.articulo_id);
        let actualizado = await actualizarStock('restar', articulo, existencia.dataValues.cantidad);
        let eliminada = await eliminarExistencia(req.params.id);

        res.json(actualizado)
    } catch (error) {
        res.json(error)
    }
})
//Existencias para bebidas
router.post('/bebidas', async (req, res) => {
    try {
        let articulo = await obtenerArticulo(req.body.idArt);
        let existencia = await crearNuevaExistencia(req);
        actualizado = await actualizarStock('sumar', articulo, req.body.cantidad);

        res.json(articulo)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})
router.delete('/bebidas/:id', async (req, res) => {
    try {
        let existencia = await obtenerExistencia(req.params.id)
        let articulo = await obtenerArticulo(existencia.dataValues.articulo_id);
        let actualizado = await actualizarStock('restar', articulo, existencia.dataValues.cantidad);
        let eliminada = await eliminarExistencia(req.params.id);

        res.json(actualizado)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

//Existencias para Semielaborados
router.post('/semielaborados', async (req, res) => {
    try {
        const cantidad = req.body.cantidad;
        //Paso 1 Obtengo Articulo
        let articulo = await obtenerArticulo(req.body.idArt);
        //Paso 2 Creo la nueva existencia
        let existencia = await crearNuevaExistencia(req);
        //Paso 3 Actualizo la existencia del Semielaborado
        await actualizarStock('sumar', articulo, cantidad)
        //Paso 4 obtengo el arreglo de los detallesSemielaborados
        const semielaborado = await obtenerSemielaborado(req.body.idArt)
        const detalles = semielaborado.dataValues.detalle_semielaborados;
        //Paso 5 recorro el detalle de insumos y resto el stock de la cantidad que se usa del insumo x la cantidad de la existencia
        await detalles.forEach(async (insumo) => {
            cantidadInsumo = insumo.dataValues.cantidad
            let art = insumo.dataValues.insumo.dataValues.Articulo
            await actualizarStock('restar', art, (cantidad * cantidadInsumo))
        })
        let actualizado = await obtenerSemielaborado(req.body.idArt)
        res.json(actualizado)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})
router.delete('/semielaborados/:id', async (req, res) => {
    try {
        //Paso 1 Obtengo Articulo y Existencia
        let existencia = await existenciaModel.findOne({ where: { id: req.params.id}})
        let articulo = await obtenerArticulo(existencia.dataValues.articulo_id);
        //Paso 2 Actualizo la existencia del Semielaborado
        const cantidad = existencia.dataValues.cantidad;
        await actualizarStock('restar', articulo, cantidad)
        //Paso 3 Borro la existencia
        await existenciaModel.destroy({ where: { id: req.params.id} })

        //Paso 4 obtengo el arreglo de los detallesSemielaborados
        const semielaborado = await obtenerSemielaborado(existencia.dataValues.articulo_id)
        const detalles = semielaborado.dataValues.detalle_semielaborados;
        //Paso 5 recorro el detalle de insumos y resto el stock de la cantidad que se usa del insumo x la cantidad de la existencia
        await detalles.forEach(async (insumo) => {
            let cantidadInsumo = insumo.dataValues.cantidad
            let art = insumo.dataValues.insumo.dataValues.Articulo
            await actualizarStock('sumar', art, (cantidad * cantidadInsumo))
        })
        let actualizado = await obtenerSemielaborado(existencia.dataValues.articulo_id)
        res.json(actualizado)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})


/////////////////////Funciones Auxiliares ///////////////
//Funcion para retornar articulo basado en id
obtenerArticulo = async (id) => {
    try {
        let articulo = await articuloModel.findOne({//Ecuentro el articulo
            where: { id: id },
            attributes: ['id', 'nombre', 'stockActual'],
            include: {
                model: categorieModel,
                attributes: ['id', 'nombre', 'tipo']
            }
        })
        console.log('Articulo: ', articulo);
        return articulo
    } catch (error) {
        console.log(error);
        return error
    }
}
//Obtener Semielaborado
obtenerSemielaborado = async (id) => {
    try {
        const semielaborado = await semielaboradoModel.findOne({
            where: { id: id },
            attributes: ['id'],
            include: [{
                model: articuloModel,
                attributes: ['id', 'nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual']
            }, {
                model: detalleSemielaboradoModel,
                attributes: ['cantidad'],
                include: {
                    model: insumoModel,
                    attributes: ['id'],
                    include: {
                        model: articuloModel,
                        attributes: ['id', 'nombre', 'unidadMedida', 'stockActual']
                    }
                }
            }]
        })

        return semielaborado;
    } catch (error) {
        console.log(error)
        return error
    }
}

//Funcion para crear una nueva existencia
crearNuevaExistencia = async (req) => {
    try {
        let existencia = await existenciaModel.create({//Creo una existencia nueva
            articulo_id: req.body.idArt,
            cantidad: req.body.cantidad,
            costoPorUnidad: req.body.costoPorUnidad,
            fechaVencimiento: req.body.fechaVencimiento
        })
        return existencia
    } catch (error) {
        console.log(error);
        return error
    }
}
//Funcion para obtener una Existencia desde un id
obtenerExistencia = async (id) => {
    try {
        let existencia = await existenciaModel.findOne({
            where: { id: id }
        })
        return existencia
    } catch (error) {
        console.log(error);
        return error
    }
}

//Funcion para Eliminar una Existencia
eliminarExistencia = async (id) => {
    try {
        eliminada = await existenciaModel.destroy({
            where: { id: id }
        })
        return eliminada
    } catch (error) {
        console.log(error);
        return error
    }
}

//Funcion para actualizar stock actual de un articulo
actualizarStock = async (operacion, articulo, cantidad) => {
    let stockNuevo = 0
    let actualizado = null;
    if (operacion === 'sumar') {
        stockNuevo = Number(articulo.dataValues.stockActual) + Number(cantidad)
        actualizado = await articulo.update({
            stockActual: stockNuevo
        })
    } else if (operacion === 'restar') {
        stockNuevo = Number(articulo.dataValues.stockActual) - Number(cantidad)
        actualizado = await articulo.update({
            stockActual: stockNuevo
        })
    }
    return actualizado;
}

module.exports = router