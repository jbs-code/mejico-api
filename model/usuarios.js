const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const usuarioSchema = new Schema({
  nombre:  String,
  email: String,
  password: String,
  rol: {type: String, default: "usuario"},
  estado: {type: Boolean, default: true},
  
});

usuarioSchema.methods.toJSON = function(){
  const { password, estado, __v, ...resto } = this.toObject();
  return resto;
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;