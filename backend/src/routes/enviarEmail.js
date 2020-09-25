const { Router } = require('express');
const nodemailer = require('nodemailer')
const router = Router();


router.post('/recuperarPassword', async (req, res) => {

    const email = req.body.email

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
        subject: "Recuperar contraseña",
        html: `<h1>Recuperar contraseña</h1>
                <p>Para restablecer tu contraseña haz click en el siguiente enlace</p>
                <p><a href='http://localhost:3000/recuperarPassword/${email}'>Recuperar contraseña</a></p> 
                <p>El Buen sabor</p>                
                `

    }
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.status(500).json({ message: "Error al enviar el email " + err })

        res.status(200).json({message: "OK"})

    })
})


router.post('/envioFactura', async (req, res) => {

    const email = req.body.email

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
        attachment: [] // PDF adjunto

    }
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.status(500).json({ message: "Error al enviar el email " + err })

        res.status(200).json({message: "OK"})

    })
})


module.exports = router