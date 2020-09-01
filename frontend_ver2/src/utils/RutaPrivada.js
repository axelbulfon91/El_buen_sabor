import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RutaPrivada = ({ component: Component, ...rest }) => {
  return(
    <Route
      {...rest}
      render={props => {
        if (sessionStorage.getItem('token')) {
          return <Component {...props} />
        }
        alert('Usuario no logueado')
        return <Redirect to='/login' />
      }}
    />
  )
}
export default RutaPrivada