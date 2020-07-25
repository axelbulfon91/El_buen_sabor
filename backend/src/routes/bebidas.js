const { Router } = require('express');
const bebidaModel = require('../models/bebida');
const articuloModel = require('../models/articulo');
const categoriaModel = require('../models/categorie');
const upload = require('../lib/multerConfig');
const router = Router();
const fs = require('fs');
const precioModel = require('../models/precio');

//ABM
//Creacion de una nueva Bebida

router.post('/', upload.single('imagen'), async (req, res) => {
    let articulo = null;
    let bebida = null;
    let precio = null;
    if (req.file) {
        const { filename } = req.file;//Creacion del Articulo
        articulo = await articuloModel.create({
            nombre: req.body.nombre,
            nombreImg: filename,
            categoria_id: req.body.categoria,
            unidadMedida: req.body.unidadMedida,
            stockMaximo: req.body.stockMaximo,
            stockMinimo: req.body.stockMinimo,
            stockActual: 0
        });
    } else {
        articulo = await articuloModel.create({
            nombre: req.body.nombre,
            nombreImg: 'Sin imagen',
            categoria_id: req.body.categoria,
            unidadMedida: req.body.unidadMedida,
            stockMaximo: req.body.stockMaximo,
            stockMinimo: req.body.stockMinimo,
            stockActual: 0
        });
    }//Creacion de la bebidan vinculada al articulo
    bebida = await bebidaModel.create({
        id: articulo.id,
        articulo_id: articulo.id
    })//creacion del precio vinculado
    precio = await precioModel.create({
        monto: req.body.precio,
        bebida_id: bebida.id
    })
    res.json({ message: 'Nueva bebida creado con Exito' });

});

//Trae todos las bebidas
router.get('/', async (req, res) => {
    try {
        const bebidas = await bebidaModel.findAll({
            attributes: ['id'],
            include: [{
                model: articuloModel,
                attributes: ['id', 'nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual'],
                include: {
                    model: categoriaModel,
                    attributes: ['id', 'nombre', 'tipo']
                }
            }, {
                model: precioModel,
                attributes: ['id', 'monto', 'tipoMoneda']
            }]

        })
        bebidas.forEach((bebida)=> {
            const longitudPrecios = bebida.dataValues.precios.length;
            const ultimoPrecio = bebida.dataValues.precios[longitudPrecios-1].dataValues.monto;
            delete bebida.dataValues.precios;
            bebida.dataValues.precio = ultimoPrecio;

        })
        res.json(bebidas)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
});

//Traer una sola bebida
router.get('/:id', async (req, res) => {

    const bebida = await bebidaModel.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id'],
        include: [{
            model: articuloModel,
            attributes: ['id', 'nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual'],
            include: {
                model: categoriaModel,
                attributes: ['id', 'nombre', 'tipo']
            }
        }, {
            model: precioModel,
            attributes: ['id', 'monto', 'tipoMoneda']
        }]
    })
    const longitudPrecios = bebida.dataValues.precios.length;
    const ultimoPrecio = bebida.dataValues.precios[longitudPrecios-1].dataValues.monto;
    delete bebida.dataValues.precios;
    bebida.dataValues.precio = ultimoPrecio;
    
    res.json(bebida)
})
//Eliminar bebida
router.delete('/:id', async (req, res) => {
    const bebida = await bebidaModel.findOne(
        { where: { id: req.params.id } }
    );
    const articuloRelacionado = await articuloModel.findOne(
        { where: { id: bebida.articulo_id } }
    )
    if (articuloRelacionado) {
        if (articuloRelacionado.nombreImg !== 'Sin imagen') {
            await fs.unlink('src/public/imgs/' + articuloRelacionado.nombreImg, () => null);
        }
    }
    await articuloModel.destroy(
        { where: { id: bebida.articulo_id } }
    );
    const bebidaEliminado = await bebidaModel.destroy(
        { where: { id: bebida.id } }
    );
    if (bebidaEliminado === 0) {
        res.json("bebida no encontrada");
    } else {
        res.json({ message: "Eliminado con Exito" })
    }
})
//Modificar una bebida
router.put('/:id', upload.single('imagen'), async (req, res) => {
    const bebida = await bebidaModel.findOne(
        {
            where: { id: req.params.id }
        }
    );
    const articuloRelacionado = await articuloModel.findOne(
        { where: { id: bebida.articulo_id } }
    )
    if (articuloRelacionado) {
        if (articuloRelacionado.nombreImg !== 'Sin imagen') {
            await fs.unlink('src/public/imgs/' + articuloRelacionado.nombreImg, () => null);
        }
        if (req.file) {
            const { filename } = req.file;
            await articuloRelacionado.update({
                nombre: req.body.nombre,
                nombreImg: filename,
                categoria_id: req.body.categoria,
                unidadMedida: req.body.unidadMedida,
                stockMaximo: req.body.stockMaximo,
                stockMinimo: req.body.stockMinimo,
                stockActual: req.body.stockActual
            });
        } else {
            await articuloRelacionado.update({
                nombre: req.body.nombre,
                nombreImg: 'Sin imagen',
                categoria_id: req.body.categoria,
                unidadMedida: req.body.unidadMedida,
                stockMaximo: req.body.stockMaximo,
                stockMinimo: req.body.stockMinimo,
                stockActual: req.body.stockActual
            });
        }//Creacion de nuevo precio
        const bebidaAux = await bebidaModel.findOne(
            {
                where: { id: req.params.id },
                include: precioModel
            })
            const precios = bebidaAux.dataValues.precios
            const longitudPrecios = precios.length;
            const montoUltimoPrecio = bebidaAux.dataValues.precios[longitudPrecios-1].dataValues.monto;
            console.log(montoUltimoPrecio);
            console.log(req.body.precio);
            console.log(montoUltimoPrecio != req.body.precio);
            if(montoUltimoPrecio != req.body.precio){
                await precioModel.create({
                    monto: req.body.precio,
                    bebida_id: req.params.id
                })
            }

        res.json({ message: 'Modificado con Exito' });
    } else {
        res.json("Producto no encontrado");
    }
});

module.exports = router;