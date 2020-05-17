var express = require("express");
var router  = express.Router();
var db = require("../configs/db");
var connection = db.connection;
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");

router.get("/",protectedAdminRoute, function(req,res){

    let query = "select * from novedades";
    connection.query(query,function(err,rows,fields){


        if(err){
            res.status(500).send("Hubo un error")
            return;
        }

        res.json({datos: rows,mensaje:"Listado de novedades"});

    })

} )

router.post("/",function(req,res){
    console.log(req);
    let query = `update novedades set titulo='${req.body.titulo}', descripcion='${req.body.descripcion}' WHERE id_novedad = ${req.body.id}`;
    connection.query(query,function(err,rows,fields){
        if(err){
            console.log(err)
            res.status(500).send("Hubo un error")
            return;
        }
        console.log(rows);
        res.json({newData: rows[0], mensaje:"Se actualizo correctamente"});
    })

})



module.exports = router;
