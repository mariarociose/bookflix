var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.post("/", function(req,res){

    let query = `insert into libros_favoritos (id_perfil,id_libro) values ("${req.query.id_perfil}", "${req.query.id_libro}")`
    console.log(query);
    connection.query(query, (err,rows,fields) => {
        if(err){
            console.log(err);
            res.status(500).send("Hubo un error guardando el favorito");
            return;
        }

        res.status(200).send({mensaje: 'Se guardo con exito su favorito.'});


    })


})

router.delete("/",function(req,res){
    console.log(req.body);
    let query = `delete from libros_favoritos WHERE id_libro="${req.query.id_libro}" and id_perfil="${req.query.id_perfil}"`;
      console.log(query);
    connection.query(query,function(err,rows,fields){
        if(err){
            console.log(err);
            res.status(500).send("Hubo un error");
            return;
        }
        console.log(rows);
        res.status(200).send({eliminado: rows[0],mensaje: "Se ha eliminado con exito"});

    })


})

router.get("/", function(req,res){
      console.log("fetching si esta marcado como favorito");
      console.log(req.body.id_libro);
      console.log(req.body);
    let query = `select from libros_favoritos WHERE id_libro="${req.body.id_libro}" and id_perfil="${req.body.id_perfil}"`;
    console.log(query)
    connection.query(query,function(err,rows,fields){


        if(err){
            console.log(err);
            res.status(500).send("Hubo un error")

            return;
        }

        res.json({datos: rows});

    })

} )





module.exports = router;
