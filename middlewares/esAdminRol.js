const esAdminRol = (req, res, next) => {
    const rol = req.usuario.rol;

    if(rol !== 'administrador'){
        return res.status(401).json({
            msg: 'El usuario debe ser administrador para realizar esta operación'
        });
    }

    next();
}

module.exports = esAdminRol;