
import React from "react";
import axios from 'axios';

// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function IndexNavbar() {


  const[rolUsuario, setRolUsuario] = React.useState(null);
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  let botonera = "";

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  /* ==========================
      EFECTO SCROLL DEL NAVBAR
  =============================*/
  React.useEffect(() => {

    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };

  });

   /* ==========================
      VALIDACION DE TIPO DE USUARIO
  =============================*/
  React.useEffect(() => {

    const rolDeUsuario = () => {
      //const res = await axios.get('http://localhost:4000/api/session');
        setRolUsuario(1);
    }

    rolDeUsuario();

    return function cleanup() {
      setRolUsuario(0);
    };

  });


  switch (rolUsuario) {
    case 1:
      
    botonera =
      <Nav navbar>
        <NavItem>
          <NavLink
            data-placement="bottom"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            title="Like us on Facebook"
          >
            <i className="fa fa-facebook-square" />
            <p className="d-lg-none">Facebook</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            data-placement="bottom"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            title="Follow us on Instagram">
            <i className="fa fa-instagram" />
            <p className="d-lg-none">Instagram</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            data-placement="bottom"
            href="/Catalogo"
            target="">
            <i className="fas fa-pizza-slice pr-2" aria-hidden="true"></i>
            <p>Catalogo</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
             data-placement="bottom"
            href="/Perfil"
            target="">
            <i className="fa fa-user pr-2" aria-hidden="true"></i>
            <p>Perfil</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            data-placement="bottom"
            href="/Carrito"
            target="">
            <i className="fa fa-shopping-cart" ></i>
            <p className="d-lg-none">Carrito</p>
          </NavLink>
        </NavItem>
      </Nav>;
    
    break;

    case 2:

    botonera = <Nav navbar>
      <NavItem>
          <NavLink
            data-placement="bottom"
            href="/Catalogo"
            target="">
            <i className="fas fa-pizza-slice pr-2" aria-hidden="true"></i>
            <p>Catalogo</p>
          </NavLink>
        </NavItem>
      <NavItem>
        <NavLink
          data-placement="bottom"
          href="/LoginPage"
          target="">
          <i className="fa fa-user pr-2" aria-hidden="true"></i>
          <p>Perfil</p>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          data-placement="bottom"
          href="/Cajero"
          target="">
          <i className="fas fa-cash-register pr-2" style={{fontSize:15}}></i>
          <p>Caja</p>
        </NavLink>
      </NavItem>
    </Nav>;
    
    break;

    case 3:
    
      botonera = 
    <Nav navbar>
      <NavItem>
          <NavLink
           data-placement="bottom"
            href="/Perfil"
            target="">
            <i className="fa fa-user pr-2" aria-hidden="true"></i>
            <p>Perfil</p>
          </NavLink>
        </NavItem>
      <NavItem>
        <NavLink
          data-placement="bottom"
          href="/Cajero"
          target="">
          <i className="fas fa-pizza-slice pr-2" style={{fontSize:15}}></i>
          <p>Cocina</p>
        </NavLink>
      </NavItem>
    </Nav>;

    break;

    default:

      botonera =
      <Nav navbar>
        <NavItem>
          <NavLink
            data-placement="bottom"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            title="Like us on Facebook"
          >
            <i className="fa fa-facebook-square" />
            <p className="d-lg-none">Facebook</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            data-placement="bottom"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            title="Follow us on Instagram">
            <i className="fa fa-instagram" />
            <p className="d-lg-none">Instagram</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            data-placement="bottom"
            href="/Perfil"
            target="">
            <i className="fas fa-pizza-slice pr-2" aria-hidden="true"></i>
            <p>Catalogo</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
           data-placement="bottom"
            href="/LoginPage"
            target="">
            <i className="fa fa-user pr-2" aria-hidden="true"></i>
            <p>Login</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            data-placement="bottom"
            href="/Carrito"
            target="">
            <i className="fa fa-shopping-cart" ></i>
            <p className="d-lg-none">Carrito</p>
          </NavLink>
        </NavItem>
      </Nav>;

      break;
  }



  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
    <Container>
      <div className="navbar-translate">
        <NavbarBrand
          data-placement="bottom"
          href="/"
          target=""
          title="Landing Page"
        >
         EL BUEN SABOR
        </NavbarBrand>
        <button
          aria-expanded={navbarCollapse}
          className={classnames("navbar-toggler navbar-toggler", {
            toggled: navbarCollapse,
          })}
          onClick={toggleNavbarCollapse}
        >
          <span className="navbar-toggler-bar bar1" />
          <span className="navbar-toggler-bar bar2" />
          <span className="navbar-toggler-bar bar3" />
        </button>
      </div>
      <Collapse
        className="justify-content-end"
        navbar
        isOpen={navbarCollapse}
      >
        {botonera}
      </Collapse>
    </Container>
  </Navbar>
  );
 
}

export default IndexNavbar;
