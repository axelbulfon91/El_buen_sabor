const { Router } = require('express');
const nodemailer = require('nodemailer')
const router = Router();
const btoa = require('btoa')

router.post('/recuperarPassword', async (req, res) => {

    const email = req.body.email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    const emailCod = btoa(email)
    var mailOptions = {
        from: "El Buen sabor",
        to: email,                      //E-mail del destinatario
        subject: "Recuperar contraseña",
        html: `<h1>Recuperar contraseña</h1>
                <p>Para restablecer tu contraseña haz click en el siguiente enlace</p>
                <p><a href='http://localhost:3000/recuperarPassword/${emailCod}'>Recuperar contraseña</a></p> 
                <p>El Buen sabor</p>                
                `

    }
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.status(500).json({ message: "Error al enviar el email " + err })

        res.status(200).json({ message: "OK" })

    })
})


router.post('/envioFactura', async (req, res) => {

    const email = req.body.email
    const pdf = req.body.factura

    console.log(pdf);



    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'localelbuensabor@gmail.com',
            pass: 'laboratorio4' // naturally, replace both with your real credentials or an application-specific password
        }
    });
    var mailOptions = {
        from: "El Buen sabor",
        to: email,                      //E-mail del destinatario
        subject: "Factura",
        html: `<h1>Comprobante de compra</h1>
                <p>Se adjunta comprobante de compra</p>
                <p>El Buen sabor</p>                
                `,
        attachments: [
            {
                filename: 'Factura.pdf',
                path: pdf,
                contentType: 'application/pdf',
                encoding: 'base64'    //this line!!!!
            }] // PDF adjunto

    }
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.status(500).json({ message: "Error al enviar el email " + err })
        res.status(200).json({ message: "OK" })
    })
})


router.post('/avisarEstadoPedido', async (req, res) => {

    const email = req.body.email
    const estado = req.body.estado
    const tiempo = req.body.tiempo
    const fechaPedido = req.body.fechaPedido
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    var cuerpo = `Tiempo total estimado: <b>${tiempo} minutos desde el momento que pediste (${fechaPedido})</b>`
    if(estado === "cancelado"){
        cuerpo = ""
    }else if(estado === "listo"){
        cuerpo = "Puedes pasar a buscarlo o esperar al delivery, depende de tu eleccion cuando pediste"
    }else if(estado === "entregado"){
        cuerpo = "Que lo disfrutes..."
    }
    
    var mailOptions = {
        from: "El Buen sabor",
        to: email,                      //E-mail del destinatario
        subject: "Estado de tu pedido",
        html: `<h1>Te avisamos que tu pedido se encuentra <b>${estado}</b></h1>                                
                <p>${cuerpo}</p>
                <p>El Buen sabor</p>                
                `

    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.status(500).json({ message: "Error al enviar el email " + err })

        res.status(200).json({ message: "OK" })

    })
})

module.exports = router