var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.get("/", function(req,res){

    let query = `select * from capitulos where id_libro=${req.query.id_libro}`;
    console.log(query)

    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        console.log(rows);
        res.status(200).send(rows);
    });
})

router.delete("/", function(req,res){
    let query = `delete from capitulos where id_capitulo=${req.body.id_capitulo}`
    console.log(req.body)
    connection.query(query, function(err,rows,fields){
        if(err){
            console.log(err)
            res.status(500).send({mensaje: "No ha podido eliminarse"});
            return;
        }
            console.log(rows);
            res.status(200).send({eliminado: rows[0],mensaje: "Se ha eliminado con exito"});
        });
})


module.exports = router;