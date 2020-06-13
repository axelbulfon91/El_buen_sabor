const { Router } = require('express');
const insumoModel = require('../models/insumo');
const articuloModel = require('../models/articulo');
const router = Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

//Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/public/imgs');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 //Peso de imagen maximo (5MB)
    },
    fileFilter : fileFilter
});


//ABM
router.post('/', upload.single('imagen'), async (req, res) => {
    
    if(req.file){

        const {filename} = req.file;

        await articuloModel.create({
            nombre: req.body.nombre,
            nombreImg: filename,
            categoria_id : req.body.categoria,
            unidadMedida: req.body.unidadMedida,
            stockMaximo: req.body.stockMaximo,
            stockMinimo: req.body.stockMinimo,
            stockActual: 0
        });
    }else{
        await articuloModel.create({
            nombre: req.body.nombre,
            nombreImg: 'Sin Imagen',
            categoria_id : req.body.categoria,
            unidadMedida: req.body.unidadMedida,
            stockMaximo: req.body.stockMaximo,
            stockMinimo: req.body.stockMinimo,
            stockActual: 0
        });
        

    }
    res.redirect('/');
    
});


module.exports = router;