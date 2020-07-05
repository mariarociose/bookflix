var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");
var connection = db.connection;

router.get('/', function(req,res){

    var query =
    "Select count(libros.id_libro) as cant_lecturas , libros.id_libro, `isbn`, `titulo`, `fecha_vencimiento`, \
     `reseña`, `portada_img`, libros.id_autor, libros.id_editorial, libros.id_genero, `max_capitulos`,`desc_editorial` , \
      `desc_genero`,`nombre`,`apellido`   from libros inner join generos on (libros.id_genero = generos.id_genero)  \
    inner join autores on libros.id_autor = autores.id_autor   \
    inner join editoriales on libros.id_editorial = editoriales.id_editorial \
    inner join libros_leidos on libros.id_libro = libros_leidos.id_libro \
    group by libros.id_libro \
    order by cant_lecturas desc, titulo";
    console.log('tratando de hacer fetch');
    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        res.json({datos: rows,mensaje:"Ranking de Libros Leidos"});
    });
})

module.exports = router;
