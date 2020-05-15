var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");
var connection = db.connection;

router.get('/',protectedAdminRoute, function(req,res){

    var query =
    "Select * from libros \
    inner join generos on (libros.id_genero = generos.id_genero) \
    inner join autores on libros.id_autor = autores.id_autor
    inner join editoriales on libros.id_editorial = editoriales.id_editorial \
    where id_autor="'+req.body+'";
    console.log('tratando de hacer fetch');
    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        res.json({datos: rows,mensaje:"Libro encontrado"});
    });
})

module.exports = router;
