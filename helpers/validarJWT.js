const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const Usuario = require('../model/usuarios');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    //Validamos que el token sea ingresado
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición - Debe iniciar sesión"
        });
    }

    //validamos el token y buscamos a usuario
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: "No existe el usuario en la Base de datos - Token no válido"
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Usuario sin permisos - estado: false"
            });
        }

        //Agregamos al request los datos del usuario
        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token no válido"
        });
    }


}

module.exports = validarJWT;