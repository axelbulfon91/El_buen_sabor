import './App.css';
import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Perfil from './components/comercio/views/VistaPerfil';
import VistaCocinero from './components/administracion/views/VistaCocinero';
import VistaCajero from './components/administracion/views/VistaCajero';
import VistaCarrito from './components/comercio/views/VistaCarrito';
import VistaCatalogo from './components/administracion/views/VistaCatalogo';
import VistaStock from './components/administracion/views/VistaStock';
import VistaCategorias from './components/administracion/views/VistaCategorias';
import VistaPedidos from './components/administracion/views/VistaPedidos';
import VistaDatosNegocio from './components/administracion/views/VistaDatosNegocio';
import VistaUsuarios from './components/administracion/views/VistaUsuarios';
import VistaExistencias from './components/administracion/views/VistaExistencias';
import VistaDashbord from './components/administracion/views/VistaDashbord';
import LandingPage from './components/comercio/views/LandingPage';
import Catalogo from './components/comercio/views/VistaCatalogoComercio';
import Login from './components/vistaLogin';
import Registro from './components/vistaRegistro';
import CambioPassword from './components/CambioPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RutaPrivada from './utils/RutaPrivada';
import HistorialPedidos from './components/comercio/views/HistorialPedidos';
import RutaPrivadaCajero from './utils/RutaPrivadaCajero';
import RutaPrivadaCocinero from './utils/RutaPrivadaCocinero';
import RutaPrivadaAdmin from './utils/RutaPrivadaAdmin';
import DatosContext from './datosLocalContext';
import Axios from 'axios';
import { useState } from 'react';


function App() {

  const [datos, setDatos] = useState(null)

  useEffect(() => {
    document.title = "Goood Taste!"
    Axios.get('http://localhost:4000/api/datosGenerales/1').then((resp) => {
      setDatos(resp.data)
    })
  }, [])

  return (
    <Router>
      <DatosContext.Provider value={datos}>
        <ToastContainer />
        <Switch>
          {/* Login / Registro */}
          <Route path="/login" component={Login} />
          <Route path="/registro" component={Registro} />
          {/* Vista Comercio */}
          <Route exact path="/" component={LandingPage} />
          <Route path="/catalogo" component={Catalogo} />
          <RutaPrivada path="/historialPedidos" component={HistorialPedidos} />
          <RutaPrivada path="/perfil" component={Perfil} />
          <Route path="/carrito" component={VistaCarrito} />
          <Route path="/recuperarPassword/:email" component={CambioPassword} />
          {/* Vistas Administrador */}
          <RutaPrivadaAdmin exact path="/admin/categorias" component={VistaCategorias} />
          <RutaPrivadaAdmin exact path="/admin/catalogo" component={VistaCatalogo} />
          <RutaPrivadaAdmin exact path="/admin/pedidos" component={VistaPedidos} />
          <RutaPrivadaAdmin exact path="/admin/existencias" component={VistaExistencias} />
          <RutaPrivadaAdmin exact path="/admin/usuarios" component={VistaUsuarios} />
          <RutaPrivadaAdmin exact path="/admin/negocio" component={VistaDatosNegocio} />
          <RutaPrivadaAdmin exact path="/admin/stock" component={VistaStock} />
          <RutaPrivadaAdmin exact path="/admin" component={VistaStock} />
          {/* Vistas Cajero */}
          <RutaPrivadaCajero path="/admin/cajero" component={VistaCajero} />
          {/* Vistas Cocinero */}
          <RutaPrivadaCocinero path="/admin/cocinero" component={VistaCocinero} />
        </Switch>
      </DatosContext.Provider>
    </Router>
  );
}

export default App;
