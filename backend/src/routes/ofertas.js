const { Router } = require('express');
const ofertaModel = require('../models/oferta');
const bebidaModel = require('../models/bebida');
const elaboradoModel = require('../models/elaborado');
const articuloModel = require('../models/articulo');
const precioModel = require('../models/precio');

const router = Router();

//Generacion de una Oferta
router.post('/', async (req, res) => {
    if(req.body.esBebida){
        await ofertaModel.create({
            porcentajeDescuento: req.body.porcentajeDescuento,
            bebida_id: req.body.id
        })
    }else{
        await ofertaModel.create({
            porcentajeDescuento: req.body.porcentajeDescuento,
            elaborado_id: req.body.id
        })
    }
    res.json({message: 'Oferta creada con exito'})
})

//Obtencion de todas las ofertas
router.get('/', async (req, res) => {
    let ofertas = await ofertaModel.findAll({
        attributes: ['id','porcentajeDescuento'],
        include: [{
            model: bebidaModel,
            attributes:['id'],
            include: [{
                model: articuloModel,
                attributes: ['id', 'nombre']
            },
            {
                model: precioModel,
                attributes: ['id', 'monto', 'tipoMoneda']
            }]
        },{
            model: elaboradoModel,
            attributes: ['id', 'nombre'],
            include: {
                model: precioModel,
                attributes: ['id', 'monto', 'tipoMoneda']
            }
        }]
    })
    for (const oferta of ofertas) {
        if(oferta.dataValues.bebida){//Es una bebida
            const longitudPrecios = oferta.dataValues.bebida.dataValues.precios.length;
            const ultimoPrecio = oferta.dataValues.bebida.dataValues.precios[longitudPrecios-1].dataValues.monto;
            delete oferta.dataValues.bebida.dataValues.precios;
            oferta.dataValues.bebida.dataValues.precio = ultimoPrecio;
        }else{//Es una oferta de un elaborado
            const longitudPrecios = oferta.dataValues.elaborado.dataValues.precios.length;
            const ultimoPrecio = oferta.dataValues.elaborado.dataValues.precios[longitudPrecios-1].dataValues.monto;
            delete oferta.dataValues.elaborado.dataValues.precios;
            oferta.dataValues.elaborado.dataValues.precio = ultimoPrecio;
        }
    }
    res.json(ofertas)
})

//Eliminacion de Oferta
//Obtencion de todas las ofertas
router.delete('/:id', async (req, res) => {
    ofertaModel.destroy({
        where: { id: req.params.id }
    })

    res.json({message: 'Oferta borrada con exito'})
})


module.exports = router;