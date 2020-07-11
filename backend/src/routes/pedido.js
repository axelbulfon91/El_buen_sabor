const { Router } = require('express');
const router = Router();
const pedidoModel = require('../models/pedido');
const detalle_pedido_model = require('../models/detalle_pedido');
const elaboradoModel = require('../models/elaborado');
const userModel = require('../models/usuario');
const articuloModel = require('../models/articulo');
const detalleElaboradoModel = require('../models/detalle_elaborado');
const precioModel = require('../models/precio');
const bebidaModel = require('../models/bebida');



router.post('/', async (req, res) => {
    const productosPedidos = req.body.productosPedidos // Array de productos
    ////////////Comprobacion de existencia de Stock en los insumos//////////////
    const validacion = await validarStock(productosPedidos)
    /////////////Si hay Stock, Genero el Pedido ////////////////////
    if (validacion.hayStock) {
        const userID = req.body.id_usuario // Token ---> id_user
        const estado = req.body.estado // Estado del registro (Creado, Aceptado, En preparacion, Demorado, Listo, Entregado, En Delivery)
        const user = await userModel.findOne({ where: { id: userID } })

        const pedido = await pedidoModel.create({ //Creo pedido a con id_usuario
            id_cliente: user.id,
            estado: estado,
            tipoRetiro: req.body.tipoRetiro
        })
        productosPedidos.forEach(async (item, index) => {
            if (item.idBebida) {
                await detalle_pedido_model.create({ //Creo un detalle por cada producto con su cantidad y lo asigno al id_pedido              
                    id_pedido: pedido.id,
                    bebida_id: item.idBebida,
                    cantidad: item.cantidad,
                    precioDetalle: validacion.precios[index] * item.cantidad
                });
            }
            if (item.idElaborado) {
                await detalle_pedido_model.create({ //Creo un detalle por cada producto con su cantidad y lo asigno al id_pedido              
                    id_pedido: pedido.id,
                    elaborado_id: item.idElaborado,
                    cantidad: item.cantidad,
                    precioDetalle: validacion.precios[index] * item.cantidad
                });
            }
        })

        res.status(200).json({ "respuesta": "OK" })
    } else {
        res.json({ message: 'No hay stock' })
    }

});

// Trae todos los pedidos de la base de datos (PARA EL ADMINISTRADOR)
router.get('/', async (req, res) => {
    const pedidos = await pedidoModel.findAll({
        attributes: { exclude: ['id_cliente'] },
        include: [{
            model: detalle_pedido_model,
            attributes: ['id', 'cantidad', 'precioDetalle'],
            include: [{
                model: elaboradoModel,
                attributes: ['id', 'nombre']
            },
            {
                model: bebidaModel,
                attributes: ['id'],
                include: {
                    model: articuloModel,
                    attributes: ['nombre']
                }
            }]
        }, {
            model: userModel,
            attributes: ['id', 'nombre']
        }]
    });

    res.json({ "pedidos": pedidos });
});

//Trae todos los pedidos de un usuario especifico (PARA EL CLIENTE) 
router.get('/usuario/:id', async (req, res) => {

    const pedidos = await pedidoModel.findAll({
        where: {
            id_cliente: req.params.id
        },
        attributes: { exclude: ['id_cliente'] },
        include: [{
            model: detalle_pedido_model,
            attributes: ['cantidad', 'precioDetalle'],
            include: [{
                model: elaboradoModel,
                attributes: ['id', 'nombre']
            },
            {
                model: bebidaModel,
                attributes: ['id'],
                include: {
                    model: articuloModel,
                    attributes: ['nombre']
                }
            }]
        }, {
            model: userModel,
            attributes: ['id', 'nombre']
        }]
    });
    res.json(pedidos)
});
//Trae los datos de un solo pedido segun su id (PARA EL CLIENTE O ADMINISTRADOR) 
router.get('/:id', async (req, res) => {
    const pedido = await pedidoModel.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['id_cliente'] },
        include: [{
            model: detalle_pedido_model,
            attributes: ['cantidad', 'precioDetalle'],
            include: [{
                model: elaboradoModel,
                attributes: ['id', 'nombre']
            },
            {
                model: bebidaModel,
                attributes: ['id'],
                include: {
                    model: articuloModel,
                    attributes: ['nombre']
                }
            }]
        }, {
            model: userModel,
            attributes: ['id', 'nombre']
        }]
    });
    res.json(pedido)
});

