var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");
var connection = db.connection;

router.get('/', function(req,res){

    var query = "Select *,(case when leido= 0 then 'No has terminado este libro aun' \
             when leido = 1 then 'Ya terminaste este libro'  end) as terminado, \
(case when fecha_vencimiento < CURRENT_DATE() then 'Libro No Disponible' when fecha_vencimiento > CURRENT_DATE() then 'Libro Disponible' end) as Disponible \
        from libros_leidos inner JOIN  \
      libros on (libros_leidos.id_libro = libros.id_libro) \
      inner join generos on (libros.id_genero = generos.id_genero) \
      inner join autores on (libros.id_autor = autores.id_autor)   \
      inner join editoriales on (libros.id_editorial = editoriales.id_editorial) \
      where libros_leidos.id_perfil = ${req.query.id_perfil}  \
      ORDER BY  leido asc, fecha_ingreso desc"

    console.log('Recuperando historial');
    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        console.log(rows);
        res.json({datos: rows,mensaje:"Historial de Libros"});
    });
})

module.exports = router;
