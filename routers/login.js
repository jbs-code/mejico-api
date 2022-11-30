const { Router } = require('express');
const { check } = require('express-validator');
const login = require('../controllers/login');
const validarCampos = require('../middlewares/validarCampos');

const router = Router();

router.post('/',[
    check('email', 'Debe ingresar un email válido').isEmail(),
    check('password', 'EL password es obligatorio').not().isEmpty(),
    validarCampos,
], login);

module.exports = router;