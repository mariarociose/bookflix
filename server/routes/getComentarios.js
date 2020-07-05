var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;


router.get("/", function(req,res){
    console.log("query:"+req.query.id_libro);
    let query = `Select * from libros_puntuaciones INNER JOIN perfiles on perfiles.id_perfil=libros_puntuaciones.id_perfil where id_libro=${req.query.id_libro} AND (status_comentario=1 OR status_comentario=2)`;
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