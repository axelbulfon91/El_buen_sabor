const jwt = require("jsonwebtoken")
const { secret } = require("../keys")

module.exports = {

    comprobarToken : function(req, res, next){

        const token = req.headers['authorization']

        console.log(req.headers)
        if(!token){
            return res.status(403).json({message: 'Token no generado' })
        }

        const decoded = jwt.verify(token, secret);
        req.id_user = decoded.id
        next();
    }




}