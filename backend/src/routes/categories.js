const { Router } = require('express');
const router = Router();
const  categorieModel  = require('../models/categorie');

router.get('/', async (req, res) => {
    const categories = await categorieModel.findAll();
    res.json(categories);
});

router.post('/', async (req, res) => {
    await categorieModel.create({
        nombre: req.body.nombre,
        tipo: req.body.tipo
    });
    res.redirect('/');
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
        res.send('/');
    }
});

//---------------------------------------------------------------Ver si hace falta
// router.get('/:id', async (req, res) => {
//     const categorie = await categorieModel.findOne(
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     );
//     if (categorie) {
//         res.json(categorie);
//     } else {
//         res.json("Categoria no encontrada");
//     }
// });

//---------------------------------------------------------------Ver si hace falta
// router.put('/:id', async (req, res) => {
//     const categorie = await categorieModel.findOne(
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     );
//     if (categorie) {
//         await categorie.update({
//             nombre: req.body.nombre
//         });
//         res.send('/');
//     } else {
//         res.json("Categoria no encontrada");
//     }
// });

module.exports = router;