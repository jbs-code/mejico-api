const subirImagen = require("../helpers/uploadCloudinary");
const Producto = require("../model/productos");

const crearProducto = async (req, res) => {

    const { nombre, categoria, descripcion, costo, disponibilidad, url } = req.body;
    const responsable = req.usuario._id;

    const urlImg = {
        url: '',
        public_id: ''
    }

    if (url) {
        imagen = await subirImagen(url);
        const publicId = imagen.public_id.split('Mejico/');

        urlImg.url = imagen.secure_url;
        urlImg.public_id = publicId[1] || '';
    }

    const producto = new Producto({
        nombre: nombre.toUpperCase(),
        categoria,
        descripcion,
        costo,
        disponibilidad,
        responsable,
        urlImg
    });

    await producto.save();

    res.json({
        producto
    });
}

const obtenerProductos = async (req, res) => {
    const { limite = 20, desde = 0 } = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true }).limit(Number(limite)).skip(Number(desde)).populate('responsable', 'nombre')
    ]);

    res.json({
        total,
        productos
    });
}

//Por el hecho de que necesitamos el puclic_id de la imagen que ya tenemos en BBDD para 
//hacer la actualización en caso de que nos manden una url; aprovechamos esa llamada para hacer
//todas las actulizaciones. Es por esto que utilizamos el producto.save() en lugar de producto.findByIdAndUpdate()
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, descripcion, costo, disponibilidad, url } = req.body;
    const responsable = req.usuario._id;

    const producto = await Producto.findById(id);

    if (url) {
        const imagen = await subirImagen(url, producto.urlImg.public_id);
        producto.urlImg.url = imagen.secure_url;
    }

    producto.nombre = nombre.toUpperCase() || producto.nombre;
    producto.categoria = categoria || producto.categoria;
    producto.descripcion = descripcion || producto.descripcion;
    producto.costo = costo || producto.costo;
    producto.disponibilidad = disponibilidad;
    producto.responsable = responsable;

    const productoActualizado = await producto.save();

    res.json({
        productoActualizado
    });
}

const borrarProducto = async (req, res) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false })
        .populate('categoria', 'nombre')
        .populate('responsable', 'nombre');

    res.json({
        msg: 'Producto borrado',
        producto
    });
}

module.exports = {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}