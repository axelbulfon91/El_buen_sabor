const { Router } = require('express');
const ofertaModel = require('../models/oferta');
const bebidaModel = require('../models/bebida');
const elaboradoModel = require('../models/elaborado');
const articuloModel = require('../models/articulo');

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
            attributes:['id', 'precio'],
            include: {
                model: articuloModel,
                attributes: ['id', 'nombre']
            }
        },{
            model: elaboradoModel,
            attributes: ['id', 'nombre', 'precio']
        }]
    })

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