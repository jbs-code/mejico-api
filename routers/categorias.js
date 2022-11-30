const { check } = require("express-validator");
const { crearCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const validarJWT = require("../helpers/validarJWT");
const validarCampos = require("../middlewares/validarCampos");
const Router = require('express');
const { idCategoriaExiste } = require("../helpers/bdValidator");
const esAdminRol = require("../middlewares/esAdminRol");

const router = Router();

router.post('/', [
    validarJWT,
    check('nombre', 'Es necesario ingresar un nombre').notEmpty(),
    validarCampos
], crearCategoria);

router.get('/', obtenerCategorias);

router.put('/:id', [
    validarJWT,
    check('id', 'EL id debe ser un id válido de mongo').isMongoId(),
    check('id').custom(idCategoriaExiste),
    check('nombre', 'Es necesario ingresar un nombre').notEmpty(),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'EL id debe ser un id válido de mongo').isMongoId(),
    check('id').custom(idCategoriaExiste),
    validarCampos
], borrarCategoria);

module.exports = router;