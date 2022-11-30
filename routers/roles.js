const { Router } = require('express');
const { check } = require('express-validator');
const { crearRol, obtenerRoles, actualizarRol, borrarRol } = require('../controllers/roles');
const { idRolExiste } = require('../helpers/bdValidator');
const validarJWT = require('../helpers/validarJWT');
const esAdminRol = require('../middlewares/esAdminRol');
const validarCampos = require('../middlewares/validarCampos');
const router = Router();

router.post('/', [
    validarJWT,
    check('nombre', 'Es necesario un nombre para el rol').notEmpty(),
    validarCampos
], crearRol);

router.get('/', obtenerRoles);

router.put('/:id', [
    validarJWT,
    check('nombre', 'Es necesario que ingrese un nombre').notEmpty(),
    check('id', 'El id no es un id válido de mongo').isMongoId(),
    check('id').custom(idRolExiste),
    validarCampos
], actualizarRol);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'El id no es un id válido de mongo').isMongoId(),
    check('id').custom(idRolExiste),
    validarCampos
], borrarRol);

module.exports = router;