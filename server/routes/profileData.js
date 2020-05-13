var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.post('/', function(req,res){
        
    console.log(req.body);
        
    var query = "SELECT * FROM usuarios WHERE id_usuario='"+req.body+"'";

        connection.query(query, function(err,rows,fields){
            if(err){
                res.status(500).send('Hubo un error');
                return;
            }
                res.status(200).send(rows);
            });
        })
        
        module.exports = router;