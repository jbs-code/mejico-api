const { Router } = require('express');
const { check } = require('express-validator');
const { productosPorCategoria, productosPorCategoriaDisponibles, productosPorNombre } = require('../controllers/buscar');
const categoriaPorNombre = require('../middlewares/categoriaPorNombre');
const router = Router();

router.get('/productos/:categoria',[
    categoriaPorNombre
], productosPorCategoria);

router.get('/productos/disponibles/:categoria',[
    categoriaPorNombre
], productosPorCategoriaDisponibles);

router.get('/productos/nombre/:nombre', productosPorNombre);

module.exports = router;