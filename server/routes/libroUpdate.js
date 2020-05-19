var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.put("/", function(req,res){
    var query = `update libros set isbn="${req.body.isbn}", titulo="${req.body.titulo}", fecha_vencimiento="${req.body.Fecha_vencimiento}", id_autor="${req.body.autor}", id_editorial="${req.body.editorial}", id_genero="${req.body.genero}" WHERE id_libro="${req.body.id}"`
    console.log(req.body)
    console.log(query)
    connection.query(query,function(err,rows,fields){
        if(err){
            console.log(err);
            res.status(500).send("error")
        }
        console.log(rows)
        res.json(rows);
    })

})

module.exports = router;
