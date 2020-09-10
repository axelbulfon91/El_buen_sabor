import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

const RutaPrivadaAdmin = ({ component: Component, ...rest }) => {
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
        if (token.rol === "ADMINISTRADOR") {
          return <Component {...props} />
        }
        alert('Debe ser Administrador para acceder aqui')
        return <Redirect to='/' />
      }}
    />
  )
}
export default RutaPrivadaAdmin