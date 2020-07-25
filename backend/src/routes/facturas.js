const { Router } = require('express');
const router = Router();
const facturaModel = require('../models/factura')
const pedidoModel = require('../models/pedido')
const userModel = require('../models/usuario');
const detalle_pedido_model = require('../models/detalle_pedido');
const elaboradoModel = require('../models/elaborado');

router.post('/', async (req, res) => {

    const id_pedido = req.body.id_pedido; //Id del pedido
    const id_cajero = req.body.id_cajero; //Id del cajero que genera la factura

    const pedidoFacturado = await pedidoModel.findOne( // Verifica que exista pedido con el id y el estado "Finalizado" para generar factura
        {
            where: {
                id: id_pedido,
                estado: "Finalizado"
            }
        }
    )
    console.log(pedidoFacturado)
    if (pedidoFacturado) {
        const factura = await facturaModel.create({
            id_pedido: pedidoFacturado.dataValues.id,
            id_cajero
        })
        res.status(200).json({ 'message': 'Factura realizada con exito', 'Detalle': factura })

    } else {
        res.json({ 'message': 'El pedido indicado no esta indicado como Finalizado o no tiene un ID correcto' })
    }



});

router.get('/', async (req, res) => {
    const facturas = await facturaModel.findAll({
        attributes: { exclude: ['id_pedido', 'updatedAt'] },
        include: [{
            model: pedidoModel,
            attributes: { exclude: ['id_cliente'] },
            include: [{
                model: detalle_pedido_model,
                attributes: ['cantidad'],
                include: [{
                    model: elaboradoModel,
                    attributes: ['id', 'nombre', 'precio']
                }]
            }]
        }, {
            model: userModel,
            attributes: ['id', 'nombre']
        }]
    });
    res.json({ 'facturas': facturas })
});

router.get('/:id', async (req, res) => {

    const id_factura = req.params.id

    const factura = await facturaModel.findOne({where:{id: id_factura},
        attributes: { exclude: ['id_pedido', 'updatedAt'] },
        include: [{
            model: pedidoModel,
            attributes: { exclude: ['id_cliente'] },
            include: [{
                model: detalle_pedido_model,
                attributes: ['cantidad'],
                include: [{
                    model: elaboradoModel,
                    attributes: ['id', 'nombre', 'precio']
                }]
            }]
        }, {
            model: userModel,
            attributes: ['id', 'nombre']
        }]
    });
    if (factura) {
        res.status(200).json({ 'factura': factura })
    } else {
        res.status(403).json({ 'message': 'ID de factura no encontrado' })
    }

});



module.exports = router;