const express = require('express');
const router = express.Router();
const ciudades = require('../controllers/ciudades');
const empleados = require('../controllers/empleados');
const estados = require('../controllers/estados');
const index = require('../controllers/index');
const login = require('../controllers/login')

router.get('/' , index.show);

router.get('/empleados' , empleados.show);
router.post('/agregar-empleado' , empleados.agregar);
router.post('/editar-empleado' , empleados.editar);
router.get('/eliminar-empleado/:id' , empleados.borrar);

router.get('/estados' , estados.show);
router.post('/agregar-estado' , estados.agregar);
router.get('/eliminar-estado/:id' , estados.borrar);
router.post('/editar-estado' , estados.editar);

router.get('/ciudades' , ciudades.show);
router.post('/agregar-ciudad' , ciudades.agregar);
router.post('/editar-ciudad' , ciudades.editar);
router.get('/eliminar-ciudad/:id' , ciudades.borrar);

router.get('/register' , (req,res) => {
    res.render('register');
});

router.get('/login' , (req,res) => {
    res.render('login');
});

router.post('/register' , login.register);
router.post('/login' , login.login);
router.get('/logout' , login.logout);

module.exports = router;