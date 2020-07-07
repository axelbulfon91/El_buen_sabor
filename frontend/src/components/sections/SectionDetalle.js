import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";


function sectionDetalle(){

    function goBacHandle(){
     
        window.history.back()
  
        
    }

    return (
        <>
        <section className="hero-wrap hero-wrap-2" style={{backgroundImage:"url(" + require("assets/img/images/bg_2.jpg") + ")"}} data-stellar-background-ratio="0.5">
            <Container >
                <Row className="no-gutters slider-text align-items-end justify-content-center">
                <div className="col-md-9 ftco-animate text-center mb-4">
                    <h1 className="mb-2 bread text-center">Menú</h1>            
                </div>
                <div
            className="moving-clouds"
            style={{
                backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
            />
                </Row>
            </Container>
        </section> 
         <section className="ftco-section">
             <Container>
                <nav aria-label="Page breadcrumb">
                    <ul className="breadcrumb fondoBreadcrumb lead text-uppercase">
                        <li className="breadcrumb-item active" aria-current="page"><a href="../">Inicio / Detalle</a></li>
                        <li className="breadcrumb-item active pagActiva">Nombre del producto</li>
                    </ul>
                </nav>
                <div className="ftco-search">
                    <Row>
                        <Col md="6">
                            <img className="img-thumbnail" src={require("assets/img/images/breakfast-1.jpg")}></img>
                        </Col>
                        <Col md="6">
                        
                            <div className="col-6">
					
                                <h6>
                                    
                                    <a href="#" onClick={goBacHandle}  className="text-muted">
                                        
                                        <i className="fa fa-reply"></i> Continuar Buscando

                                    </a>

                                </h6>

                            </div>


                            <div className="clearfix"></div>

                            <h1 className="text-muted text-uppercase">NOMBRE DEL PRODUCTO</h1>

                            <h2 className="text-muted"> $230</h2>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        
                            <hr/>

                            <div className="form-group row">

                                <h4 class="col-lg-0 col-md-0 col-xs-12">

                                <hr/>

                                <small>

                                    <i className="fa fa-clock-o mr-2"></i>
                                    En Stock  |
                                    <i className="fa fa-shopping-cart mt-0 mr-2" style={{margin:+"0px 5px"}}></i>
                                    320 compras |
                                    <i className="fa fa-eye mt-0 mr-2"></i>
                                    Visto por <span class="vistas">100</span> personas

                                </small>

                                </h4>

                                <div className="clearfix"></div>

                                <button class="btn btn-primary btn-block btn-lg mt-4">
							
							        AÑADIR

								<i class="fa fa-shopping-cart ml-2"></i>

								</button>

							

                            </div>

                        </Col>

                        <Col md="12">

                        </Col>

                    </Row>

                </div>

             </Container>

         </section>
        </>
    )
}

export default sectionDetalle;