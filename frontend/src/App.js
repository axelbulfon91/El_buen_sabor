import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import VistaStock from "./administracion/views/VistaStock";
import './App.css';

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import Index from "views/Index.js";
import LoginPage from "views/LoginPage.js";
import RegisterPage from "views/RegisterPage.js";
import Catalogo from "views/Catalogo.js";
import Detalle from "views/Detalle.js";
import Carrito from "views/Pedidos/Carrito";
import HistorialPedidos from 'views/Pedidos/HistorialPedidos';
import { UserContext } from './UserContext';

//utils
import RutaPrivada from './utils/RutaPrivada';


function App() {

  const [usuario, setUsuario] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);

  return (


    <BrowserRouter>
      <UserContext.Provider value={{ usuario, setUsuario, loggedIn, setLoggedIn }}>

        <IndexNavbar />
        <Switch>
          <Route exact path="/" render={(props) => <Index {...props} />} />
          <Route
            exact path="/LoginPage"
            render={(props) => <LoginPage {...props} />}
          />
          <Route
            exact path="/admin"
            render={(props) => <VistaStock {...props} />}
          />
          <Route
            exact path="/RegisterPage"
            render={(props) => <RegisterPage {...props} />}
          />
          <RutaPrivada
            exact path="/carrito"
            // render={(props) => <Carrito {...props} />}
            component={Carrito}
          />
          <RutaPrivada
            exact path="/historialPedidos"
            // render={(props) => <HistorialPedidos {...props} />}
            component={HistorialPedidos}
          />
          <Route
            exact path="/Catalogo"
            render={(props) => <Catalogo {...props} />}
          />
          <Route
            exact path="/Detalle/:valor"
            render={(props) => <Detalle {...props} />}
          />
          <Redirect to="/" />
        </Switch>

        <Footer />
      </UserContext.Provider>
    </BrowserRouter>






  );
}

export default App;
