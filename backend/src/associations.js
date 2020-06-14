////////////////Generacion de los Modelos
const elaboradoModel = require('./models/elaborado');
const userModel = require('./models/usuario');
const categorieModel = require('./models/categorie');
const ventaModel = require('./models/venta');
const articuloModel = require('./models/articulo');
const insumoModel = require('./models/insumo');
const detalle_venta_model = require('./models/detalle_venta');
const semielaboradoModel = require('./models/semielaborado');
const detalle_semielaboradoModel = require('./models/detalle_semielaborado');
const detalleElaboradoModel = require('./models/detalle_elaborado');
const existenciaModel = require('./models/existencia');
const ofertaModel = require('./models/oferta');

//Asociaciones entre Modelos
//Categoria
categorieModel.hasMany(elaboradoModel, { foreignKey: 'categoria_id' });
categorieModel.hasMany(articuloModel, { foreignKey: 'categoria_id' });

//Elaborado
elaboradoModel.belongsTo(categorieModel, { foreignKey: 'categoria_id' });
elaboradoModel.hasMany(detalle_venta_model, { foreignKey: 'id_elaborado' });
elaboradoModel.hasMany(detalleElaboradoModel, { foreignKey: 'elaborado_id' });
elaboradoModel.hasOne(ofertaModel, { foreignKey: 'elaborado_id' });

//Detalle_elaborado
detalleElaboradoModel.belongsTo(elaboradoModel, { foreignKey: 'elaborado_id' });
detalleElaboradoModel.belongsTo(articuloModel, { foreignKey: 'articulo_id' });

//Oferta
ofertaModel.belongsTo(elaboradoModel, { foreignKey: 'elaborado_id' });
ofertaModel.belongsTo(insumoModel, { foreignKey: 'insumo_id' });

//Cliente
userModel.hasMany(ventaModel, { foreignKey: 'id_cliente' });

//Venta
ventaModel.hasMany(detalle_venta_model, { foreignKey: 'id_venta' });
ventaModel.belongsTo(userModel, { foreignKey: 'id_cliente' });

//Detalle_venta
detalle_venta_model.belongsTo(elaboradoModel, { foreignKey: 'id_elaborado' });
detalle_venta_model.belongsTo(ventaModel, { foreignKey: 'id_venta' });

//Articulo
articuloModel.belongsTo(categorieModel, { foreignKey: 'categoria_id' });
articuloModel.hasOne(insumoModel, { foreignKey: 'articulo_id' });
articuloModel.hasOne(semielaboradoModel, { foreignKey: 'articulo_id' });
articuloModel.hasMany(existenciaModel, { foreignKey: 'articulo_id' });
articuloModel.hasMany(detalleElaboradoModel, { foreignKey: 'articulo_id' });

//Existencia
existenciaModel.belongsTo(articuloModel, { foreignKey: 'articulo_id' })

//Insumo
insumoModel.belongsTo(articuloModel, { foreignKey: 'articulo_id' })
insumoModel.hasMany(detalle_semielaboradoModel, { foreignKey: 'insumo_id' })
insumoModel.hasOne(ofertaModel, { foreignKey: 'insumo_id' })


//Semielaborado
semielaboradoModel.belongsTo(articuloModel, { foreignKey: 'articulo_id' })
semielaboradoModel.hasMany(detalle_semielaboradoModel, { foreignKey: 'semielaborado_id' })


//Detalle_semielaborado
detalle_semielaboradoModel.belongsTo(semielaboradoModel, { foreignKey: 'semielaborado_id' })
detalle_semielaboradoModel.belongsTo(insumoModel, { foreignKey: 'insumo_id' })