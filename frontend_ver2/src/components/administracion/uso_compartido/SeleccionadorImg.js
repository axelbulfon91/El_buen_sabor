import React,{useState, useEffect} from 'react'
import { Form, Image } from 'react-bootstrap'

function SeleccionadorImg({setRutaImagen, rutaImagen}) {
    const [imagenPreview, setImagenPreview] = useState('');
    useEffect(() => {
        if (rutaImagen) {
            setImagenPreview(`http://localhost:4000/imgs/${rutaImagen}`)
        }

    }, [])
    return (
        <Form.Group>
        <Form.File id="formcheck-api-regular">
            <Form.File.Label>Imagen</Form.File.Label>
            <Form.File.Input onChange={(e) => {
                setRutaImagen(e.target.files[0]);
                setImagenPreview(URL.createObjectURL(e.target.files[0]))
            }} />
        </Form.File>
        <div className='mt-2'>
            <Image src={imagenPreview} thumbnail />
        </div>
    </Form.Group>
    )
}

export default SeleccionadorImg
