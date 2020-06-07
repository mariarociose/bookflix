var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.post("/", function(req,res){

    let query = `insert into libros_leidos (id_libro,id_perfil) values ("${req.body.id_libro}", "${req.body.id_perfil}")`
    console.log(query);
    connection.query(query, (err,rows,fields) => {
        if(err){
            console.log(err);
            res.status(500).send("Hubo un error guardando fin de lectura");
            return;
        }

        res.status(200).send({mensaje: 'La marca de lectura se guardo con exito.'});


    })


})

module.exports = router;



router.delete("/",function(req,res){
    console.log(req.body);
    let query = `delete from libros_leidos WHERE id_libro="${req.body.id_libro}" and id_perfil="${req.body.id_perfil}"`;
    connection.query(query,function(err,rows,fields){
        if(err){
            console.log(err);
            res.status(500).send("Hubo un error");
            return;
        }
        console.log(rows);
        res.json(rows);

    })


})
