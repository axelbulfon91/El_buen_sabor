const { Router } = require('express');
const router = Router();
const  categorieModel  = require('../models/categorie');

router.get('/', async (req, res) => {
    const categories = await categorieModel.findAll(
        {attributes:['id', 'nombre', 'tipo']}
    );
    res.json(categories);
});

router.post('/', async (req, res) => {
    await categorieModel.create({
        nombre: req.body.nombre,
        tipo: req.body.tipo
    });
    res.json({message: "Categoria creada con exito"});
});

router.delete('/:id', async (req, res) => {
    const catEliminada = await categorieModel.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    );
    if (catEliminada === 0) {
        res.json("Categoria no encontrada");
    } else {
        res.json({message: "Categoria borrada con exito"});
    }
});


module.exports = router;