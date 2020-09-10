import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

const RutaPrivadaCajero = ({ component: Component, ...rest }) => {
  return(
    <Route
      {...rest}
      render={props => {
        var token
        try {
          token = jwtDecode(sessionStorage.getItem('token'))
        } catch {
          token = null
        }
        if(!token){
          alert('No hay usuario logueado')
          return <Redirect to='/' />
        }
        if (token.rol === "ADMINISTRADOR" || token.rol === "CAJERO") {
          return <Component {...props} />
        }
        alert('Debe ser ADMINISTRADOR o CAJERO para acceder aqui')
        return <Redirect to='/' />
      }}
    />
  )
}
export default RutaPrivadaCajero