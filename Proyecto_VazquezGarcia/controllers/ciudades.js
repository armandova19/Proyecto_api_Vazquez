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
    db.query('select ciudades.* , estados.estado from ciudades inner join estados on ciudades.id_estado = estados.id', (err, ciudades) => {
        db.query('select * from estados', (err, estados) => {
            res.render('ciudades', {
                ciudades: ciudades,
                estados: estados
            });
        });
    });
};

controller.agregar = (req,res) => {
    const datos = req.body;
    db.query('insert into ciudades set ?', [datos], (err, estados) => {
        if(err){
            res.send(err)
        }
        res.redirect('/ciudades');
    });
};

controller.borrar = (req,res) => {
    const { id } = req.params;
    db.query('delete from ciudades where id = ?', [id], (err, estados) => {
        res.redirect('/ciudades');
    });
};


controller.editar = (req,res) => {
    const id = req.body.id_ciudad;
    const ciudad_edit = req.body.ciudad_edit;
    const id_estado_edit = req.body.id_estado_edit;
    db.query('update ciudades set ciudad = ? , id_estado = ? where id = ?', [ciudad_edit,id_estado_edit , id], async (error, estados) => {
        if(error){
            res.send(error);
        }
        res.redirect('/ciudades');
    });
};

module.exports = controller;