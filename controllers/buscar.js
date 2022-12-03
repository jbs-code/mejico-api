const Producto = require("../model/productos");

const productosPorCategoria = async (req, res) => {
    const categoria = req.categoriaId;//id de la categoría
    const { limite = 20, desde = 0} = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ categoria, estado: true }),
        Producto.find({ categoria, estado: true })
        .populate('categoria', 'nombre')
        .populate('responsable', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        total,
        productos
    });
}

const productosPorCategoriaDisponibles = async (req, res) => {
    const categoria = req.categoriaId;//id de la categoría
    const { limite = 20, desde = 0} = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ categoria, disponibilidad: true, estado: true }),
        Producto.find({ categoria, disponibilidad: true, estado: true })
        .populate('categoria', 'nombre')
        .populate('responsable', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        total,
        productos
    });
}

const productosPorNombre = async(req, res) => {
    const { nombre } = req.params;
    const { limite = 20, desde = 0} = req.query;

    //Convertimos la entrada del usuario en expresión regular para hacer la búsqueda
    const producto = new RegExp(nombre.toUpperCase());

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ nombre: producto, estado: true }),
        Producto.find({ nombre: producto, estado: true })
        .populate('categoria', 'nombre')
        .populate('responsable', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        total,
        productos
    });
}

module.exports = {
    productosPorCategoria,
    productosPorCategoriaDisponibles,
    productosPorNombre
}