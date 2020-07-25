import React from "react";

import Select from 'react-select';

// index sections
import {
    Button,
    Card,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
  } from "reactstrap";


  function SectionDireccion() {

    const localidades = [
        { value: 'Dorrego', label: 'Dorrego' },
        { value: 'Las Cañas', label: 'Las Cañas' },
        { value: 'Villa Nueva', label: 'Villa Nueva' },
        { value: 'Villa Hipódromo', label: 'Villa Hipódromo' },
        { value: 'Ciudad', label: 'Ciudad' }
      ];

      const distritos = [
        { value: 'Guaymallén', label: 'Guaymallén' },
        { value: 'Godoy Cruz', label: 'Godoy Cruz' },
        { value: 'Ciudad', label: 'Ciudad' }
      ];

    return (
      <>
        <div className="col-sm-12 pt-3">

            <h5 className=" text-left font-weight-bold text-light">DIRECCION</h5>

            <div className="form-row">

                <div class="form-group col-lg-6 col-md-6 col-sm-12">
                    
                    <label className="font-weight-bold text-light">Calle</label>
                    <Input value="" className="mr-3" placeholder="Calle" type="text" name="calle" />
               
                </div>

                <div class="form-group col-lg-6 col-md-6 col-sm-12">    
                
                    <label className="font-weight-bold text-light">Numeración</label>
                    <Input value="" className="" placeholder="Numeración" type="number" name="numeracion" />
                
                </div>  

            </div>

            <div className="form-row">

                <div class="form-group col-lg-3 col-md-6 col-sm-12">

                    <label className="font-weight-bold text-light">Piso</label>
                    <Input value="" className="mr-3" placeholder="Piso" type="text" name="psio" />
                
                </div>

                <div class="form-group col-lg-3 col-md-6 col-sm-12">

                    <label className="font-weight-bold text-light">Dpto</label>
                    <Input value="" className="mr-3" placeholder="Dpto" type="text" name="departamento" />
            
                </div>
                
                <div class="form-group col-lg-3 col-md-6 col-sm-12">
                    
                    <label className="font-weight-bold text-light">Manzana</label>
                    <Input value="" className="mr-3" placeholder="Manzana" type="text" name="manzana" />
                </div>

                <div class="form-group col-lg-3 col-md-6 col-sm-12">

                    <label className="font-weight-bold text-light">Casa</label>
                    <Input value="" className="" placeholder="Casa" type="text" name="casa" />

                </div>
                
            </div>

            <div className="form-row">
                
                <div class="form-group col-md-6 col-sm-12">
                    
                    <label className="font-weight-bold text-light">Distrito</label>

                    <Select className="form-control border-0 pr-2" name="distrito" options={localidades} />
                
                </div>
                
                <div class="form-group col-md-6 col-sm-12">

                    <label className="font-weight-bold text-light">Localidad</label>

                    <Select className="form-control border-0 pr-2" name="localidad" options={distritos} />
                
                </div>
                
                <div className="col-sm-12 text-right">
                    <Button className="btn btn-dark btn-lg"><i className="fa fa-pencil"></i> ACTUALIZAR </Button>
                </div>

            </div>


        </div>
      </>
    );
  }
  export default SectionDireccion;