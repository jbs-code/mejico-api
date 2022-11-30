const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../helpers/validarJWT');
const esAdminRol = require('../middlewares/esAdminRol');
const { crearProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { idCategoriaExiste, idProductoExiste } = require('../helpers/bdValidator');
const router = Router();

router.post('/', [
    validarJWT,
    check('nombre', 'Es necesario ingresar un nombre').notEmpty(),
    check('categoria', 'El id debe ser un id válido de mongo').isMongoId(),
    check('categoria').custom(idCategoriaExiste),
    check('descripcion', 'Es necesario ingresar una descripción').notEmpty(),
    check('costo', 'Es necesario ingresar el precio').notEmpty(),
    check('costo', 'El precio debe ser numérico').isNumeric(),
    check('disponibilidad', 'Indique si está disponible: true o false').isBoolean(),
    validarCampos
], crearProducto);

router.get('/', obtenerProductos);

router.put('/:id',[
    validarJWT,
    check('id', 'Debe ingresar un id valido de mongo').isMongoId(),
    check('id').custom(idProductoExiste),
    check('categoria', 'Debe ingresar un id valido de mongo').isMongoId(),
    check('categoria').custom(idCategoriaExiste),
    check('disponibilidad', 'Indique si está disponible: true o false').isBoolean(),
    validarCampos
], actualizarProducto);
router.delete('/:id', [
    validarJWT,
    check('id', 'Debe ingresar un id valido de mongo').isMongoId(),
    check('id').custom(idProductoExiste),
    esAdminRol,
    validarCampos
], borrarProducto);


module.exports = router;