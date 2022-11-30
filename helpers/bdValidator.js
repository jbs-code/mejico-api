const Categoria = require("../model/categorias");
const Producto = require("../model/productos");
const Rol = require("../model/roles");
const Usuario = require("../model/usuarios")

const emailExiste = async (email = '') => {
    const emailExist = await Usuario.findOne({ email });

    if (emailExist) {
        throw new Error(`El email ${email} ya existe`);
    }

}

const idUsuarioExiste = async (id = "") => {
    const uid = await Usuario.findOne({_id: id, estado: true});

    if (!uid) {
        throw new Error(`El id ${id} no está disponible en la base de datos`);
    }
}

const idCategoriaExiste = async (id = '') => {
    const uid = await Categoria.findOne({_id: id, estado: true});

    if (!uid) {
        throw new Error(`El id ${id} no está disponible en la base de datos`);
    }
}

const idRolExiste = async (id = '') => {
    const uid = await Rol.findOne({_id: id, estado: true});

    if (!uid) {
        throw new Error(`El id ${id} no está disponible en la base de datos`);
    }
}

const idProductoExiste = async (id = '') => {
    const uid = await Producto.findOne({_id: id, estado: true});

    if (!uid) {
        throw new Error(`El id ${id} no está disponible en la base de datos`);
    }
}

module.exports = {
    emailExiste,
    idUsuarioExiste,
    idCategoriaExiste,
    idProductoExiste,
    idRolExiste
}