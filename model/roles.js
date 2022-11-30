const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const rolesSchema = new Schema({
    nombre: String,

    estado: {
        type: Boolean,
        default: true
    },

    responsable: {
        type: mongoose.ObjectId,
        ref: 'Usuario'
    }

});

rolesSchema.methods.toJSON = function () {
    const {__v, estado, ...resto } = this.toObject();

    return resto;
}

const Rol = mongoose.model('Role', rolesSchema);

module.exports = Rol;
