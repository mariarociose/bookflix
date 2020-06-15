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
