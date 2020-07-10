var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;


router.get("/", function(req,res){

    let query = `
    Select libros.id_libro,ev.estado_desc, libros_puntuaciones.id_perfil , perfiles.nombre as nombre_perfil, comentario, status_comentario , usuarios.nombre as nombre_usuario , puntuacion , titulo \
from libros_puntuaciones INNER JOIN perfiles on perfiles.id_perfil=libros_puntuaciones.id_perfil inner join usuarios on usuarios.id_usuario = perfiles.id_usuario \
inner join libros on libros.id_libro = libros_puntuaciones.id_libro \
inner join estados_validaciones  ev on ev.id_estado_validacion = libros_puntuaciones.status_comentario \
order by status_comentario `
;
    console.log(query);
    connection.query(query, (err,rows, fields) =>{
        if(err){
            console.log(err);
            return;
        }

        console.log(rows);
        res.status(200).send(rows);
    })

})

module.exports = router;
