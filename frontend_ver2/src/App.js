import './App.css';
import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Perfil from './components/comercio/views/VistaPerfil';
import VistaCocinero from './components/administracion/views/VistaCocinero';
import VistaCajero from './components/administracion/views/VistaCajero';
import VistaCarrito from './components/comercio/views/VistaCarrito';
import VistaCatalogo from './components/administracion/views/VistaCatalogo';
import VistaStock from './components/administracion/views/VistaStock';
import VistaCategorias from './components/administracion/views/VistaCategorias';
import VistaPedidos from './components/administracion/views/VistaPedidos';
import VistaExistencias from './components/administracion/views/VistaExistencias';
import VistaDashbord from './components/administracion/views/VistaDashbord';
import LandingPage from './components/comercio/views/LandingPage';
import Catalogo from './components/comercio/views/VistaCatalogoComercio';
import Login from './components/vistaLogin';
import Registro from './components/vistaRegistro';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RutaPrivada from './utils/RutaPrivada';
import HistorialPedidos from './components/comercio/views/HistorialPedidos';

function App() {

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {/* Vista Comercio */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/catalogo" component={Catalogo} />
        <RutaPrivada path="/historialPedidos" component={HistorialPedidos} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/carrito" component={VistaCarrito} />
        {/* Login / Registro */}
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Registro} />
        {/* Vistas Administrador */}
        <Route exact path="/admin" component={VistaDashbord} />
        <Route path="/admin/categorias" component={VistaCategorias} />
        <Route path="/admin/catalogo" component={VistaCatalogo} />
        <Route path="/admin/pedidos" component={VistaPedidos} />
        <Route path="/admin/existencias" component={VistaExistencias} />
        <Route path="/admin/stock" component={VistaStock} />
        {/* Vistas Cajero */}
        <Route path="/admin/cajero" component={VistaCajero} />
        {/* Vistas Cocinero */}
        <Route path="/admin/cocinero" component={VistaCocinero} />
      </Switch>
    </Router>
  );
}

export default App;
