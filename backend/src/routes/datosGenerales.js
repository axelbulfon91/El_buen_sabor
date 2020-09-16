const { Router } = require('express');
const router = Router();
const DatosGenerales = require('../models/datosGenerales');
const Domicilio = require('../models/Ubicacion/domicilio');
const localidadModel = require('../models/Ubicacion/localidad');
const provinciaModel = require('../models/Ubicacion/provincia');


//Crea datos del local 
router.post('/', async (req, res) => {

    const horarios = JSON.stringify(req.body.horarios) //Recibe el objeto de dias y horarios y lo guarda en formato String

    try {

        const local = await DatosGenerales.create({
            telefono: req.body.telefono,
            //email: req.body.email,
            horarios: horarios,
        });
        console.log(local.dataValues)

        await Domicilio.create({
            id_local: local.dataValues.id,
            calle: req.body.calle,
            numeracion: req.body.numeracion,
            id_localidad: req.body.id_localidad,
        });

    } catch{ (err) => res.json({ 'Error de guardado: ': err }) }

    res.json("Datos Guardados")
})

//Devolver datos del local del id especificado
router.get('/:id', async (req, res) => {
    const local = await DatosGenerales.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
            model: Domicilio,
            attributes: { exclude: ['id_usuario', 'id_local', 'id_localidad', 'detalle_adicional'] },
            include: [{
                model: localidadModel,
                attributes: { exclude: ['id_provincia'] },
                include: [{
                    model: provinciaModel,
                }]
            }]
        }]
    })

    if (local) {
        local.dataValues.horarios = JSON.parse(local.dataValues.horarios)
        res.json(local)
    } else {
        res.json({ message: "Local no encontrado" })
    }
})

//Actualizar datos del local del id especificado
router.put('/:id', async (req, res) => {

    const local = await DatosGenerales.findOne({
        where: { id: req.params.id }
    });

    if(local){

        const nuevoshorarios = JSON.stringify(req.body.horarios)
        await local.update({
            telefono: req.body.telefono,
            //email: req.body.email,
            horarios: nuevoshorarios,
        })
        res.json({message: "Datos actualizados"})
    }else{
        res.json({message: "Local no encontrado"})
    }
})

//Elimina local del id especificado
router.delete('/:id', async (req, res) => {
    try {
        await DatosGenerales.destroy({
            where: { id: req.params.id }
        })
        res.json({ 'message': "Local Eliminado" })
    } catch (error) {
        console.log(error);
        res.json({ 'message': 'No se pudo elimnar' })
    }
});

module.exports = router;