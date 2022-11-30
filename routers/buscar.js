const { Router } = require('express');
const { check } = require('express-validator');
const { productosPorCategoria, productosPorCategoriaDisponibles, productosPorNombre } = require('../controllers/buscar');
const { idCategoriaExiste } = require('../helpers/bdValidator');
const validarCampos = require('../middlewares/validarCampos');
const router = Router();

router.get('/productos/:categoria',[
    check('categoria', 'El id debe ser un id válido de mongo').isMongoId(),
    check('categoria').custom(idCategoriaExiste),
    validarCampos
], productosPorCategoria);

router.get('/productos/disponibles/:categoria',[
    check('categoria', 'El id debe ser un id válido de mongo').isMongoId(),
    check('categoria').custom(idCategoriaExiste),
    validarCampos
], productosPorCategoriaDisponibles);

router.get('/productos/nombre/:nombre', productosPorNombre);

module.exports = router;