router.delete('/:id', async (req, res) => {
    try {
        await pedidoModel.destroy({
            where: { id: req.params.id }
        })
        res.json({ 'message': "Pedido Eliminado" })
    } catch (error) {
        console.log(error);
        res.json({ 'message': 'no se pudo elimnar' })
    }
});

//Edicion del Estado de un Pedido
router.put('/estado/:id', async (req, res) => {
    const pedido = await pedidoModel.findOne({
        where: {
            id: req.params.id
        },
        include: detalle_pedido_model
    });
    if (pedido) {

    //Actualizacion de stock correspondiente
    if (req.body.estado === "confirmado") {//Si el pedido es confirmado reduzco el stock correspondiente
        await actualizarStockPedido(pedido, 'restar');
    }
    //Si el estado era Confirmado pero se Cancela, vuelvo a sumar el stock
    if (pedido.dataValues.estado === "confirmado" && req.body.estado === "cancelado"){
        await actualizarStockPedido(pedido, 'sumar');
    }
    //Finalmente se actualiza el estado del pedido
    await pedido.update({
        estado: req.body.estado
    })
    }
    res.json({ "Actualizado": "OK" })
});
//Edicion de datos de un pedido
router.put('/:id', async (req, res) => {
    const pedido = await pedidoModel.findOne({
        where: {
            id: req.params.id
        }
    });
    console.log(pedido)
    if (pedido) { //Datos de pedido en si
        await pedido.update({
            estado: req.body.estado,
            tipoRetiro: req.body.tipoRetiro
        })
        const productosPedidos = req.body.productosPedidos // Array de productos
        ////////////Comprobacion de existencia de Stock en los insumos del pedido//////////////
        const validacion = await validarStock(productosPedidos)
        /////////////Si hay Stock, Genero el Pedido ///////////////////
        if (validacion.hayStock) {
            //Eliminacion de los detalles relacionados al pedido
            await detalle_pedido_model.destroy({
                where: { id_pedido: pedido.id }
            })
            //Nueva asignacion de los detallesSemielaborados
            productosPedidos.forEach(async (item, index) => {
                if (item.idBebida) {
                    await detalle_pedido_model.create({ //Creo un detalle por cada producto con su cantidad y lo asigno al id_pedido              
                        id_pedido: pedido.id,
                        bebida_id: item.idBebida,
                        cantidad: item.cantidad,
                        precioDetalle: validacion.precios[index] * item.cantidad
                    });
                }
                if (item.idElaborado) {
                    await detalle_pedido_model.create({ //Creo un detalle por cada producto con su cantidad y lo asigno al id_pedido              
                        id_pedido: pedido.id,
                        elaborado_id: item.idElaborado,
                        cantidad: item.cantidad,
                        precioDetalle: validacion.precios[index] * item.cantidad
                    });
                }
            })
        }




    }
    res.json({ "Actualizado": "OK" })
});

