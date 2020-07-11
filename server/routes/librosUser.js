var express = require("express");
var router  = express.Router();
var db = require("../configs/db");
var connection = db.connection;


router.get("/", function(req,res){
    console.log("fetching")
  console.log(req.body);
// query vieja
//    let query =     "Select * from libros inner join generos on (libros.id_genero = generos.id_genero) \
//        inner join autores on libros.id_autor = autores.id_autor  \
//        inner join editoriales on libros.id_editorial = editoriales.id_editorial \
//        where fecha_vencimiento > DATE(CURRENT_DATE)";

// query nueva
let query = `Select libros.id_libro, \
IF(lf.id_libro IS NULL, FALSE, TRUE) as es_fav ,  \
(SELECT avg(puntuacion) FROM libros_puntuaciones WHERE id_libro= libros.id_libro) as Promedio_Puntuacion, \
IF(lf.id_libro IS NULL, 0, puntuacion) as esta_puntuado , \
 isbn, titulo, fecha_vencimiento, reseña, portada_img, libros.id_autor, libros.id_editorial, libros.id_genero, max_capitulos, desc_editorial, desc_genero, nombre , apellido  \
 from libros inner join generos on (libros.id_genero = generos.id_genero)  \
 inner join autores on libros.id_autor = autores.id_autor \
  inner join editoriales on libros.id_editorial = editoriales.id_editorial \
  left join libros_favoritos lf ON libros.id_libro = lf.id_libro AND lf.id_perfil = "${req.query.id_perfil}" \
  left join libros_puntuaciones lp ON libros.id_libro = lp.id_libro and lp.id_perfil = "${req.query.id_perfil}" \
   where fecha_vencimiento > DATE(CURRENT_DATE)` ;



    connection.query(query,function(err,rows,fields){
        if(err){
            res.status(500).send("hubo un error");
            return;
        }
        console.log(rows);
        res.json(rows);
    })
})

router.post("/", function(req,res){

    let query = `select * from libros inner join generos on (libros.id_genero = generos.id_genero) inner join autores on (libros.id_autor = autores.id_autor) inner join editoriales on (libros.id_editorial = editoriales.id_editorial) where (titulo like "%${req.body.filter}%" or desc_genero like "%${req.body.filter}%" or apellido like "%${req.body.filter}%" or desc_editorial like "%${req.body.filter}%") and fecha_vencimiento > DATE(CURRENT_DATE)`;
    console.log(query);
    connection.query(query, function(err, rows, fields){
        if(err){
            console.log(err)
            res.status(500).send({mensaje:"hubo un error"});
            return;
        }
        console.log(rows)
        let mensaje;
        if(rows.length == 0){
            res.status(200).send({mensaje: "No hay libros que cumplan ese criterio",libros: rows})
        }else
            res.status(200).send({mensaje: null,libros: rows})

    })




})

module.exports = router;
