var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");

var connection = db.connection;

router.get('/', function(req,res){
    console.log(req.query.id_libro)
    var query ="Select * from libros inner join generos on (libros.id_genero = generos.id_genero) inner join autores on libros.id_autor = autores.id_autor inner join editoriales on libros.id_editorial = editoriales.id_editorial where id_libro="+req.query.id_libro;
    console.log('taran');
    connection.query(query, function(err,rows,fields){
    console.log(rows)
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
      res.status(200).send(rows[0]);
      //  res.json({datos: rows,mensaje:"Libro encontrado"});
    });

})

module.exports = router;