///////Validacion de Stock
const validarStock = async (productosPedidos) => {
    let hayStock = true;
    const precios = [] //almaceno los precios de los elaborados y bebidas en el pedido
    for (item of productosPedidos) {
        if (item.idBebida) {//Si es bebida
            const bebida = await bebidaModel.findOne({
                where: { id: item.idBebida },
                include: [articuloModel, precioModel]
            })
            const longitudPrecios = bebida.dataValues.precios.length;
            const ultimoPrecio = bebida.dataValues.precios[longitudPrecios - 1].dataValues.monto;
            precios.push(ultimoPrecio);//Guardo el precio de la bebebia
            const cantidadNecesaria = item.cantidad;
            const stockActual = bebida.dataValues.Articulo.dataValues.stockActual;
            if (stockActual < cantidadNecesaria) {//Verifico el Stock de la bebida
                hayStock = false;
                console.log(hayStock);
            }
        }
        if (item.idElaborado) {//Si es un elborado

            //Obtengo los elaborados del pedido
            const elaborado = await elaboradoModel.findOne({
                where: { id: item.idElaborado },
                include: [{
                    model: detalleElaboradoModel,
                    include: { model: articuloModel }
                }, {
                    model: precioModel
                }]
            })
            const longitudPrecios = elaborado.dataValues.precios.length;
            const ultimoPrecio = elaborado.dataValues.precios[longitudPrecios - 1].dataValues.monto;
            precios.push(ultimoPrecio);
            //console.log('Elaborado', elaborado.dataValues.nombre);
            const detallesElaborados = elaborado.dataValues.detalle_elaborados;//Detalles de cada Elaborado
            await detallesElaborados.forEach(detalle => {//Recorro los detalles para revisar el stock de cada articulo
                //console.log('Nombre', detalle.dataValues.Articulo.dataValues.nombre);
                //console.log('cantidad necesaria para el Elaborado', detalle.dataValues.cantidad);
                //console.log('Cantidad del Pedido', item.cantidad);
                const cantidadNecesaria = item.cantidad * detalle.dataValues.cantidad;
                //console.log('cantidadNecesaria: ', cantidadNecesaria);
                const stockActual = detalle.dataValues.Articulo.dataValues.stockActual;
                //console.log('Stock Actual: ', stockActual);
                if (stockActual < cantidadNecesaria) {
                    hayStock = false;
                }
            })
        }

    };
    return { 'hayStock': hayStock, 'precios': precios }
}
const actualizarStockPedido = async (pedido, operacion) => {
            //Primero obtengo los elaborados y bebidas correspondientes del pedido  
            const detallesPedido = pedido.dataValues.Detalle_Pedidos;
            //Recorro el arreglo de detalles y Verifico si es una bebida
            for (const detalle of detallesPedido) {
                const cantidadDeDetalle = detalle.dataValues.cantidad;
                if (detalle.dataValues.bebida_id) {//Si es una bebida
                    
                    await actualizarStockArticulo(detalle.dataValues.bebida_id, cantidadDeDetalle,operacion);
    
                } else {//Entonces es un elaborado
                    const elaborado = await elaboradoModel.findOne({
                        where: { id: detalle.dataValues.elaborado_id },
                        include: detalleElaboradoModel
                    })
                    const detallesElaborado = elaborado.dataValues.detalle_elaborados;
                    for (const detalleElab of detallesElaborado) {
                        const cantidadPorElaborado = detalleElab.dataValues.cantidad;
                        const cantidadARestar = cantidadDeDetalle * cantidadPorElaborado;
    
                        await actualizarStockArticulo(detalleElab.dataValues.articulo_id, cantidadARestar, operacion);
    
                    }
                }
            }

}
const actualizarStockArticulo = async (id, cantidad, operacion) => {
    
    const articulo = await articuloModel.findOne({
        where: { id: id }
    });
    //console.log('Articulo: ',articulo.dataValues.nombre);
    //console.log('cantidadARestar: ',cantidad);
    const stockActualArt = articulo.dataValues.stockActual;
    let nuevoStockActualizado = 0;
    if (operacion === 'restar') {
        nuevoStockActualizado = stockActualArt - cantidad;

    }
    if (operacion === 'sumar') {
        nuevoStockActualizado = stockActualArt + cantidad;
    }
    await articulo.update({
        stockActual: nuevoStockActualizado
    })
}

module.exports = router;