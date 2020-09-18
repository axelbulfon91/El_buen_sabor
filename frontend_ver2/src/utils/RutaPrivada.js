import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

const RutaPrivada = ({ component: Component, ...rest }) => {
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
        if (token) {
          return <Component {...props} />
        }
        alert('Usuario no logueado')
        return <Redirect to='/login' />

      }}
    />
  )
}
export default RutaPrivada