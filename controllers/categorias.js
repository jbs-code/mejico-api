const Categoria = require("../model/categorias");

const crearCategoria = async (req, res) => {
    const { nombre, estado } = req.body;
    const responsable = req.usuario._id;

    const categoriaExiste = await Categoria.findOne({ nombre: nombre.toUpperCase() });

    if (categoriaExiste) {
        return res.status(400).json({
            msg: `La categoría ${nombre} ya existe`
        });
    }

    const categoria = new Categoria({ nombre: nombre.toUpperCase(), estado, responsable });

    await categoria.save();

    res.json({
        categoria
    });
}

const obtenerCategorias = async (req, res) => {
    const { limite = 20, desde = 0 } = req.query;

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true }).populate('responsable', 'nombre').limit(Number(limite)).skip(Number(desde))
    ]);

    res.json({
        total,
        categorias
    });
}

const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const responsable = req.usuario._id;

    const existeCategoria = await Categoria.findOne({ nombre: nombre.toUpperCase() });

    if (existeCategoria) {
        return res.status(400).json({
            msg: `La categoría ${nombre} ya existe en la base de datos`
        })
    }

    const categoria = await Categoria.findByIdAndUpdate(id, { nombre: nombre.toUpperCase(), responsable }, { new: true }).populate('responsable', 'nombre');

    res.json({
        msg: 'Categoría actualizada',
        categoria,
    });
}

const borrarCategoria = async (req, res) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true }).populate('responsable', 'nombre');

    res.json({
        msg: 'Categoría borrada',
        categoria
    });
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
}
