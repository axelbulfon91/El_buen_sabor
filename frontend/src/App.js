import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import LandingPage from './components/Componentes-Cliente/LandingPage';
import Carrito from './components/Componentes-Cliente/Carrito';
import ProductList from './components/Componentes-Admin/ProductList';
import CrearProducto from './components/Componentes-Admin/CrearProducto';
import CrearCategoria from './components/Componentes-Admin/CrearCategoria';
import UserProfile from './components/Componentes-Cliente/UserProfile';
import UserLogin from './components/Componentes-Cliente/UserLogin';
import LoginAdmin from './components/Componentes-Admin/LoginAdmin';
import UserRegister from './components/Componentes-Cliente/UserRegister';
import InfoNegocio from './components/Componentes-Admin/InfoNegocio';
function App() {

  return (

      <Router>
          <Navigation/>

            <div className="container p-4">

              <Route exact path="/" component={LandingPage}></Route>

              <Route exact path="/registro" component={UserRegister}></Route>
              <Route exact path="/login" component={UserLogin}></Route>
              <Route exact path="/profile" component={UserProfile}></Route>
              <Route exact path="/carrito" component={Carrito}></Route>

              <Route exact path="/admin" component={LoginAdmin}></Route>
              <Route exact path="/admin/gestionarProducts" component={ProductList}></Route>
              <Route exact path="/admin/editarNegocio" component={InfoNegocio}></Route>
              <Route exact path="/admin/crearProducto" component={CrearProducto}></Route>              
              <Route exact path="/admin/editarProducto/:id" component={CrearProducto}></Route>
              <Route exact path="/admin/crearCategoria" component={CrearCategoria}></Route>
            </div>      
       
      </Router>

  );
}

export default App;
