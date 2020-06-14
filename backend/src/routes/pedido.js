const { Router } = require('express');
const router = Router();
const  pedidoModel  = require('../models/pedido');
const  detalle_pedido_model  = require('../models/detalle_pedido');
const  elaboradoModel = require('../models/elaborado');
const  userModel  = require('../models/usuario');



router.post('/', async (req, res) => {

    const userID = req.body.id_usuario // Token ---> id_user
    const estado = req.body.estado // Estado del registro (Creado, Aceptado, En preparacion, Demorado, Listo, Entregado, En Delivery)
    const user = await userModel.findOne({where:{id: userID}})
    const productosPedidos = req.body.productosPedidos // Array de productos

    const venta = await pedidoModel.create({ //Creo venta a con id_usuario
        id_cliente: user.id,
        estado: estado
    })

    productosPedidos.forEach(async (item) => {
        await detalle_pedido_model.create({ //Creo un detalle por cada producto con su cantidad y lo asigno al id_venta
            id_venta: venta.id,
            id_producto: item.product.id,
            cantidad: item.cantidad
        });
    })

    res.status(200).json({ "respuesta": "OK"})

});

router.get('/', async (req, res) => {
    
    // Trae todos los pedidos de la base de datos
    const pedidos = await pedidoModel.findAll({              
        attributes: { exclude: ['id_cliente'] },
        include: [{               
            model: detalle_pedido_model,
            attributes: ['cantidad'],
            include: [{
                model: elaboradoModel
,
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
    const pedido = await pedidoModel.findOne({ // Busca ultima venta para el id del usuario solicitado

        where: {
            id_cliente: req.params.id
        }

    });

    if (pedido) {
        // Busca todos los detalles de la venta encontrada y trae el nombre y el precio de los productos
        const productos = await detalle_pedido_model.findAll({
            attributes: { exclude: ["createdAt", 'updatedAt', 'id_pedido', 'id', 'id_producto', 'elaborado_id'] },
            where: {
                id_pedido: pedido.id
            },        
            include: [{
                model: elaboradoModel,
                attributes: ['id', 'nombre', 'precio']
            }]
        });
        productos.forEach(async (detalle) => {
            total += (detalle.elaborado.dataValues.precio * detalle.cantidad) // Calcula El total de la compra para dicha venta
        });

        res.json({ "Pedido": pedido, "Productos": productos, "Precio Final": total });

    } else {
        res.status(403).json({ "mensaje": "Venta de usuario no encontrada" })
    }



});

router.delete('/:id', async (req, res) => {

});

router.put('/:id', async (req, res) => {
    
    const pedido = await pedidoModel.findOne({ 
        where: {
            id: req.params.id
        }
    });
    console.log(pedido)

    if(pedido){
        await pedido.update({
            estado: req.body.estado
        })
        
    }
    res.json({"Actualizado": "OK"})
});

module.exports = router;