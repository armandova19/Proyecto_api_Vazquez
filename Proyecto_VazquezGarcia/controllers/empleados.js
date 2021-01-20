const controller = {};

const dotenv = require('dotenv');
const db = require('../database');

controller.show = (req,res)=>{
    const token = req.cookies.jwt;
    console.log(token);
    if(!token)
    {
        res.redirect('/login')
    }
    db.query('select empleados.* , ciudades.ciudad from empleados inner join ciudades on empleados.id_ciudad = ciudades.id ', (err, empleados) => {
        db.query('select * from ciudades', (err, ciudades) => {
            res.render('empleados', {
                empleados: empleados,
                ciudades: ciudades
            });
        });
    });
};

controller.agregar = (req,res) => {
    const datos = req.body;
    db.query('insert into empleados set ?', [datos], (err, estados) => {
        if(err){
            res.send(err)
        }
        res.redirect('/empleados');
    });
};

controller.editar = (req,res) => {
    const id = req.body.id_empleado;
    const id_ciudad_edit = req.body.id_ciudad_edit;
    const nombre_edit = req.body.nombre_edit;
    const telefono_edit = req.body.telefono_edit;
    const direccion_edit = req.body.direccion_edit;
    const sueldo_edit = req.body.sueldo_edit;
    const fecha_ingreso_edit = req.body.fecha_ingreso_edit;
    db.query('update empleados set id_ciudad = ? , nombre = ? , telefono = ? , direccion = ? , sueldo = ? , fecha_ingreso = ? where id = ?', [id_ciudad_edit,nombre_edit,telefono_edit,direccion_edit,sueldo_edit,fecha_ingreso_edit , id], async (error, estados) => {
        if(error){
            res.send(error);
        }
        res.redirect('/empleados');
    });
};

controller.borrar = (req,res) => {
    const { id } = req.params;
    db.query('delete from empleados where id = ?', [id], (err, estados) => {
        res.redirect('/empleados');
    });
};

module.exports = controller;