const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
const elaboradoModel = require('../models/elaborado')
const categorieModel = require('../models/categorie');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/imgs');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //Peso de imagen maximo (5MB)
    },
    fileFilter: fileFilter
});

router.get('/', async (req, res) => {
    const elaborados = await elaboradoModel.findAll({
            include: [{
                model: categorieModel,
                attributes: ['nombre', 'id']
            }]
        });
    res.json(elaborados);
});

router.post('/', upload.single('imagen'), async (req, res) => {

    if (req.file) {

        const { filename } = req.file;

        await elaboradoModel
            .create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                detalle: req.body.detalle,
                nombreImg: filename,
                categoria_id: req.body.categoria
            });
    } else {

        await elaboradoModel
            .create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                detalle: req.body.detalle,
                nombreImg: 'Sin imagen',
                categoria_id: req.body.categoria
            });
    }
    res.redirect('/');

});

router.get('/:id', async (req, res) => {
    const elaborado = await elaboradoModel
        .findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        );
    if (elaborado) {
        res.json(elaborado
        );
    } else {
        res.json("Producto no encontrado");
    }
});

router.put('/:id', upload.single('imagen'), async (req, res) => {
    const elaborado
        = await elaboradoModel
            .findOne(
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

    if (elaborado) {


        if (elaborado.nombreImg !== '') {
            await fs.unlink('src/public/imgs/' + elaborado
                .nombreImg, () => null);
        }

        if (req.file) {

            const { filename } = req.file;
            await elaborado
                .update({
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    detalle: req.body.detalle,
                    nombreImg: filename,
                    categoria_id: req.body.categoria
                });

        } else {

            await elaborado.update({
                nombre: req.body.nombre,
                precio: req.body.precio,
                detalle: req.body.detalle,
                nombreImg: 'Sin imagen',
                categoria_id: req.body.categoria
            });
        }

        res.send('/');

    } else {
        res.json("Producto no encontrado");
    }

});

router.delete('/:id', async (req, res) => {

    const elaborado = await elaboradoModel
        .findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        );
    if (elaborado) {
        if (elaborado.nombreImg !== '') {
            await fs.unlink('src/public/imgs/' + elaborado
                .nombreImg, () => null);
        }
    }

    const eliminado = await elaboradoModel
        .destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        );

    if (eliminado === 0) {
        res.json("Producto no encontrado");
    } else {
        res.send('/');
    }

});


module.exports = router;