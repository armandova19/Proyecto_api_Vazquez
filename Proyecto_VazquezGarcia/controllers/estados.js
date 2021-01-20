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
    db.query('select * from estados', (err, estados) => {
        res.render('estados', {
            estados: estados
        });
    });
};

controller.agregar = (req,res) => {
    const datos = req.body;
    db.query('insert into estados set ?', [datos], (err, estados) => {
        if(err){
            res.send(err)
        }
        res.redirect('/estados');
    });
};

controller.borrar = (req,res) => {
    const { id } = req.params;
    db.query('delete from estados where id = ?', [id], (err, estados) => {
        res.redirect('/estados');
    });
};


controller.editar = (req,res) => {
    const id = req.body.id_estado;
    const estado_edit = req.body.estado_edit;
    db.query('update estados set estado = ? where id = ?', [estado_edit , id], async (error, estados) => {
        res.redirect('/estados');
    });
};


module.exports = controller;