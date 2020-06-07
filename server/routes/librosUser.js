var express = require("express");
var router  = express.Router();
var db = require("../configs/db");
var connection = db.connection;


router.get("/", function(req,res){
    console.log("fetching")
    let query =     "Select * from libros inner join generos on (libros.id_genero = generos.id_genero) \
        inner join autores on libros.id_autor = autores.id_autor  \
        inner join editoriales on libros.id_editorial = editoriales.id_editorial \
        where fecha_vencimiento > DATE(CURRENT_DATE)";
    connection.query(query,function(err,rows,fields){
        if(err){
            res.status(500).send("hubo un error");
            return;
        }
        console.log(rows);
        res.json(rows);
    })
})

module.exports = router;
