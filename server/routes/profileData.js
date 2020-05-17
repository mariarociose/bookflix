var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.get('/', function(req,res){     
    console.log(req.body); 
    var query = "SELECT * FROM usuarios WHERE id_usuario="+parseInt(req.query.userId)+"";
    console.log("TRATANTO DE HACER FETCH"); 
    console.log(query)
    connection.query(query, function(err,rows,fields){
        console.log(rows)
        if(err){
            res.status(500).send('Hubo un error');
            return;
        }
            res.status(200).send(rows[0]);
        });
    })



    router.post("/",function(req,res){
        console.log(req);
        let query = `update novedades set nombre=
        '${req.body.user.nombre}', 
        descripcion='${req.body.user.apellido}', 
        descripcion='${req.body.user.password}',
        descripcion='${req.body.user.email}'WHERE id_usuario = ${req.body.userId}`;

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
        