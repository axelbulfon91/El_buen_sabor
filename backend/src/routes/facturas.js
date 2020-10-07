const { Router } = require('express');
const router = Router();
const facturaModel = require('../models/factura')
const pedidoModel = require('../models/pedido')
const userModel = require('../models/usuario');
const detalle_pedido_model = require('../models/detalle_pedido');
const elaboradoModel = require('../models/elaborado');
const {comprobarToken} = require('../lib/service_jwt');


router.post('/',comprobarToken,async (req, res) => {

    const id_pedido = req.body.id_pedido; //Id del pedido
    const usuario = req.body.usuario; //Id del pedido

    const pedidoFacturado = await pedidoModel.findOne( // Verifica que exista pedido con el id y el estado "Finalizado" para generar factura
        {
            where: {
                id: id_pedido,
                estado: "entregado"
            }
        }
    )
    //console.log(pedidoFacturado)
    if (pedidoFacturado) {

        const existeFactura = await facturaModel.findOne(
            {
                where : {
                    id_pedido: id_pedido
                }
            }
        )
        
        if(existeFactura){

            res.status(200).json({'success': true, 'message': 'Factura encontrada', 'Detalle': existeFactura })

        }else{

            if(usuario.rol == "CAJERO"){

                const id_cajero = usuario.id; //Id del cajero que genera la factura

                const factura = await facturaModel.create({
                    id_pedido: pedidoFacturado.dataValues.id,
                    id_cajero
                })
                res.status(200).json({ 'success': true,'message': 'Factura realizada con exito', 'Detalle': factura })
                
            }else{
                res.status(200).json({  'success': false, 'message': 'Debe esperar a que se genere la factura.' })
            }
        }

    } else {
        res.status(200).json({  'success': false, 'message': 'El pedido no está como Finalizado o no tiene un ID correcto' })
    }



});

router.get('/',comprobarToken, async (req, res) => {
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

router.get('/:id',comprobarToken, async (req, res) => {

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