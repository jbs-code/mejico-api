const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, "El nombre es necesario"]
    },
    estado: {
        type: Boolean,
        default: true,
    },
    responsable: {
        type: mongoose.ObjectId,
        ref: "Usuario",
    }
});

categoriaSchema.methods.toJSON = function(){
    const { __v, ...resto } = this.toObject();
    return resto;
}

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;