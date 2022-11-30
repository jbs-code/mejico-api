const Rol = require("../model/roles");

const crearRol = async(req, res) => {
    const {nombre, estado } = req.body;
    const responsable = req.usuario._id;

    const rolExiste = await Rol.findOne({nombre: nombre.toLowerCase()});

    if(rolExiste){
        return res.status(401).json({
            msg: 'Este rol ya existe en la base de datos'
        });
    }

    const newRol = new Rol({
        nombre: nombre.toLowerCase(),
        estado,
        responsable
    });

    await newRol.save()

    res.json({
        newRol
    });
}

const obtenerRoles = async(req, res) => {
    const roles = await Rol.find({estado: true}).populate('responsable', 'nombre');

    res.json({
        roles
    });
}

const actualizarRol = async(req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;

    const rol = await Rol.findByIdAndUpdate(id, {nombre, usuario}, { new: true }).populate('responsable', 'nombre');

    res.json({
        rol
    });
}

const borrarRol = async(req, res) => {
    const id = req.params.id;

    const rol = await Rol.findByIdAndUpdate(id, {estado: false}).populate('responsable', 'nombre');

    res.json({
        msg: 'Rol eliminado',
        rol
    });

}

module.exports = {
    crearRol,
    obtenerRoles,
    actualizarRol,
    borrarRol
}