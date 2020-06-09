const { Router } = require('express');
const router = Router();
const { ventaModel } = require('../database');
const { detalle_venta_model } = require('../database');
const { productModel } = require('../database');
const { userModel } = require('../database');



router.post('/', async (req, res) => {

    const userID = req.body.id_usuario // Token ---> id_user
    const estado = req.body.estado // Estado del registro (Creado, Aceptado, En preparacion, Demorado, Listo, Entregado, En Delivery)
    const user = await userModel.findOne({where:{id: userID}})
    const productosPedidos = req.body.productosPedidos // Array de productos

    const venta = await ventaModel.create({ //Creo venta a con id_usuario
        id_cliente: user.id,
        estado: estado
    })

    productosPedidos.forEach(async (item) => {
        await detalle_venta_model.create({ //Creo un detalle por cada producto con su cantidad y lo asigno al id_venta
            id_venta: venta.id,
            id_producto: item.product.id,
            cantidad: item.cantidad
        });
    })

    res.status(200).json({ "respuesta": "OK"})

});

router.get('/', async (req, res) => {
    
    // Trae todos los pedidos de la base de datos
    const pedidos = await ventaModel.findAll({              
        attributes: { exclude: ['id_cliente'] },
        include: [{               
            model: detalle_venta_model,
            attributes: ['cantidad'],
            include: [{
                model: productModel,
                attributes: ['id','nombre', 'precio']
            }]                        
        },{
            model: userModel,
            attributes: ['id','nombre']            
        }] 
    });
    res.json({ "pedidos": pedidos });
});

router.get('/:id', async (req, res) => {

    var total = 0
    const venta = await ventaModel.findOne({ // Busca ultima venta para el id del usuario solicitado

        where: {
            id_cliente: req.params.id
        }

    });

    if (venta) {
        // Busca todos los detalles de la venta encontrada y trae el nombre y el precio de los productos
        const productos = await detalle_venta_model.findAll({
            attributes: { exclude: ["createdAt", 'updatedAt', 'id', 'id_venta', 'id_producto'] },
            where: {
                id_venta: venta.id
            },        
            include: [{
                model: productModel,
                attributes: ['id', 'nombre', 'precio']
            }]
        });

        productos.forEach(async (detalle) => {
            total += (detalle.Producto.dataValues.precio * detalle.cantidad) // Calcula El total de la compra para dicha venta
        });

        res.json({ "Venta": venta, "Productos": productos, "Precio Final": total });

    } else {
        res.status(403).json({ "mensaje": "Venta de usuario no encontrada" })
    }



});

router.delete('/:id', async (req, res) => {

});

router.put('/:id', async (req, res) => {
    
    const venta = await ventaModel.findOne({ 
        where: {
            id: req.params.id
        }
    });
    console.log(venta)

    if(venta){
        await venta.update({
            estado: req.body.estado
        })
        
    }
    res.json({"Actualizado": "OK"})
});

module.exports = router;