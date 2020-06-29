
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function SectionCatalogo() {
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
			<div className="ftco-search">
				<Row>
					<Col md="12" className="nav-link-wrap">
						<div className="nav nav-pills d-flex text-center" id="v-pills-tab" role="tablist"
							aria-orientation="vertical">
							<a className="nav-link ftco-animate active" id="v-pills-1-tab" data-toggle="pill"
								href="#v-pills-1" role="tab" aria-controls="v-pills-1"
								aria-selected="true">Breakfast</a>

							<a className="nav-link ftco-animate" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2"
								role="tab" aria-controls="v-pills-2" aria-selected="false">Lunch</a>

							<a className="nav-link ftco-animate" id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3"
								role="tab" aria-controls="v-pills-3" aria-selected="false">Dinner</a>

							<a className="nav-link ftco-animate" id="v-pills-4-tab" data-toggle="pill" href="#v-pills-4"
								role="tab" aria-controls="v-pills-4" aria-selected="false">Drinks</a>

							<a className="nav-link ftco-animate" id="v-pills-5-tab" data-toggle="pill" href="#v-pills-5"
								role="tab" aria-controls="v-pills-5" aria-selected="false">Desserts</a>

							<a className="nav-link ftco-animate" id="v-pills-6-tab" data-toggle="pill" href="#v-pills-6"
								role="tab" aria-controls="v-pills-6" aria-selected="false">Wine</a>

						</div>
					</Col>
                    
                    <Col md="12" className="tab-wrap">                        
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel"
								aria-labelledby="day-1-tab">
								<div className="row no-gutters d-flex align-items-stretch">
									<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
										<div className="menus d-sm-flex ftco-animate align-items-stretch">
											<div className="menu-img img"
												style={{backgroundImage:"url(" + require("assets/img/images/breakfast-1.jpg") + ")"}}></div>
											<div className="text d-flex align-items-center">
												<div>
													<div className="d-flex">
														<div className="one-half">
															<h3>Grilled Beef with potatoes</h3>
														</div>
														<div className="one-forth">
															<span className="price">$29</span>
														</div>
													</div>
													<p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,
														<span>Tomatoe</span></p>
													<p><a href="#" className="btn btn-primary mt-2">AÑADIR</a><a href="Detalle/104" className="btn btn-primary mt-2 ml-3">VER</a></p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
										<div className="menus d-sm-flex ftco-animate align-items-stretch">
											<div className="menu-img img"
												style={{backgroundImage:"url(" + require("assets/img/images/breakfast-2.jpg") + ")"}}></div>
											<div className="text d-flex align-items-center">
												<div>
													<div className="d-flex">
														<div className="one-half">
															<h3>Grilled Beef with potatoes</h3>
														</div>
														<div className="one-forth">
															<span className="price">$29</span>
														</div>
													</div>
													<p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,
														<span>Tomatoe</span></p>
													<p><a href="#" className="btn btn-primary mt-2">AÑADIR</a><a href="#" className="btn btn-primary mt-2 ml-3">VER</a></p>
												</div>
											</div>
										</div>
									</div>

									<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
										<div className="menus d-sm-flex ftco-animate align-items-stretch">
											<div className="menu-img img order-md-last"
												style={{backgroundImage:"url(" + require("assets/img/images/breakfast-3.jpg") + ")"}}></div>
											<div className="text d-flex align-items-center">
												<div>
													<div className="d-flex">
														<div className="one-half">
															<h3>Grilled Beef with potatoes</h3>
														</div>
														<div className="one-forth">
															<span className="price">$29</span>
														</div>
													</div>
													<p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,
														<span>Tomatoe</span></p>
													<p><a href="#" className="btn btn-primary mt-2">AÑADIR</a><a href="#" className="btn btn-primary mt-2 ml-3">VER</a></p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
										<div className="menus d-sm-flex ftco-animate align-items-stretch">
											<div className="menu-img img order-md-last"
												style={{backgroundImage:"url(" + require("assets/img/images/breakfast-4.jpg") + ")"}}></div>
											<div className="text d-flex align-items-center">
												<div>
													<div className="d-flex">
														<div className="one-half">
															<h3>Grilled Beef with potatoes</h3>
														</div>
														<div className="one-forth">
															<span className="price">$29</span>
														</div>
													</div>
													<p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,
														<span>Tomatoe</span></p>
													<p><a href="#" className="btn btn-primary mt-2">AÑADIR</a><a href="#" className="btn btn-primary mt-2 ml-3">VER</a></p>
												</div>
											</div>
										</div>
									</div>

									<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
										<div className="menus d-sm-flex ftco-animate align-items-stretch">
											<div className="menu-img img"
												style={{backgroundImage:"url(" + require("assets/img/images/breakfast-5.jpg") + ")"}}></div>
											<div className="text d-flex align-items-center">
												<div>
													<div className="d-flex">
														<div className="one-half">
															<h3>Grilled Beef with potatoes</h3>
														</div>
														<div className="one-forth">
															<span className="price">$29</span>
														</div>
													</div>
													<p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,
														<span>Tomatoe</span></p>
													<p><a href="#" className="btn btn-primary mt-2">AÑADIR</a><a href="#" className="btn btn-primary mt-2 ml-3">VER</a></p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
										<div className="menus d-sm-flex ftco-animate align-items-stretch">
											<div className="menu-img img"
												style={{backgroundImage:"url(" + require("assets/img/images/breakfast-6.jpg") + ")"}}></div>
											<div className="text d-flex align-items-center">
												<div>
													<div className="d-flex">
														<div className="one-half">
															<h3>Grilled Beef with potatoes</h3>
														</div>
														<div className="one-forth">
															<span className="price">$29</span>
														</div>
													</div>
													<p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,
														<span>Tomatoe</span></p>
													<p><a href="#" className="btn btn-primary mt-2">AÑADIR</a><a href="#" className="btn btn-primary mt-2 ml-3">VER</a></p>
												</div>
											</div>
										</div>
									</div>

									<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
										<div className="menus d-sm-flex ftco-animate align-items-stretch">
											<div className="menu-img img order-md-last"
												style={{backgroundImage:"url(" + require("assets/img/images/breakfast-7.jpg") + ")"}}></div>
											<div className="text d-flex align-items-center">
												<div>
													<div className="d-flex">
														<div className="one-half">
															<h3>Grilled Beef with potatoes</h3>
														</div>
														<div className="one-forth">
															<span className="price">$29</span>
														</div>
													</div>
													<p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,
														<span>Tomatoe</span></p>
													<p><a href="#" className="btn btn-primary mt-2">AÑADIR</a><a href="#" className="btn btn-primary mt-2 ml-3">VER</a></p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
										<div className="menus d-sm-flex ftco-animate align-items-stretch">
											<div className="menu-img img order-md-last"
												style={{backgroundImage:"url(" + require("assets/img/images/breakfast-8.jpg") + ")"}}></div>
											<div className="text d-flex align-items-center">
												<div>
													<div className="d-flex">
														<div className="one-half">
															<h3>Grilled Beef with potatoes</h3>
														</div>
														<div className="one-forth">
															<span className="price">$29</span>
														</div>
													</div>
													<p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,
														<span>Tomatoe</span></p>
													<p><a href="#" className="btn btn-primary mt-2">AÑADIR</a><a href="#" className="btn btn-primary mt-2 ml-3">VER</a></p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
                        </div>
                    </Col>
                </Row>
            </div> 
        </Container>
    </section>
    </>
    );
}

export default SectionCatalogo;
