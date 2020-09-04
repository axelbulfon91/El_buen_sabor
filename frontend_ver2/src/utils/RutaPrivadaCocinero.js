import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

const RutaPrivadaCocinero = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        var token
        try {
          token = jwtDecode(sessionStorage.getItem('token'))
        } catch {
          token = null
        }
        if (!token) {
          alert('No hay usuario logueado')
          return <Redirect to='/' />
        }
        if (token.rol === "ADMINISTRADOR" || token.rol === "COCINERO") {
          return <Component {...props} />
        }
        alert('Debe ser ADMINISTRADOR o COCINERO para acceder aqui')
        return <Redirect to='/' />
      }}
    />
  )
}
export default RutaPrivadaCocinero