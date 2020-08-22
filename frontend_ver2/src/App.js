import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Perfil from './components/comercio/views/VistaPerfil';
import VistaCocinero from './components/administracion/views/VistaCocinero';
import VistaCajero from './components/administracion/views/VistaCajero';
import VistaCarrito from './components/comercio/views/VistaCarrito';
import VistaCatalogo from './components/administracion/views/VistaCatalogo';
import VistaStock from './components/administracion/views/VistaStock';
import VistaCategorias from './components/administracion/views/VistaCategorias';
import VistaPedidos from './components/administracion/views/VistaPedidos';
import VistaExistencias from './components/administracion/views/VistaExistencias';
import LandingPage from './components/comercio/views/LandingPage';
import Catalogo from './components/comercio/views/VistaCatalogoComercio';


function App() {

  return (

    <Switch>
      {/* Vista Comercio */}
      <Route exact path="/" component={LandingPage} />
      <Route path="/catalogo" component={Catalogo} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/carrito" component={VistaCarrito} />
      {/* Vistas Administrador */}
      <Route path="/admin/categorias" component={VistaCategorias} />
      <Route path="/admin/catalogo" component={VistaCatalogo} />
      <Route path="/admin/pedidos" component={VistaPedidos} />
      <Route path="/admin/existencias" component={VistaExistencias} />
      <Route path="/admin" component={VistaStock} />
      {/* Vistas Cajero */}
      <Route path="/cajero" component={VistaCajero} />
      {/* Vistas Cocinero */}
      <Route path="/cocinero" component={VistaCocinero} />
    </Switch>
  );
}

export default App;
