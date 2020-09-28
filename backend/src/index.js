const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const app = express();
const cors = require('cors');
require('dotenv').config({path: 'src/.env'})


//Inicializaciones
require('./database');
//require('./lib/passport-local'); //Indico los middlewares de autentificacion que voy a usar

//Configuraciones

app.use(cors());
app.set('port', process.env.PORT || 4000);

//Middlewares    
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());


//Rutas
  //Usuarios
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/usuarios/domicilios', require('./routes/domicilio'));
  //Pedidos
app.use('/api/pedidos', require('./routes/pedido'));
  //Productos
app.use('/api/productos/insumos', require('./routes/insumos'));
app.use('/api/productos/semielaborados', require('./routes/semielaborados'));
app.use('/api/productos/elaborados', require('./routes/elaborados'));
app.use('/api/productos/categorias', require('./routes/categories'));
app.use('/api/productos/ofertas', require('./routes/ofertas'));
app.use('/api/productos/bebidas', require('./routes/bebidas'));
app.use('/api/productos/existencias', require('./routes/existencias'));
  //Facturas
app.use('/api/facturas', require('./routes/facturas'));
  //Datos de negocio
app.use('/api/datosGenerales', require('./routes/datosGenerales'));

app.use('/api/enviarEmail', require('./routes/enviarEmail'));



//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Inicio de servidor
app.listen(app.get('port'), () => {
  console.log("Servidor en puerto " + app.get('port'));
});