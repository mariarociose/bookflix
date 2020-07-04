var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;


router.get("/", function(req,res){
    console.log("query:"+req.query.id_libro);
    let query = `Select * from libros_puntuaciones where id_libro=${req.query.id_libro}`;
    console.log(query);
    connection.query(query, (err,rows, fields) =>{
        if(err){
            console.log(err);
            return;
        }
        
        console.log(rows);
        res.status(200).send({comentarios:rows, mensaje: "Comentarios"});
    })

})

module.exports = router;