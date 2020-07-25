const { Router } = require('express');
const insumoModel = require('../models/insumo');
const articuloModel = require('../models/articulo');
const categoriaModel = require('../models/categorie');
const upload = require('../lib/multerConfig');
const router = Router();
const fs = require('fs');

//ABM
//Creacion de un nuevo Insumo
router.post('/', upload.single('imagen'), async (req, res) => {
    let articulo = null;
    let insumo = null;
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
    insumo = await insumoModel.create({
        id: articulo.id,
        articulo_id: articulo.id
    })
    res.json({message: 'Nuevo Insumo creado con Exito'});

});

//Trae todos los insumos
router.get('/', async (req, res) => {
    const insumos = await insumoModel.findAll({
        attributes: ['id'],
        include: {
            model: articuloModel,
            attributes: ['id','nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual'],
            include: {
                model: categoriaModel,
                attributes: ['id', 'nombre', 'tipo']
            }
        }
    })

    res.json(insumos)
});

//Traer un solo insumo
router.get('/:id', async (req, res) => {

    const insumo = await insumoModel.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id'],
        include: {
            model: articuloModel,
            attributes: ['id','nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual'],
            include: {
                model: categoriaModel,
                attributes: ['id', 'nombre', 'tipo']
            }
        }
    })
    res.json(insumo)
})
//Eliminar insumo
router.delete('/:id', async (req, res) => {
    const insumo = await insumoModel.findOne(
        { where: { id: req.params.id } }
    );
    const articuloRelacionado = await articuloModel.findOne(
        { where: { id: insumo.articulo_id } }
    )
    if (articuloRelacionado) {
        if (articuloRelacionado.nombreImg !== 'Sin imagen') {
            await fs.unlink('src/public/imgs/' + articuloRelacionado.nombreImg, () => null);
        }
    }
    await articuloModel.destroy(
        { where: { id: insumo.articulo_id } }
    );
    const insEliminado = await insumoModel.destroy(
        { where: { id: insumo.id } }
    );
    if (insEliminado === 0) {
        res.json("Insumo no encontrado");
    } else {
        res.json({ message: "Eliminado con Exito" })
    }
})
//Modificar un Insumo
router.put('/:id', upload.single('imagen'), async (req, res) => {
    const insumo = await insumoModel.findOne(
        { where: { id: req.params.id } }
    );
    const articuloRelacionado = await articuloModel.findOne(
        { where: { id: insumo.articulo_id } }
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
        res.json({message: 'Modificado con Exito'});
    } else {
        res.json("Producto no encontrado");
    }
});

module.exports = router;