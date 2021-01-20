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
    res.render('index');
};

module.exports = controller;