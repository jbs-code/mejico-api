const Categoria = require("../model/categorias");

const categoriaPorNombre = async(req, res, next) => {
    const nombre = req.params.categoria;

    const categoria = await Categoria.findOne({nombre: nombre.toUpperCase(), estado: true});

    if(!categoria){
        return res.status(400).json({
            msg: `No se encontró la categoría ${nombre}.`
        });
    }

    req.categoriaId = categoria._id.toString();

    next();
}

module.exports = categoriaPorNombre;