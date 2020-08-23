import React, { Fragment, useEffect, useState } from 'react'
import BarraNavegacion from '../uso_compartido/BarraNavegacion';
import SeccionHero from '../SeccionHero';
import SeccionDestacados from '../SeccionDestacados';
import SeccionContacto from '../SeccionContacto';
import Footer from '../uso_compartido/Footer';
import estilos from '../../../assets/css/LandingPage.module.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


const LandingPage = () => {
    const [ofertas, setOfertas] = useState(null);



    useEffect(() => {
        axios.get("http://localhost:4000/api/productos/ofertas")
            .then((res) => setOfertas(res.data))

        //Revisa si hay token (usuario logueado) y si hay muestra la data del mismo para ver su rol    
        if (localStorage.getItem('token')) {
            const userData = jwtDecode(localStorage.getItem('token'));
            console.log({"Usuario logueado " : userData})
        }
    }, [])

    return (
        <Fragment>
            <div className={estilos.fondo}></div>
            <BarraNavegacion></BarraNavegacion>
            <SeccionHero></SeccionHero>
            <SeccionDestacados ofertas={ofertas}></SeccionDestacados>
            <SeccionContacto></SeccionContacto>
            <Footer></Footer>
        </Fragment>

    )
}

export default LandingPage
