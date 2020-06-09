const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const cors = require('cors');
const flash = require('connect-flash');

//Inicializaciones
const app = express();
require('./database');
require('./lib/passport-local');

//Configuraciones
app.set('port', process.env.PORT || 4000);
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

//Middlewares    
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(flash());
app.use(session({
    secret: 'misecreto',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/categorias', require('./routes/categories'));
app.use('/api/pedidos', require('./routes/pedido'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Inicio de servidor
app.listen(app.get('port'), ()=> {
    console.log("Servidor en puerto " + app.get('port'));
});