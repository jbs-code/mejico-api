const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productoSchema = new Schema({
    nombre: String,
    categoria: { type: mongoose.ObjectId, ref: 'Categoria' },
    descripcion: String,
    costo: Number,
    disponibilidad: { type: Boolean, default: true },
    responsable: { type: mongoose.ObjectId, ref: 'Usuario' },
    urlImg: {
        url: String,
        public_id: String
    },
    estado: { type: Boolean, default: true }
});

productoSchema.methods.toJSON = function () {
    const { __v, estado, ...resto } = this.toObject();
    return resto;
}

//Middlewares para que nos de el populate despues del save();
productoSchema.post('save', function (doc, next) {
    doc.populate('categoria', 'nombre').then(function () {
        next();
    });
});

productoSchema.post('save', function (doc, next) {
    doc.populate('responsable', 'nombre').then(function () {
        next();
    });
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;