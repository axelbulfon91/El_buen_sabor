const { Router } = require('express');
const router = Router();
const Domicilio = require('../models/Ubicacion/domicilio')
const Localidad = require('../models/Ubicacion/localidad')
const Provincia = require('../models/Ubicacion/provincia')
const Usuario = require('../models/usuario')


//Crea un domicilio para el usuario
router.post('/', async (req, res)=>{

    try{
        const domicilio = await Domicilio.create({
            id_usuario: req.body.id_usuario,
            calle: req.body.calle,
            numeracion: req.body.numeracion,
            detalle_adicional: req.body.detalle_adicional,
            id_localidad: req.body.id_localidad,       
        });
    
        res.json({'message': 'Domicilio agregado correctamente','domicilio': domicilio})

    }catch{(err)=> res.json({'Error de guardado: ': err })}   


})

//------------------------Probar rendimiento en velocidad de respuesta----------------------------

//Regresa todas las provincias y localidades para el llenado de los DropDowns-----------------------------------------Trae todo
router.get('/', async (req, res)=>{
    const prov_y_loc = await Provincia.findAll({
        attributes: { exclude: ['id_pais']},
        include: [{
            model: Localidad,
            attributes: ['id', 'nombre']
        }]
    });
    res.json({'provincias y localidades': prov_y_loc})
})

//Regresa todas las provincias para el llenado de los DropDowns------------------------------------------------------Trae provincias
router.get('/provincias', async (req, res)=>{    
    const provincias = await Provincia.findAll({
        attributes: { exclude: ['id_pais']},
    });
    res.json({'provincias': provincias})
})

//Regresa todas las localidades de la provincia indicada en el id para el llenado de los DropDowns------------------Trae localidades
router.get('/localidades/:id_provincia', async (req, res)=>{

    const localidades = await Localidad.findAll({
        attributes: { exclude: ['id_provincia']},
        where:{
            id_provincia: req.params.id_provincia
        }
    });
    res.json({'localidades': localidades})
})
//------------------------------------------------------------------------------------------------

//Regresa todos los domicilios del usuario del ID de parametro
router.get('/:id', async (req, res)=>{
    
    const domicilios = await Domicilio.findAll({
        attributes: { exclude: ['id_localidad', 'id_usuario']},
        where:{id_usuario: req.params.id},
        include: [{
            model: Localidad,
            attributes: ['id', 'nombre'],
            include: [{
                model: Provincia,
                attributes: ['id', 'nombre']                
            }]
        }]        
    })

    res.json({'domicilios': domicilios})
})

//Actualiza el Domicilio del usuario indicado en el parametro
router.put('/:id', async (req, res)=>{   

    const id_usuario = req.params.id
    const id_domicilio = req.body.id_domicilio

    const user = await Usuario.findOne({where:{id: id_usuario}})

    if(user){

        const domicilio = await Domicilio.findOne({where:{id: id_domicilio}})

        if(domicilio){

            const domicilioActualizado = await domicilio.update({                
                id_usuario: user.id,
                calle: req.body.calle,
                numeracion: req.body.numeracion,
                detalle_adicional: req.body.detalle_adicional,
                id_localidad: req.body.id_localidad,       
            });
            res.json({'message': 'Domicilio actualizado correctamente', 'domicilio': domicilioActualizado})

        }else{
            res.json({'message': 'Domicilio no encontrado'})
        }

    }else{
        res.json({'message': 'Usuario no encontrado'})
    }
    

})

//Elimina el Domicilio del usuario indicado en el parametro
router.delete('/:id', async (req, res)=>{
    const id_usuario = req.params.id
    const id_domicilio = req.body.id_domicilio

    const user = await Usuario.findOne({where:{id: id_usuario}})

    if(user){
        const eliminado = await Domicilio.destroy({
            where:{
                id_usuario: user.id,
                id: id_domicilio
            }
        });
    
        if(eliminado === 0){
            res.json({'message': 'Error al eliminar el domicilio'})
        }else{        
            res.json({'message': 'Domicilio eliminado correctamente'})
        }
    }else{
        res.json({'message': 'Usuario no encontrado'})
    }   

})

module.exports = router;