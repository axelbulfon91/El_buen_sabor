
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="#LINK GITHUB"
                  target="_blank"
                >
                 PROYECTO INTEGRADOR
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, hecho con {" "}
              <i className="fa fa-heart heart" /> creado por GRUPO BDG
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
