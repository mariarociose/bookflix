var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.post("/", function(req,res){

    let query = `insert into trailers (titulo, descripcion, archivo, tipo) values ("${req.body.titulo}", "${req.body.descripcion}", "${req.body.archivo}", "${req.body.tipo}")`
    console.log(query);
    connection.query(query, (err,rows,fields) => {
        if(err){
            console.log(err);
            res.status(500).send("Hubo un error subiendo el trailer");
            return;
        }

        res.status(200).send({mensaje: 'El trailer se ha subido con exito'});


    })


})

module.exports = router;
