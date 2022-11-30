const generarJWT = require("../helpers/generarJWT");
const Usuario = require("../model/usuarios");
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Usuario.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: `El email ${email} no existe en la base de datos`
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: `Usuario sin permisos - estado: false`
            });
        } 
        
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: `Password incorrecto`
            });
        }

        const token = generarJWT(user._id);

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Algo salió mal, comuníquese con el administrador'
        });
    }
}

module.exports = login;