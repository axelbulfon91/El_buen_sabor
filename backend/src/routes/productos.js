const { Router } = require('express');
const router = Router();
const path = require('path');
const { productModel, categorieModel } = require('../database');
const multer = require('multer');
const fs = require('fs');

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

router.get('/', async (req, res) => {
    const products = await productModel.findAll({
        include: [{
            model: categorieModel,
            attributes: ['nombre', 'id']
        }]
    });
    res.json(products);
});

router.post('/', upload.single('imagen'), async (req, res) => {
    
    if(req.file){

        const {filename} = req.file;

        await productModel.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            detalle: req.body.detalle,
            nombreImg: filename,
            categoria_id : req.body.categoria
        });
    }else{

        await productModel.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            detalle: req.body.detalle,
            nombreImg: 'Sin imagen',
            categoria_id : req.body.categoria
        });
    }
    res.redirect('/');
    
});

router.get('/:id', async (req, res) => {
    const product = await productModel.findOne(
        {
            where: {
                id: req.params.id
            }
        }
    );
    if (product) {
        res.json(product);
    } else {
        res.json("Producto no encontrado");
    }
});

router.put('/:id',upload.single('imagen'), async (req, res) => {
    const product = await productModel.findOne(
        {
            where: {
                id: req.params.id
            }
        }
    );

    if (product) {

        
        if(product.nombreImg !== ''){
            await fs.unlink('src/public/imgs/' + product.nombreImg, ()=> null);
        }        

        if(req.file){

            const {filename} = req.file;
            await product.update({
                nombre: req.body.nombre,
                precio: req.body.precio,
                detalle: req.body.detalle,
                nombreImg: filename,
                categoria_id : req.body.categoria
            }); 

        }else{

            await product.update({
                nombre: req.body.nombre,
                precio: req.body.precio,
                detalle: req.body.detalle,
                nombreImg: 'Sin imagen',
                categoria_id : req.body.categoria
            });
        }

        res.send('/');

    } else {
        res.json("Producto no encontrado");
    }

});

router.delete('/:id', async (req, res) => {

    const product = await productModel.findOne(
        {
            where: {
                id: req.params.id
            }
        }
    );
    if(product){
        if(product.nombreImg !== ''){
            await fs.unlink('src/public/imgs/' + product.nombreImg, ()=> null);
        }
    }

    const eliminado = await productModel.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    );
    
    if (eliminado === 0) {
        res.json("Producto no encontrado");
    }else{
        res.send('/');
    }
    
});


module.exports = router;