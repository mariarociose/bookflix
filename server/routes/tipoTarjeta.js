var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.get('/', function(req,res){     
    console.log(req.body); 

    var query = "SELECT descripcion FROM tarjetas_tipos WHERE id_tarjeta_tipo="+parseInt(req.query.tipoId)+"";
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
    
    module.exports = router;
        