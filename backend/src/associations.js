////////////////Generacion de los Modelos
const elaboradoModel = require('./models/elaborado');
const userModel = require('./models/usuario');
const categorieModel = require('./models/categorie');
const pedidoModel = require('./models/pedido');
const articuloModel = require('./models/articulo');
const insumoModel = require('./models/insumo');
const detalle_pedido_model = require('./models/detalle_pedido');
const semielaboradoModel = require('./models/semielaborado');
const detalle_semielaboradoModel = require('./models/detalle_semielaborado');
const detalle_elaboradoModel = require('./models/detalle_elaborado');
const existenciaModel = require('./models/existencia');
const facturaModel = require('./models/factura')
const domicilioModel = require('./models/Ubicacion/domicilio');
const localidadModel = require('./models/Ubicacion/localidad');
const provinciaModel = require('./models/Ubicacion/provincia');
const paisModel = require('./models/Ubicacion/pais');

//Asociaciones entre Modelos
//Categoria
categorieModel.hasMany(elaboradoModel, { foreignKey: 'categoria_id' });
categorieModel.hasMany(articuloModel, { foreignKey: 'categoria_id' });

//Elaborado
elaboradoModel.belongsTo(categorieModel, { foreignKey: 'categoria_id' });

//Detalle_elaborado
detalle_elaboradoModel.belongsTo(elaboradoModel, { foreignKey: 'elaborado_id' });
detalle_elaboradoModel.belongsTo(articuloModel, { foreignKey: 'articulo_id' });

//Cliente
userModel.hasMany(pedidoModel, { foreignKey: 'id_cliente' });

//Pedido
pedidoModel.hasMany(detalle_pedido_model, { foreignKey: 'id_pedido'});
pedidoModel.belongsTo(userModel, { foreignKey: 'id_cliente' });

//Detalle_pedido
detalle_pedido_model.belongsTo(elaboradoModel, { foreignKey: 'elaborado_id' });
detalle_pedido_model.belongsTo(pedidoModel, { foreignKey: 'id_pedido' });

//Factura
facturaModel.belongsTo(pedidoModel,{ foreignKey: 'id_pedido'})
facturaModel.belongsTo(userModel,{ foreignKey: 'id_cajero'})

//Articulo
articuloModel.belongsTo(categorieModel, { foreignKey: 'categoria_id' });
articuloModel.hasOne(insumoModel, { foreignKey: 'articulo_id' });
articuloModel.hasOne(semielaboradoModel, { foreignKey: 'articulo_id' });
articuloModel.hasMany(existenciaModel, { foreignKey: 'articulo_id' });

//Existencia
existenciaModel.belongsTo(articuloModel, { foreignKey: 'articulo_id' })

//Insumo
insumoModel.belongsTo(articuloModel, { foreignKey: 'articulo_id' })
insumoModel.hasMany(detalle_semielaboradoModel, { foreignKey: 'insumo_id' })

//Semielaborado
semielaboradoModel.belongsTo(articuloModel, { foreignKey: 'articulo_id' })
semielaboradoModel.hasMany(detalle_semielaboradoModel, { foreignKey: 'semielaborado_id' })

//Detalle_semielaborado
detalle_semielaboradoModel.belongsTo(semielaboradoModel, { foreignKey: 'semielaborado_id' })
detalle_semielaboradoModel.belongsTo(insumoModel, { foreignKey: 'insumo_id' })

//Usuario - Domicilio
paisModel.hasMany(provinciaModel, { foreignKey: 'id_pais' })
provinciaModel.belongsTo(paisModel, { foreignKey: 'id_pais' })
provinciaModel.hasMany(localidadModel, { foreignKey: 'id_provincia' })
localidadModel.belongsTo(provinciaModel, { foreignKey: 'id_provincia' })
localidadModel.hasMany(domicilioModel, { foreignKey: 'id_localidad' })
domicilioModel.belongsTo(localidadModel, { foreignKey: 'id_localidad' })
userModel.hasMany(domicilioModel, { foreignKey: 'id_usuario' })
domicilioModel.belongsTo(userModel, { foreignKey: 'id_usuario' })


