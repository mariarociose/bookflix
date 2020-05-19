var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");

var connection = db.connection;

router.get('/', function(req,res){
    console.log(req.query.id_libro)
    var query ="Select id_libro,isbn,titulo,reseña,portada_img, \
    l.id_autor,l.id_editorial,l.id_genero,desc_genero,nombre,apellido,desc_editorial, \
    DATE_FORMAT(fecha_vencimiento, '%Y-%m-%d') AS fec_vencimiento \
    from libros l inner join generos g on (l.id_genero = g.id_genero) \
    inner join autores a on l.id_autor = a.id_autor \
    inner join editoriales e on l.id_editorial = e.id_editorial \
    where id_libro="+req.query.id_libro;
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
