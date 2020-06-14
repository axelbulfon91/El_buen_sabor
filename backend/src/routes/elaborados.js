const { Router } = require('express');
const router = Router();
const elaboradoModel = require('../models/elaborado')
const detalleElaboradoModel = require('../models/detalle_elaborado')
const categorieModel = require('../models/categorie');
const articuloModel = require('../models/articulo');
const fs = require('fs');
const upload = require('../lib/multerConfig');

//Creacion de un nuevo Elaborado
router.post('/', upload.single('imagen'), async (req, res) => {
    let elaborado = null;
    try {
        if (req.file) {
            const { filename } = req.file;
            elaborado = await elaboradoModel.create({
                nombre: req.body.nombre,
                categoria_id: req.body.categoria,
                precio: req.body.precio,
                detalle: req.body.detalle,
                esCatalogo: req.body.esCatalogo,
                nombreImg: filename
            });
        } else {
            elaborado = await elaboradoModel.create({
                nombre: req.body.nombre,
                categoria_id: req.body.categoria,
                precio: req.body.precio,
                detalle: req.body.detalle,
                esCatalogo: req.body.esCatalogo,
                nombreImg: 'Sin imagen'
            });
        }
        req.body.detalles.forEach(async (articulo) => {//Creacion de los detalles
            await detalleElaboradoModel.create({
                cantidad: articulo.cantidad,
                elaborado_id: elaborado.id,
                articulo_id: articulo.id
            })
        })
        res.json({ message: "Elaborado creado con exito" });
    } catch (error) {
        console.log(error);
        res.status(400).send("Peticion Invalida")
    }

});



//Trae todos los Elaborados
router.get('/', async (req, res) => {
    try {
        const elaborados = await elaboradoModel.findAll({
            attributes: ['id', 'nombre', 'precio', 'nombreImg', 'detalle', 'esCatalogo'],
            include: [{
                model: categorieModel,
                attributes: ['id','nombre', 'id']
            }, {
                model: detalleElaboradoModel,
                attributes: ['id','cantidad'],
                include: {
                    model: articuloModel,
                    attributes: ['id','nombre', 'unidadMedida']
                }
            }]
        });
        res.json(elaborados);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de Servidor")
    }


});

//Trae un solo Elaborado
router.get('/:id', async (req, res) => {
    try {
        const elaborados = await elaboradoModel.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'nombre', 'precio', 'nombreImg', 'detalle', 'esCatalogo'],
            include: [{
                model: categorieModel,
                attributes: ['id','nombre', 'id']
            }, {
                model: detalleElaboradoModel,
                attributes: ['id','cantidad'],
                include: {
                    model: articuloModel,
                    attributes: ['id','nombre', 'unidadMedida']
                }
            }]
        });
        res.json(elaborados);
    } catch (error) {
        console.log(error);
        res.status(400).send("Peticion Invalida")
    }
});


//Eliminar un Elaborado
router.delete('/:id', async (req, res) => {
    try {
        const elaborado = await elaboradoModel.findOne(
            { where: { id: req.params.id } }
        );
        if (elaborado) {//Eliminado de la imagen del servidor
            if (elaborado.nombreImg !== '') {
                await fs.unlink('src/public/imgs/' + elaborado.nombreImg, () => null);
            }
        }
        //Eliminado de los detalleElaborados
        await detalleElaboradoModel.destroy({
            where: { elaborado_id: elaborado.id }
        })
        //Eliminado del Elaborado
        await elaboradoModel.destroy(
            { where: { id: req.params.id } }
        );

        res.json({ message: 'Borrado con Exito' })
    } catch (error) {
        console.log(error);
        res.status(400).send("Peticion Invalida")
    }


});

//Modificar un elaborado
router.put('/:id', upload.single('imagen'), async (req, res) => {
    try {
        let elaborado = await elaboradoModel.findOne(
            { where: { id: req.params.id } }
        );
            if (elaborado.nombreImg !== 'Sin imagen') {
                await fs.unlink('src/public/imgs/' + elaborado.nombreImg, () => null);
            }
            //Modificacion de los atributos del elaborado
            if (req.file) {
                const { filename } = req.file;
                elaborado = await elaborado.update({
                    nombre: req.body.nombre,
                    categoria_id: req.body.categoria,
                    precio: req.body.precio,
                    detalle: req.body.detalle,
                    esCatalogo: req.body.esCatalogo,
                    nombreImg: filename
                });
            } else {
                elaborado = await elaborado.update({
                    nombre: req.body.nombre,
                    categoria_id: req.body.categoria,
                    precio: req.body.precio,
                    detalle: req.body.detalle,
                    esCatalogo: req.body.esCatalogo,
                    nombreImg: 'Sin imagen'
                });
            }
            //Eliminacion de los detalleRelaborado relacionados
            await detalleElaboradoModel.destroy({
                where: { elaborado_id: elaborado.id }
            })
            //Nueva asignacion de los detallesSemielaborados
            req.body.detalles.forEach(async (articulo) => {//Creacion de los detalles
                await detalleElaboradoModel.create({
                    cantidad: articulo.cantidad,
                    elaborado_id: elaborado.id,
                    articulo_id: articulo.id
                })
            })
            res.json({ message: 'Modificado con Exito' });

    } catch (error) {
        console.log(error);
        res.status(400).send("Peticion Invalida")
    }

});

module.exports = router;