const { Router } = require('express');
const insumoModel = require('../models/insumo');
const articuloModel = require('../models/articulo');
const categoriaModel = require('../models/categorie');
const upload = require('../lib/multerConfig');
const semielaboradoModel = require('../models/semielaborado');
const detalleSemielaboradoModel = require('../models/detalle_semielaborado');

const router = Router();
const fs = require('fs');


//ABM
//Creacion de un nuevo semielaborado

router.post('/', upload.single('imagen'), async (req, res) => {
    let articulo = null;
    let semielaborado = null;
    if (req.file) {
        const { filename } = req.file;
        articulo = await articuloModel.create({
            nombre: req.body.nombre,
            nombreImg: filename,
            categoria_id: req.body.categoria,
            unidadMedida: 'unidad',
            stockMaximo: req.body.stockMaximo,
            stockMinimo: req.body.stockMinimo,
            stockActual: 0
        });
    } else {
        articulo = await articuloModel.create({
            nombre: req.body.nombre,
            nombreImg: 'Sin imagen',
            categoria_id: req.body.categoria,
            unidadMedida: 'unidad',
            stockMaximo: req.body.stockMaximo,
            stockMinimo: req.body.stockMinimo,
            stockActual: 0
        });
    }
    semielaborado = await semielaboradoModel.create({
        id: articulo.id,
        articulo_id: articulo.id,
        costoFabricacion: req.body.costoFabricacion
    })
    JSON.parse(req.body.insumos).forEach(async (insumo) => {//Parsear a Json el arreglo de insumos recibido
        await detalleSemielaboradoModel.create({
            cantidad: insumo.cantidad,
            semielaborado_id: semielaborado.id,
            insumo_id: insumo.id
        })
    })

    res.json({ message: "Semielaborado creado con exito" });

});
//Trae todos los semielaborados
router.get('/', async (req, res) => {
    const semielaborados = await semielaboradoModel.findAll({
        attributes: ['id', 'costoFabricacion'],
        include: [{
            model: articuloModel,
            attributes: ['id','nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual'],
            include: {
                model: categoriaModel,
                attributes: ['id', 'nombre', 'tipo']
            }
        }, {
            model: detalleSemielaboradoModel,
            attributes: ['id','cantidad'],
            include: {
                model: insumoModel,
                attributes: ['id'],
                include: {
                    model: articuloModel,
                    attributes: ['id','nombre', 'unidadMedida'],
                    include: {
                        model:categoriaModel,
                        attributes: ['id', 'nombre', 'tipo']
                    }
                }
            }
        }]
    })

    res.json(semielaborados)
});

//Trae un solo semilaborado
router.get('/:id', async (req, res) => {
    const semielaborado = await semielaboradoModel.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'costoFabricacion'],
        include: [{
            model: articuloModel,
            attributes: ['id','nombre', 'nombreImg', 'unidadMedida', 'stockMaximo', 'stockMinimo', 'stockActual'],
            include: {
                model: categoriaModel,
                attributes: ['id', 'nombre', 'tipo']
            }
        }, {
            model: detalleSemielaboradoModel,
            attributes: ['cantidad'],
            include: {
                model: insumoModel,
                attributes: ['id'],
                include: {
                    model: articuloModel,
                    attributes: ['id','nombre', 'unidadMedida'],
                    include: {
                        model:categoriaModel,
                        attributes: ['id', 'nombre', 'tipo']
                    }
                }
            }
        }]
    })

    res.json(semielaborado)
});

//Eliminar semielaborado
router.delete('/:id', async (req, res) => {
    const semielaborado = await semielaboradoModel.findOne(
        { where: { id: req.params.id } }
    );
    const articuloRelacionado = await articuloModel.findOne(
        { where: { id: semielaborado.articulo_id } }
    )
    if (articuloRelacionado) {
        if (articuloRelacionado.nombreImg !== 'Sin imagen') {
            await fs.unlink('src/public/imgs/' + articuloRelacionado.nombreImg, () => null);
        }
    }
    await articuloModel.destroy( //Eliminacion de tabla articulo
        { where: { id: articuloRelacionado.id } }
    );
    await detalleSemielaboradoModel.destroy({//Eliminacion de los detallesSemielaborados
        where: { semielaborado_id: semielaborado.id }
    })
    const semielaboradoEliminado = await semielaboradoModel.destroy(//Eliminacion de tabla semielaborados
        { where: { id: semielaborado.id } }
    );


    if (semielaboradoEliminado === 0) {
        res.json("Semielaborado no encontrado");
    } else {
        res.json({ message: "Eliminado con Exito" })
    }
})

//Modificar un semielaborado
router.put('/:id', upload.single('imagen'), async (req, res) => {
    const semielaborado = await semielaboradoModel.findOne(
        { where: { id: req.params.id } }
    );
    const articuloRelacionado = await articuloModel.findOne(
        { where: { id: semielaborado.articulo_id } }
    )
    if (articuloRelacionado) {
        //Modificacion de los atributos del Articulo
        if (req.file) {
            if (articuloRelacionado.nombreImg !== 'Sin imagen') {
                await fs.unlink('src/public/imgs/' + articuloRelacionado.nombreImg, () => null);
            }
            const { filename } = req.file;
            articulo = await articuloRelacionado.update({
                nombre: req.body.nombre,
                nombreImg: filename,
                categoria_id: req.body.categoria,
                unidadMedida: req.body.unidadMedida,
                stockMaximo: req.body.stockMaximo,
                stockMinimo: req.body.stockMinimo,
                stockActual: req.body.stockActual
            });
        } else {
            articulo = await articuloRelacionado.update({
                nombre: req.body.nombre,
                nombreImg: req.body.imagen,
                categoria_id: req.body.categoria,
                unidadMedida: req.body.unidadMedida,
                stockMaximo: req.body.stockMaximo,
                stockMinimo: req.body.stockMinimo,
                stockActual: req.body.stockActual
            });
        }
        await semielaborado.update({
            costoFabricacion: req.body.costoFabricacion
        })

        //Eliminacion de los detalleSemielaborado relacionado
        await detalleSemielaboradoModel.destroy({
            where: { semielaborado_id: semielaborado.id }
        })
        //Nueva asignacion de los detallesSemielaborados
        JSON.parse(req.body.insumos).forEach(async (insumo) => {
            await detalleSemielaboradoModel.create({
                cantidad: insumo.cantidad,
                semielaborado_id: semielaborado.id,
                insumo_id: insumo.id
            })
        })
        res.json({ message: 'Modificado con Exito' });
    } else {
        res.json("Semielaborado no encontrado");
    }
});
module.exports = router;