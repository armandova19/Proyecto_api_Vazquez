const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "control_empleados"
})

const publicDirectory = path.join(__dirname , "./public")
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine' , 'hbs');
db.connect( (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("La bd esta conectada")
    }
});
const puerto = 8000;
app.use('/' , require('./routes/principal'));
app.listen(puerto, () => {
    console.log("Server iniciado en puerto" , puerto);
});
module.exports = db;