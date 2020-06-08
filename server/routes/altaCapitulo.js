var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.post("/", function(req,res){
    
    let query = `insert into capitulos (titulo, descripcion, archivo, fecha, id_libro) values ("${req.body.titulo}", "${req.body.descripcion}", "${req.body.archivo}", "${req.body.fecha}", "${req.body.id_libro}")`
    console.log(query);
    connection.query(query, (err,rows,fields) => {
        if(err){
            console.log(err);
            res.status(500).send("Hubo un error subiendo el capitulo");
            return;
        }

        res.status(200).send({mensaje: 'El capítulo se ha subido con exito'});


    })


})

module.exports = router;