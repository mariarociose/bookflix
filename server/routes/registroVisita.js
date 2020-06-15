var express = require("express");
var router  = express.Router();
var db = require("../configs/db");
var connection = db.connection;
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");

router.post("/",function(req,res){

    console.log(req.body);
    let query = `insert into libros_leidos (id_libro,id_perfil,fecha_ingreso ) values ("${req.query.id_libro}","${req.query.id_perfil}",CURDATE()) ON DUPLICATE KEY UPDATE fecha_ingreso=CURDATE()`
    console.log(query);
    connection.query(query,function(err,rows,fields){
        if(err){
            console.log(err);
            res.status(500).send("Hubo un error");
            return;
        }
        console.log(rows);
        res.json(rows);
    })

})


module.exports = router;
