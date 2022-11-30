const { Router } = require('express');
const { crearUsuarios, obtenerUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');
const { emailExiste, idUsuarioExiste } = require('../helpers/bdValidator');
const validarJWT = require('../helpers/validarJWT');
const esAdminRol = require('../middlewares/esAdminRol');
const router = Router();

router.post('/', [
    check('nombre', 'Es necesario que ingrese su nombre').notEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
    validarCampos
], crearUsuarios);

router.get('/', obtenerUsuarios);

router.put('/:id',[
    validarJWT,
    check('id', 'Debe ingresar un id valido de mongo').isMongoId(),
    check('id').custom(idUsuarioExiste),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
    validarCampos
], actualizarUsuario);

router.delete('/:id', [
    validarJWT,
    check('id', 'Debe ingresar un id valido de mongo').isMongoId(),
    check('id').custom(idUsuarioExiste),
    esAdminRol,
    validarCampos
], borrarUsuario);

module.exports = router;