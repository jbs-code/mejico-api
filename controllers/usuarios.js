const Usuario = require('../model/usuarios');
const bcrypt = require('bcrypt');

const crearUsuarios = async (req, res) => {
  const usuario = {
    nombre: req.body.nombre.toUpperCase(),
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    estado: req.body.estado,
    rol: req.body.rol?.toLowerCase()
  }

  const user = new Usuario(usuario);

  //Encriptamos password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(usuario.password, salt);

  await user.save();

  res.json({
    user
  });
}

const obtenerUsuarios = async (req, res) => {
  const query = { estado: true };
  const { limite = 20, desde = 0 } = req.query;

  // const total = await Usuario.countDocuments(query);
  // const usuarios = await Usuario.find(query).limit(Number(limite)).skip(Number(desde));

  //optimizamos nuestras tareas asíncronas con Promise.all
  const [total, users] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).
      limit(Number(limite)).
      skip(Number(desde))
  ]);

  res.json({
    total,
    users
  });
}

//Actualmente actuializarUsuario solo permite actualizar la contraseña y rol
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;

  const { _id, nombre, email, password, estado, rol, ...resto } = req.body;

  if (password) {//encriptamos la nueva password en caso de que sea enviada una
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  if (rol) {
    resto.rol = rol.toLowerCase();
  }

  const user = await Usuario.findByIdAndUpdate(id, resto, { new: true });//new: true es para obtener el user actualizado

  res.json({
    user
  });
}

const borrarUsuario = async (req, res) => {
  const { id } = req.params;

  const user = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

  res.json({
    user
  });
}
module.exports = {
  crearUsuarios,
  obtenerUsuarios,
  actualizarUsuario,
  borrarUsuario
}