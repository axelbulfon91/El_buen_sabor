const { Router } = require('express');
const bebidaModel = require('../models/bebida');
const articuloModel = require('../models/articulo');
const categoriaModel = require('../models/categorie');
const upload = require('../lib/multerConfig');
const router = Router();
const fs = require('fs');

//ABM
//Creacion de una nueva Bebida
router.post('/', upload.single('imagen'), async (req, res) => {
    let articulo = null;
    let bebida = null;
    if (req.file) {
        const { filename } = req.file;
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
    }
    bebida = await bebidaModel.create({
        id: articulo.id,
        precio : req.body.precio,
        articulo_id: articulo.id
    })
    res.json({message: 'Nueva bebida creado con Exito'});

});

//Trae todos las bebidas
router.get('/', async (req, res) => {
    const bebida = await bebidaModel.findAll({
        attributes: ['id','precio'],
        include: {
            model: articuloModel,
            attributes: ['id','nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual'],
            include: {
                model: categoriaModel,
                attributes: ['id', 'nombre', 'tipo']
            }
        }
    })

    res.json(bebida)
});

//Traer una sola bebida
router.get('/:id', async (req, res) => {

    const bebida = await bebidaModel.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','precio'],
        include: {
            model: articuloModel,
            attributes: ['id','nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual'],
            include: {
                model: categoriaModel,
                attributes: ['id', 'nombre', 'tipo']
            }
        }
    })
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
        { where: { id: req.params.id } }
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
        }
        await bebida.update({
            precio: req.body.precio
        })

        res.json({message: 'Modificado con Exito'});
    } else {
        res.json("Producto no encontrado");
    }
});

module.exports = router;